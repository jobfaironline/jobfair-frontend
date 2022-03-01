import React, {useRef} from "react";
import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import {ChildMesh} from "../../pages/DecorateBoothPage/components/model/Final_booth_model";

export const ArrowHelper = (props) => {
    const {origin} = props;
    const ref = useRef();
    const dir = new THREE.Vector3(0, -1, 0);
    //normalize the direction vector (convert to vector of length 1)
    dir.normalize();
    const length = 20;
    const hex = 0x32a852;

    const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
    arrowHelper.position.setY(30);

    useFrame((state, delta) => {
        if (ref?.current !== undefined && delta / 100){
            ref.current.rotateOnAxis(dir, delta)
        }
    })
    return <ChildMesh ref={ref} mesh={arrowHelper}/>
}
