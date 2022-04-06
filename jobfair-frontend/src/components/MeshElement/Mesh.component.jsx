import React from 'react'

const MeshComponent = prop => {
  const { geometry, material, position, scale, rotation } = prop
  return <mesh geometry={geometry} material={material} position={position} rotation={rotation} scale={scale} />
}
export default MeshComponent
