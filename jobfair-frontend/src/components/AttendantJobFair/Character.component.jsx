import {throttle} from "throttle-debounce";
import {useFrame, useThree} from "@react-three/fiber";
import React from "react";
import * as THREE from "three";


export const Character = props => {
  const {nearby, model, characterControl} = props;
  const {camera} = useThree();
  const idealOffset = new THREE.Vector3(-15, 20, -30);
  idealOffset.applyQuaternion(model.quaternion);
  idealOffset.add(model.position);
  camera.position.copy(idealOffset)

  const getNearObject = throttle(0.1, function () {
    const result = nearby.query(model.position.x, model.position.y, model.position.z);
    let nearestObjectId;
    for (const object of result.keys()) {
      nearestObjectId = object.id;
      break;
    }
    // if (nearestObjectId !== undefined){
    //     const mesh = sceneMeshRef.current.getObjectByProperty("uuid", nearestObjectId)
    //     setNearItem(mesh);
    // } else {
    //     setNearItem(undefined);
    // }
  });

  useFrame((state, delta) => {
    getNearObject();
    characterControl.Update(delta)
  })

  return (
    <primitive
      object={model}
    />
  )
}