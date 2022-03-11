import React, {useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Stage} from "@react-three/drei";
import {CameraControls} from "../ThreeJSBaseComponent/CameraControls.component";
import {BasicMesh} from "../ThreeJSBaseComponent/ChildMesh.component";
import {SkyTypeSelect} from "../ThreeJSBaseComponent/SelectSkyType.component";
import {SkyComponent, SkyType} from "../ThreeJSBaseComponent/Sky.component";


const BoothMesh = React.forwardRef((props, ref) => {
  const {mesh, onclick} = props;
  return (
    <mesh
      name={mesh.name}
      key={mesh.uuid}
      ref={ref}
      geometry={mesh.geometry}
      material={mesh.material}
      position={mesh.position}
      onClick={() => onclick(mesh.companyBoothId)}
      rotation={mesh.rotation}
      scale={mesh.scale}
      castShadow={true}
      receiveShadow={true}
    >
      {mesh.children.map(child => <BasicMesh mesh={child} key={child.uuid}/>)}
    </mesh>
  )
});


const JobFairParkMapComponent = (props) => {
  const {onClick, mapMesh, boothMeshes} = props;
  const [skyType, setSkyType] = useState(SkyType.Morning);
  const onChangeSkyType = (value) => {
    setSkyType(value.value);
  }
  return (
    <>
      <SkyTypeSelect onChange={onChangeSkyType}/>
      <Canvas dpr={[1, 2]} camera={{fov: 50}} style={{width: '100%', height: '970px'}}>
        <CameraControls/>
        <SkyComponent style={skyType}/>
        <Stage preset="rembrandt" intensity={0.4} environment="city"
               contactShadow={false}>
          <group dispose={null}>
            <BasicMesh mesh={mapMesh}/>
            {boothMeshes.map(mesh => <BoothMesh key={mesh.uuid} mesh={mesh} onclick={onClick}/>)}
          </group>
        </Stage>
      </Canvas>
    </>

  );
}
export default JobFairParkMapComponent;