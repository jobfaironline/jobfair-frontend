import React from 'react'

import { BasicMesh } from '../ThreeJSBaseComponent/ChildMesh.component'

export const ItemMesh = React.forwardRef((props, ref) => {
  const {
    position,
    onClick,
    onPointerOver,
    onPointerLeave,
    useDragBind,
    mesh
  } = props

  return (
    <mesh
      name={mesh.name}
      key={mesh.uuid}
      uuid={mesh.uuid}
      ref={ref}
      geometry={mesh.geometry}
      material={mesh.material}
      position={position}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerLeave={onPointerLeave}
      {...useDragBind()}
      rotation={mesh.rotation}
      scale={mesh.scale}
      castShadow={true}
      receiveShadow={true}
    >
      {mesh.children.map(child => (
        <BasicMesh mesh={child} key={child.uuid} />
      ))}
    </mesh>
  )
})
