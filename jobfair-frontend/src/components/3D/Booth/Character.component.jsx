import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import React from 'react';

export const Character = (props) => {
  const { model, characterControl, isChangeCamera } = props;
  const { camera } = useThree();

  if (isChangeCamera.current) {
    const idealOffset = new THREE.Vector3(-10, 15, -17);
    idealOffset.applyQuaternion(model.quaternion);
    idealOffset.add(model.position);
    camera.position.copy(idealOffset);
  }

  useFrame((state, delta) => {
    characterControl.Update(delta, state.scene);
  });

  return <primitive object={model} />;
};
