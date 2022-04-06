import React from 'react'

export const BasicMesh = React.forwardRef(({ mesh }, ref) => {
  return (
    <mesh
      ref={ref}
      name={mesh.name}
      key={mesh.uuid}
      uuid={mesh.uuid}
      geometry={mesh.geometry}
      material={mesh.material}
      position={mesh.position}
      rotation={mesh.rotation}
      scale={mesh.scale}
      castShadow
      receiveShadow
    >
      {mesh.children.map(child => (
        <BasicMesh key={child.uuid} mesh={child} />
      ))}
    </mesh>
  )
})
