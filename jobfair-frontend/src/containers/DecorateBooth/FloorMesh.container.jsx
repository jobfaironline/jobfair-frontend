import { useSelector } from 'react-redux'
import { ModeConstant } from '../../constants/AppConst'
import * as THREE from 'three'
import {
  calculateMeshDimensionRange,
  calculateMeshSize,
  calculatePositionWithBoundary,
  loadGLBModel
} from '../../utils/ThreeJS/threeJSUtil'
import React from 'react'
import { FloorMesh } from '../../components/DecorateBooth/FloorMesh.component'

export const FloorMeshContainer = props => {
  const { mesh, handleAdd } = props
  const { selectedSampleItem, mode } = useSelector(state => state.decorateBooth)

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
    const gltf = await loadGLBModel(selectedSampleItem.url)
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
    handleAdd(itemMesh)
  }

  const floorMeshProps = { onPlaneClick, mesh }
  return <FloorMesh {...floorMeshProps} />
}
