import React from "react";
import {ChildMesh} from "../../pages/JobFairPackPage/components/model/Final_booth_model";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Stage} from "@react-three/drei";

const BoothMesh = React.forwardRef((props, ref) => {
    const {mesh, history} = props;
    return (
        <mesh
            name={mesh.name}
            key={mesh.uuid}
            ref={ref}
            geometry={mesh.geometry}
            material={mesh.material}
            position={mesh.position}
            onClick={event => {
                history.push(`/jobfair/attendant/${mesh.companyBoothId}`);
            }}
            rotation={mesh.rotation}
            scale={mesh.scale}
            castShadow
            receiveShadow
        >
            {mesh.children.map(child => <ChildMesh mesh={child} key={child.uuid}/>)}
        </mesh>
    )
});

const JobFairParkMapComponent = (props) => {
    const {history, mapMesh, boothMeshes} = props;

    return (
        <Canvas dpr={[1, 2]} camera={{fov: 50}} style={{width: '100%', height: '850px'}}>
            <OrbitControls/>
            <Stage preset="rembrandt" intensity={0.4} environment="city"
                   contactShadow={false}>
                <group dispose={null}>
                    <ChildMesh mesh={mapMesh}/>
                    {boothMeshes.map(mesh => <BoothMesh key={mesh.uuid} mesh={mesh} history={history}/>)}
                </group>
            </Stage>
        </Canvas>
    );
}
export default JobFairParkMapComponent;