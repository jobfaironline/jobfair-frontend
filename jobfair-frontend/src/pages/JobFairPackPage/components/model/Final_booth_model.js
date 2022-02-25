import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useDrag } from 'react-use-gesture'
import * as THREE from 'three'
import { ModeConstant } from '../../../../constants/AppConst'
import {
  calculateMeshDimensionRange,
  calculateMeshSize,
  calculatePositionWithBoundary,
  loadModel
} from '../../../../utils/glbModelUtil'
import { useThree } from '@react-three/fiber'

function ItemMesh({
  mesh,
  setIsDragging,
  floorMesh,
  mode,
  setSelectedItemRef,
  selectedItemRef,
  hoverItemRef,
  setHoverItemRef,
}) {
  const [position, setPosition] = useState(mesh.position)
  const itemRef = useRef()

  const bind = useDrag(
    ({ offset: [x, y], event, active, dragging }) => {
      if (mode !== ModeConstant.SELECT) return
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
      setIsDragging(active)
    },
    { pointerEvents: true }
  )

  useEffect(() => {
    itemRef.current.uuid = mesh.uuid
    itemRef.current.name = mesh.name
  })
  return (
    <mesh
      key={mesh.uuid}
      ref={itemRef}
      geometry={mesh.geometry}
      material={mesh.material}
      position={position}
      onClick={event => {
        if (selectedItemRef?.current.uuid === mesh.uuid) {
          setSelectedItemRef(undefined)
        } else {
          setSelectedItemRef(itemRef)
        }
      }}
      onPointerOver={event => {
        setHoverItemRef(itemRef)
      }}
      onPointerLeave={event => {
        setHoverItemRef(undefined)
      }}
      {...bind()}
      rotation={mesh.rotation}
      scale={mesh.scale}
      castShadow
      receiveShadow
    >
      {mesh.children.map(child => ChildMesh({ key: child.uuid, mesh: child }))}
    </mesh>
  )
}

function FloorMesh({ mesh, selectedSampleItem, setModelItems, mode }) {
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

    setModelItems(prevState => {
      return [...prevState, gltf.scene.children[0]]
    })
  }
  return (
    <mesh
      onClick={onPlaneClick}
      key={mesh.uuid}
      geometry={mesh.geometry}
      material={mesh.material}
      position={mesh.position}
      rotation={mesh.rotation}
      scale={mesh.scale}
      castShadow
      receiveShadow
    >
      {mesh.children.map(child => ChildMesh({ mesh: child }))}
    </mesh>
  )
}

function ChildMesh({ mesh }) {
  return (
    <mesh
      key={mesh.uuid}
      geometry={mesh.geometry}
      material={mesh.material}
      position={mesh.position}
      rotation={mesh.rotation}
      scale={mesh.scale}
      castShadow
      receiveShadow
    >
      {mesh.children.map(child => (
        <ChildMesh mesh={child} />
      ))}
    </mesh>
  )
}

export const Model = React.forwardRef(
  (
    {
      setIsDragging,
      selectedSampleItem,
      modelItems,
      setModelItems,
      mode,
      setModes,
      setSelectedItemRef,
      selectedItemRef,
      hoverItemRef,
      setHoverItemRef,
    },
    ref
  ) => {
    const { scene } = useThree()
    const handleKeyDown = event => {
      if (selectedItemRef?.current === undefined) {
        return
      }
      const mesh = scene.getObjectByProperty('uuid', selectedItemRef.current.uuid)
      let myAxis
      switch (event.keyCode) {
        case 37: //KEY LEFT
          event.preventDefault()
          myAxis = new THREE.Vector3(0, 1, 0)
          mesh.rotateOnWorldAxis(myAxis, THREE.Math.degToRad(10))
          break
        case 38: //KEY UP
          event.preventDefault()
          mesh.position.set(mesh.position.x, mesh.position.y + 0.1, mesh.position.z)
          break
        case 39: //KEY RIGHT
          event.preventDefault()
          myAxis = new THREE.Vector3(0, 1, 0)
          mesh.rotateOnWorldAxis(myAxis, -THREE.Math.degToRad(10))
          break
        case 40: //KEY DOWN
          event.preventDefault()
          mesh.position.set(mesh.position.x, mesh.position.y - 0.1, mesh.position.z)
          break
        case 46: //KEY DEL
          event.preventDefault()
          setModelItems(prevState => {
            setSelectedItemRef(undefined)
            return prevState.filter(itemMesh => itemMesh.uuid !== selectedItemRef.current.uuid)
          })
          break
      }
    }
    const onDocumentMouseMove = event => {}
    useEffect(() => {
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('mousemove', onDocumentMouseMove, false)
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('mousemove', onDocumentMouseMove)
      }
    }, [selectedItemRef])

    const floorMesh = modelItems.filter(mesh => mesh.name === 'sand')[0]
    return (
      <group dispose={null} ref={ref} >
        {modelItems.map(mesh => {
          if (mesh === floorMesh) {
            return (
              <FloorMesh
                mesh={mesh}
                selectedSampleItem={selectedSampleItem}
                setModelItems={setModelItems}
                mode={mode}
              />
            )
          }
          return (
            <ItemMesh
              key={mesh.uuid}
              mesh={mesh}
              setIsDragging={setIsDragging}
              floorMesh={floorMesh}
              mode={mode}
              setSelectedItemRef={setSelectedItemRef}
              selectedItemRef={selectedItemRef}
              hoverItemRef={hoverItemRef}
              setHoverItemRef={setHoverItemRef}
            />
          )
        })}
      </group>
    )
  }
)

useGLTF.preload('/untitled.glb')
