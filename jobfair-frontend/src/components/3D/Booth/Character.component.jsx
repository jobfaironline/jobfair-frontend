import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useMemo } from 'react';
import { useBox, usePlane } from '@react-three/cannon';

export const Character = (props) => {
  const { model, characterControl, isChangeCamera } = props;
  const { camera } = useThree();

  const [refChild, api] = useBox(() => ({
    mass: 1,
    position: [model.position.x, model.position.y, model.position.z],
    onCollide: (e) => console.log('collision', e)
  }));

  if (isChangeCamera.current) {
    const idealOffset = new THREE.Vector3(-10, 15, -17);
    idealOffset.applyQuaternion(model.quaternion);
    idealOffset.add(model.position);
    camera.position.copy(idealOffset);
  }

  useFrame((state, delta) => {
    api.position.set(Math.random() * 10, model.position.y, 0);
    characterControl.Update(delta, state.scene);
  });

  return <primitive ref={refChild} object={model} />;
};
