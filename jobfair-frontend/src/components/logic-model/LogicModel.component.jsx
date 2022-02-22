import * as THREE from 'three'
export const calculateMeshDimensionRange = mesh => {
  const borderBox = new THREE.Box3().setFromObject(mesh)
  const x_range = { min: borderBox.min.x, max: borderBox.max.x }
  const y_range = { min: borderBox.min.y, max: borderBox.max.y }
  const z_range = { min: borderBox.min.z, max: borderBox.max.z }
  return {
    x_range,
    y_range,
    z_range
  }
}
export const calculateMeshSize = mesh => {
  const meshSize = new THREE.Box3().setFromObject(mesh, true)
  const vector = new THREE.Vector3()
  meshSize.getSize(vector)
  return { length: vector.x, height: vector.y, width: vector.z }
}

// eslint-disable-next-line prettier/prettier
export const calculatePositionWithBoundary = ({ x, y, z, x_range, y_range, z_range, length, width, height }) => {
  let new_x = x
  let new_y = y
  let new_z = z
  if (x <= x_range.min + length / 2) new_x = x_range.min + length / 2
  if (x >= x_range.max - length / 2) new_x = x_range.max - length / 2
  if (y <= y_range.min + height / 2) new_x = y_range.min + height / 2
  if (y >= y_range.max - height / 2) new_x = y_range.max - height / 2
  if (z <= z_range.min + width / 2) new_z = z_range.min + width / 2
  if (z >= z_range.max - width / 2) new_z = z_range.max - width / 2

  return {
    x: new_x,
    y: new_y,
    z: new_z
  }
}
