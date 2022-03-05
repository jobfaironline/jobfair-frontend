import React, { useRef, useState } from 'react'
import { useDrag } from 'react-use-gesture'
import * as THREE from 'three'
import { ModeConstant } from '../../constants/AppConst'
import {
  calculateMeshDimensionRange,
  calculateMeshSize,
  calculatePositionWithBoundary,
} from '../../utils/glbModelUtil'
import {BasicMesh} from "../ThreeJSBaseComponent/ChildMesh.component";
import {decorateBoothAction} from "../../redux-flow/decorateBooth/decorate-booth-slice";
import {useDispatch, useSelector} from "react-redux";

export const ItemMesh = (props) => {
  const {mesh, floorMesh,} = props
  const selectedItem = useSelector(state => state.decorateBooth.selectedItem)
  const mode =  useSelector(state => state.decorateBooth.mode)
  const [position, setPosition] = useState(mesh.position)
  const itemRef = useRef()
  const dispatch = useDispatch();
  const bind = useDrag(
    ({event, active }) => {
      if (mode !== ModeConstant.SELECT && mode !== ModeConstant.DRAGGING) return
      if (selectedItem?.uuid !== itemRef.current.uuid) return
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
      if (active && mode !== ModeConstant.DRAGGING ){
        dispatch(decorateBoothAction.setMode(ModeConstant.DRAGGING))
      }
      if (!active && mode === ModeConstant.DRAGGING){
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
        dispatch(decorateBoothAction.setSelectedItem(itemRef.current))
      }}
      onPointerOver={_ => {
        dispatch(decorateBoothAction.setHoverItem(itemRef.current))
      }}
      onPointerLeave={_ => {
        dispatch(decorateBoothAction.setHoverItem(undefined))

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


