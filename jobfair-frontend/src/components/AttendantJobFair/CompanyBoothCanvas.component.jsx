import {Canvas} from "@react-three/fiber";
import {Stage} from "@react-three/drei";
import React from "react";
import {BasicMesh} from "../ThreeJSBaseComponent/ChildMesh.component";
import {CameraControls} from "../ThreeJSBaseComponent/CameraControls.component";

export const CompanyBoothCanvasComponent = (props) => {
    const {boothMesh} = props;
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{fov: 45, position: [-75, 30, -10]}}
            style={{width: '100%', height: '850px'}}
        >
            <CameraControls/>
            <Stage preset="rembrandt" intensity={0.4} environment="city"
                   contactShadow={false}>
                <BasicMesh mesh={boothMesh}/>
            </Stage>
        </Canvas>
    )
}