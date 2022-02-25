import {Canvas} from "@react-three/fiber";
import {OrbitControls, Stage} from "@react-three/drei";
import {ChildMesh} from "../JobFairPackPage/components/model/Final_booth_model";
import React, {useEffect, useState} from "react";
import {loadModel} from "../../utils/model_loader";

const CompanyBoothCanvasComponent = (props) => {
    const {boothMesh} = props;
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{fov: 45, position: [-75, 30, -10]}}
            style={{width: '100%', height: '850px'}}
        >
            <OrbitControls/>
            <Stage preset="rembrandt" intensity={0.4} environment="city"
                   contactShadow={false}>
                <ChildMesh mesh={boothMesh}/>
            </Stage>
        </Canvas>
    )
}


const AttendantJobFairBoothContainer = (props) => {
    const {url} = props;
    const [boothMesh, setBoothMesh] = useState(null);
    useEffect(async () => {
        const glb = await loadModel(url);
        setBoothMesh(glb.scene);
    }, []);
    if (boothMesh === null) return null;
    return (
        <CompanyBoothCanvasComponent boothMesh={boothMesh}/>
    )
}

export default AttendantJobFairBoothContainer;