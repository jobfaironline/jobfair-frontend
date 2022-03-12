import {useFrame, useThree} from "@react-three/fiber";
import React, {useMemo, useRef} from "react";
import {calculateMeshSize} from "../../utils/ThreeJS/threeJSUtil";
import {PointerLockControls} from "@react-three/drei";
import BasicControlInput from "../../utils/ThreeJS/BasicControlInput";
import * as THREE from "three";


export const FirstPersonControl = (props) => {
  const {model, isChangeCamera} = props;
  const {camera} = useThree();
  const controlRef = useRef();
  const speed = 0.1;

  const input = useMemo(() => {
    return new BasicControlInput();
  }, [])


  function control() {
    if (input.keys.forward) {
      controlRef.current.moveForward(speed)
    }
    if (input.keys.backward) { // s
      controlRef.current.moveForward(-speed)
    }
    if (input.keys.left) { // a
      controlRef.current.moveRight(-speed)
    }
    if (input.keys.right) { // d
      controlRef.current.moveRight(speed)
    }
    //re-adjust model position
    model.position.x = camera.position.x;
    model.position.z = camera.position.z;
    //re-adjust model rotation
    const cameraLookAt = new THREE.Vector3()
    camera.getWorldDirection(cameraLookAt);
    const modelLookAt = new THREE.Vector3();
    model.getWorldDirection(modelLookAt);
    const plane = new THREE.Vector3(modelLookAt.x, 0, modelLookAt.z);
    const newPlane = new THREE.Vector3(cameraLookAt.x, 0, cameraLookAt.z)
    const angle = newPlane.angleTo(plane)
    const _R = model.quaternion.clone();
    const _A = new THREE.Vector3(0, 1, 0);
    const _Q = new THREE.Quaternion().setFromAxisAngle(_A, angle);
    _R.multiply(_Q);
    model.quaternion.copy(_R);

  }

  if (isChangeCamera.current){
    const modelSize = calculateMeshSize(model);
    camera.position.y = model.position.y + modelSize.height;
    camera.position.x = model.position.x
    camera.position.z = model.position.z


    camera.rotation.copy(model.rotation)
    camera.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), Math.PI)
  }






  useFrame(() => {
    control();
  })

  return <PointerLockControls ref={controlRef} pointerSpeed={0.4}/>;
}