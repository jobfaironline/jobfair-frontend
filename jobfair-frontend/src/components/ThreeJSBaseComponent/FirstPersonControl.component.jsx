import {useFrame, useThree} from "@react-three/fiber";
import React, {useMemo, useRef} from "react";
import {calculateMeshSize} from "../../utils/ThreeJS/threeJSUtil";
import {PointerLockControls} from "@react-three/drei";
import BasicControlInput from "../../utils/ThreeJS/BasicControlInput";

export const FirstPersonControl = (props) => {
  const {model} = props;
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
  }

  const modelSize = calculateMeshSize(model);
  camera.position.y = model.position.y + modelSize.height;
  camera.position.x = model.position.x
  camera.position.z = model.position.z

  useFrame(() => {
    control();
  })

  return <PointerLockControls ref={controlRef} pointerSpeed={0.4}/>;
}