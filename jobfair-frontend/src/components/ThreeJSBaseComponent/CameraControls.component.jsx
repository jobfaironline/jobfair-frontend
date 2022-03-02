import React from "react";
import {OrbitControls} from "@react-three/drei";

export const CameraControls = (props) => {
    const {enabled} = props;
    return (
        <OrbitControls enabled={enabled ?? true} enableZoom={true}
                       maxPolarAngle={Math.PI / 2 - Math.PI / 10}
                       minPolarAngle={0}
                       maxDistance={1000}/>
    )
};