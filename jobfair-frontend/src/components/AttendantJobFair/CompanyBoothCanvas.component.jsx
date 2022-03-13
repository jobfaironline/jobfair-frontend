import {Canvas} from "@react-three/fiber";
import {ContactShadows, OrbitControls, Stage} from "@react-three/drei";
import React, {useRef, useState} from "react";
import {BasicMesh} from "../ThreeJSBaseComponent/ChildMesh.component";
import {SkyComponent, SkyType} from "../ThreeJSBaseComponent/Sky.component";
import {ViewSelect} from "./ViewSelect.component";
import {FirstPersonControl} from "../ThreeJSBaseComponent/FirstPersonControl.component";
import {Character} from "./Character.component";
import {EffectComposer, Outline} from "@react-three/postprocessing";
import {notification} from "antd";
import {CVSubmitComponent} from "./CVSubmit.component";

export const CompanyBoothCanvasComponent = (props) => {
  const {boothMesh, model, characterControl, cameraRef, sceneMeshRef} = props;
  const [view, setView] = useState(false);
  const cvSubmitRef = useRef()

  const [isDragOver, setIsDragOver] = useState(false);
  const isChangeCamera = useRef(true);

  const modelProps = {model, characterControl, isChangeCamera}


  const onChange = (value) => {
    isChangeCamera.current = true;
    setView(value.value === "First")
  }

  return (
    <div style={{width: '100%', height: '100vh'}}
         onDragOver={e => {
           e.preventDefault()
           e.dataTransfer.dropEffect = "move";
           isChangeCamera.current = false
           setIsDragOver(true)
         }
         }
         onDrop={e => {
           const dragId = e.dataTransfer.getData("text/plain");
           notification['success']({
             message: `Add cv ${dragId} successfully`,
           })
           setIsDragOver(false)
         }}>
      <ViewSelect onChange={onChange}/>
      <Canvas
        dpr={[1, 2]}
        camera={{fov: 45}}
        style={{width: '100%', height: '100vh'}}
        onCreated={(state => {
          cameraRef.current = state.camera
        })}
      >
        <SkyComponent style={SkyType.Sunset}/>
        {view ? <FirstPersonControl model={model} isChangeCamera={isChangeCamera} collidableMeshListRef={sceneMeshRef}/> : <OrbitControls enableZoom={true}
                                                                                                     maxPolarAngle={Math.PI / 2 - Math.PI / 10}
                                                                                                     minPolarAngle={0}
                                                                                                     maxDistance={100}/>}
        <Stage adjustCamera={false} preset="rembrandt" intensity={0.4} environment="city" contactShadow={false}>
          <group ref={sceneMeshRef}>
            {boothMesh.children.map(child => {
              if (child.name === "rostrum") {
                return <CVSubmitComponent mesh={child} cvSubmitRef={cvSubmitRef}/>;
              }
              return <BasicMesh mesh={child}/>
            })}
          </group>
          {view ? null : <Character {...modelProps}/>}
        </Stage>
        <ContactShadows frames={10} position={[0, -1.05, 0]} scale={10} blur={2} far={10}/>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={isDragOver ? cvSubmitRef : undefined}
            visibleEdgeColor="yellow"
            hiddenEdgeColor="yellow"
            edgeStrength={100}
            width={1000}/>
        </EffectComposer>
      </Canvas>
    </div>
  )
}