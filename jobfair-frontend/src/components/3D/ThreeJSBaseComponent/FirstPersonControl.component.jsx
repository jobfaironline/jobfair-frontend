/* eslint-disable no-unused-vars */
import * as THREE from 'three';
import { PointerLockControls } from '@react-three/drei';
import { calculateMeshSize } from '../../../utils/ThreeJS/threeJSUtil';
import { useFrame, useThree } from '@react-three/fiber';
import BasicControlInput from '../../../utils/ThreeJS/BasicControlInput';
import React, { useMemo, useRef } from 'react';

export const FirstPersonControl = (props) => {
  const { model, isChangeCamera, collidableMeshListRef, geckoClientRef, zoom } = props;
  const { camera, scene } = useThree();
  const controlRef = useRef();
  const speed = 0.1;

  const input = useMemo(() => new BasicControlInput(), []);

  function control() {
    const cameraOldPosition = new THREE.Vector3();
    const modelOldPosition = new THREE.Vector3();
    cameraOldPosition.copy(camera.position);
    modelOldPosition.copy(model.position);

    if (input.keys.forward) controlRef.current.moveForward(speed * zoom * 20);

    if (input.keys.backward) {
      // s
      controlRef.current.moveForward(-speed * zoom * 20);
    }
    if (input.keys.left) {
      // a
      controlRef.current.moveRight(-speed * zoom * 20);
    }
    if (input.keys.right) {
      // d
      controlRef.current.moveRight(speed * zoom * 20);
    }

    const oldQuaternion = new THREE.Quaternion();
    oldQuaternion.copy(model.quaternion);

    //re-adjust model position
    model.position.x = camera.position.x;
    model.position.z = camera.position.z;
    //re-adjust model rotation
    const cameraLookAt = new THREE.Vector3();
    camera.getWorldDirection(cameraLookAt);
    const modelLookAt = new THREE.Vector3();
    model.getWorldDirection(modelLookAt);
    const plane = new THREE.Vector3(modelLookAt.x, 0, modelLookAt.z);
    const newPlane = new THREE.Vector3(cameraLookAt.x, 0, cameraLookAt.z);
    const angle = newPlane.angleTo(plane);
    const _R = model.quaternion.clone();
    const _A = new THREE.Vector3(0, 1, 0);
    const _Q = new THREE.Quaternion().setFromAxisAngle(_A, angle);
    _R.multiply(_Q);
    model.quaternion.copy(_R);

    const distance = Math.abs(
      model.position.x +
        model.position.y +
        model.position.z -
        modelOldPosition.x -
        modelOldPosition.y -
        modelOldPosition.z
    );
    if (distance > 0.01) {
      const obj = {
        position: model.position,
        quaternion: {
          x: model.quaternion._x,
          y: model.quaternion._y,
          z: model.quaternion._z,
          w: model.quaternion._w
        }
      };
      geckoClientRef.current.move(obj);
    } else geckoClientRef.current.stop();

    //make model bouding box
    const skeleton = new THREE.SkeletonHelper(model);
    const bone_min = { x: Infinity, y: Infinity, z: Infinity };
    const bone_max = { x: -Infinity, y: -Infinity, z: -Infinity };
    for (let b = 0; b < skeleton.bones.length; b++) {
      const child = skeleton.bones[b];
      const position = new THREE.Vector3();
      child.getWorldPosition(position);
      if (position.x < bone_min.x) bone_min.x = position.x;

      if (position.y < bone_min.y) bone_min.y = position.y;

      if (position.z < bone_min.z) bone_min.z = position.z;

      if (position.x > bone_max.x) bone_max.x = position.x;

      if (position.y > bone_max.y) bone_max.y = position.y;

      if (position.z > bone_max.z) bone_max.z = position.z;
    }

    bone_max.x += camera.position.x - (bone_max.x + bone_min.x) / 2;
    bone_min.x += camera.position.x - (bone_max.x + bone_min.x) / 2;
    bone_min.z += camera.position.z - (bone_max.z + bone_min.z) / 2;
    bone_min.z += camera.position.z - (bone_max.z + bone_min.z) / 2;

    const box = new THREE.Box3(
      new THREE.Vector3(bone_min.x, bone_min.y, bone_min.z),
      new THREE.Vector3(bone_max.x, bone_max.y, bone_max.z)
    );
    //check collision
    if (collidableMeshListRef !== undefined) {
      for (const child of collidableMeshListRef.current.children) {
        if (child.name === 'sand') continue;
        const childBox = new THREE.Box3().setFromObject(child);
        if (box.intersectsBox(childBox)) {
          camera.position.copy(cameraOldPosition);
          model.position.copy(modelOldPosition);
          return;
        }
      }
    }
  }

  if (isChangeCamera.current) {
    const modelSize = calculateMeshSize(model);
    camera.position.y = model.position.y + modelSize.height;
    camera.position.x = model.position.x;
    camera.position.z = model.position.z;

    camera.rotation.copy(model.rotation);
    camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI);
  }

  useFrame((state) => {
    state.camera.zoom = 1;
    state.camera.updateProjectionMatrix();
    controlRef.current.pointerSpeed = 0.01;
    control();
  });

  return <PointerLockControls ref={controlRef} pointerSpeed={0} />;
};
