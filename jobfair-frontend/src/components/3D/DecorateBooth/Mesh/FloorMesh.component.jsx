import { BasicMesh } from '../../ThreeJSBaseComponent/ChildMesh.component';
import React from 'react';

export const FloorMesh = (props) => {
  const { onPlaneClick, mesh } = props;
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
      castShadow
      receiveShadow>
      {mesh.children.map((child) => (
        <BasicMesh mesh={child} key={child.uuid} />
      ))}
    </mesh>
  );
};
