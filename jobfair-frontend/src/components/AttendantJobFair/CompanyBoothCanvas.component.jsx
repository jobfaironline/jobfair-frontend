import {Canvas} from "@react-three/fiber";
import {ContactShadows, Stage} from "@react-three/drei";
import React, {useRef, useState} from "react";
import {BasicMesh} from "../ThreeJSBaseComponent/ChildMesh.component";
import {CameraControls} from "../ThreeJSBaseComponent/CameraControls.component";
import {SkyComponent, SkyType} from "../ThreeJSBaseComponent/Sky.component";
import {ViewSelect} from "./ViewSelect.component";
import {FirstPersonControl} from "../ThreeJSBaseComponent/FirstPersonControl.component";
import {Character} from "./Character.component";


export const CompanyBoothCanvasComponent = (props) => {
  const {boothMesh, nearby, model, characterControl, cameraRef} = props;
  const sceneMeshRef = useRef()
  const [view, setView] = useState(false);

  const modelProps = {nearby, model, characterControl}

  const onChange = (value) => {
    setView(value.value === "First")
  }

  return (
    <div style={{width: '100%', height: '80vh'}}>
      <ViewSelect onChange={onChange}/>
      <Canvas
        dpr={[1, 2]}
        camera={{fov: 45, position: [-10, 10, -10]}}
        style={{width: '100%', height: '80vh'}}
        onCreated={(state => {
          cameraRef.current = state.camera
        })}
      >
        <SkyComponent style={SkyType.Sunset}/>
        {view ? <FirstPersonControl model={model}/> : <CameraControls/>}
        <Stage adjustCamera={false} preset="rembrandt" intensity={0.4} environment="city" contactShadow={false}>
          <BasicMesh ref={sceneMeshRef} mesh={boothMesh}/>
          {view ? null : <Character {...modelProps}/>}
        </Stage>
        <ContactShadows frames={10} position={[0, -1.05, 0]} scale={10} blur={2} far={10}/>
      </Canvas>
    </div>
  )
}