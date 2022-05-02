import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useBox, usePlane } from '@react-three/cannon';

export const BasicMesh = React.forwardRef(({ mesh }, ref) => {
  console.log(mesh.geometry);
  const geo = useMemo(() => mesh.geometry, [mesh]);
  if (mesh.name != 'sand') {
    const [refChild, api] = useBox(() => ({
      mass: 1,
      args: mesh.geometry,
      position: mesh.position,
      onCollide: (e) => console.log(mesh.name)
    }));

    return (
      <mesh
        ref={refChild}
        name={mesh.name}
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
          <BasicMesh key={child.uuid} mesh={child} />
        ))}
      </mesh>
    );
  }

  const [refChild, api] = usePlane(() => ({
    mass: 0,
    rotation: [-Math.PI / 1, 0, 0],
    onCollide: (e) => console.log('collision', e)
  }));

  return (
    <mesh
      ref={refChild}
      name={mesh.name}
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
        <BasicMesh key={child.uuid} mesh={child} />
      ))}
    </mesh>
  );
});
