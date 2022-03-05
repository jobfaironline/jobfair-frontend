import React, { useEffect, useRef, useState } from 'react'
import { useDrag } from 'react-use-gesture'
import * as THREE from 'three'
import { ModeConstant } from '../../../../constants/AppConst'
import {
  calculateMeshDimensionRange,
  calculateMeshSize,
  calculatePositionWithBoundary,
  loadModel
} from '../../../../utils/glbModelUtil'
import {BasicMesh} from "../../../../components/ThreeJSBaseComponent/ChildMesh.component";
import {decorateBoothAction} from "../../../../redux-flow/decorateBooth/decorate-booth-slice";
import {useDispatch, useSelector} from "react-redux";

function ItemMesh({
  mesh,
  floorMesh,
}) {
  const selectedItemRef = useSelector(state => state.decorateBooth.selectedItemRef)
  const mode =  useSelector(state => state.decorateBooth.mode)

  const [position, setPosition] = useState(mesh.position)
  const itemRef = useRef()
  const dispatch = useDispatch();
  const bind = useDrag(
    ({event, active }) => {
      if (mode !== ModeConstant.SELECT && mode !== ModeConstant.DRAGGING) return
      if (selectedItemRef?.current.uuid !== itemRef.current.uuid) return
      if (active) {
        //get intersection point between click coordinate and plane coordinate
        const planeIntersectPoint = new THREE.Vector3()
        const floorPlane = new THREE.Plane(floorMesh.position)
        event.ray.intersectPlane(floorPlane, planeIntersectPoint)

        //calculate new item position on plane
        const { x_range: floor_x_range, z_range: floor_z_range } = calculateMeshDimensionRange(floorMesh)
        const { length: item_length, width: item_width, height: item_height } = calculateMeshSize(mesh)
        const { x, y, z } = calculatePositionWithBoundary({
          x: planeIntersectPoint.x,
          y: mesh.position.y,
          z: planeIntersectPoint.z,
          x_range: floor_x_range,
          y_range: [mesh.position.y + item_height / 2, mesh.position.y + item_height / 2],
          z_range: floor_z_range,
          length: item_length,
          width: item_width,
          height: item_height
        })
        setPosition([x, y, z])
      }
      if (active){
        dispatch(decorateBoothAction.setMode(ModeConstant.DRAGGING))
      } else {
        dispatch(decorateBoothAction.setMode(ModeConstant.SELECT))
      }
    },
    { pointerEvents: true }
  )

  return (
    <mesh
      name={mesh.name}
      key={mesh.uuid}
      uuid={mesh.uuid}
      ref={itemRef}
      geometry={mesh.geometry}
      material={mesh.material}
      position={position}
      onClick={_ => {
        if (mode === ModeConstant.ADD) return;
        dispatch(decorateBoothAction.setSelectedItemRef(itemRef))
      }}
      onPointerOver={_ => {
        dispatch(decorateBoothAction.setHoverItemRef(itemRef))
      }}
      onPointerLeave={_ => {
        dispatch(decorateBoothAction.setHoverItemRef(undefined))
      }}
      {...bind()}
      rotation={mesh.rotation}
      scale={mesh.scale}
      castShadow={true}
      receiveShadow={true}
    >
      {mesh.children.map(child => <BasicMesh mesh={child} key={child.uuid}/>)}
    </mesh>
  )
}

function FloorMesh({ mesh }) {
  const mode =  useSelector(state => state.decorateBooth.mode)
  const selectedSampleItem = useSelector(state => state.decorateBooth.selectedSampleItem)
  const dispatch = useDispatch()
  const onPlaneClick = async e => {
    if (mode !== ModeConstant.ADD) return
    if (selectedSampleItem.id === undefined) {
      return
    }
    //get intersection point between click coordinate and plane coordinate
    const planeIntersectPoint = new THREE.Vector3()
    const floorPlane = new THREE.Plane(new THREE.Vector3(mesh.position.x, mesh.position.y + 0.5, mesh.position.z))
    e.ray.intersectPlane(floorPlane, planeIntersectPoint)

    //load new item mesh
    const gltf = await loadModel(selectedSampleItem.url)
    const itemMesh = gltf.scene.children[0]

    //calculate new item position on plane
    const { x_range: floor_x_range, z_range: floor_z_range } = calculateMeshDimensionRange(mesh)
    const { length: item_length, width: item_width, height: item_height } = calculateMeshSize(itemMesh)
    const { height: floor_height } = calculateMeshSize(mesh)
    const { x, y, z } = calculatePositionWithBoundary({
      x: planeIntersectPoint.x,
      y: mesh.position.y + floor_height / 2 + item_height / 2,
      z: planeIntersectPoint.z,
      x_range: floor_x_range,
      y_range: [-1000, 10000],
      z_range: floor_z_range,
      height: item_length,
      width: item_width,
      length: item_height
    })
    itemMesh.position.set(x, y, z)

    dispatch(decorateBoothAction.addModelItem(gltf.scene.children[0]))

  }
  return (
    <mesh
      name={mesh.name}
      onClick={onPlaneClick}
      key={mesh.uuid}
      uuid={mesh.uuid}
      geometry={mesh.geometry}
      material={mesh.material}
      position={mesh.position}
      rotation={mesh.rotation}
      scale={mesh.scale}
      castShadow={true}
      receiveShadow={true}
    >
      {mesh.children.map(child => <BasicMesh mesh={child} key={child.uuid}/>)}
    </mesh>
  )
}

export const Model = React.forwardRef((props, ref) => {
  const modelItems = useSelector(state => state.decorateBooth.modelItems)

    const floorMesh = modelItems.filter(mesh => mesh.name === 'sand')[0]
    return (
      <group dispose={null} ref={ref} >
        {modelItems.map(mesh => {
          if (mesh === floorMesh) {
            return (
              <FloorMesh
                key={mesh.uuid}
                mesh={mesh}
              />
            )
          }
          return (
            <ItemMesh
              key={mesh.uuid}
              mesh={mesh}
              floorMesh={floorMesh}
            />
          )
        })}
      </group>
    )
  }
)

