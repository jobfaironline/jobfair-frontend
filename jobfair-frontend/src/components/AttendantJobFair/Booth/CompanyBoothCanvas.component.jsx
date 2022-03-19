import {Canvas} from "@react-three/fiber";
import {ContactShadows, OrbitControls, Stage} from "@react-three/drei";
import React, {useRef, useState} from "react";
import {BasicMesh} from "../../ThreeJSBaseComponent/ChildMesh.component";
import {SkyComponent, SkyType} from "../../ThreeJSBaseComponent/Sky.component";
import {ViewSelect} from "./ViewSelect.component";
import {FirstPersonControl} from "../../ThreeJSBaseComponent/FirstPersonControl.component";
import {Character} from "./Character.component";
import {EffectComposer, Outline} from "@react-three/postprocessing";
import {notification} from "antd";
import {CVSubmitComponent} from "./CVSubmit.component";
import {ArrowHelper} from "../../ChooseBooth/ArrowHelper.component";
import {CSS2DObject, CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer"


export const CompanyBoothCanvasComponent = (props) => {
  const {boothMesh, model, characterControl, cameraRef, sceneMeshRef, zoom, handleOpenDetail} = props;
  const [view, setView] = useState(false);
  const cvSubmitRef = useRef()

  const [isHover, setIsHover] = useState(false);
  const isChangeCamera = useRef(true);

  const modelProps = {model, characterControl, isChangeCamera}


  const onChange = (value) => {
    isChangeCamera.current = true;
    setView(value.value === "First")
  }

  const cvSubmitItemOnHover = (status) => {
    isChangeCamera.current = false;
    setIsHover(status);
  }



  return (
    <div style={{width: '100%', height: '100vh'}}
    >
      <ViewSelect onChange={onChange}/>
      <Canvas
        dpr={[1, 2]}
        camera={{fov: 45, zoom: 0.04 / zoom}}
        style={{width: '100%', height: '100vh'}}
        onCreated={(state => {
          cameraRef.current = state.camera;
        })}
      >
        <SkyComponent style={SkyType.Sunset}/>
        {view ? <FirstPersonControl model={model} isChangeCamera={isChangeCamera} collidableMeshListRef={sceneMeshRef}/> : <OrbitControls enableZoom={true}
                                                                                                     maxPolarAngle={Math.PI / 2 - Math.PI / 10}
                                                                                                     minPolarAngle={0}
                                                                                                     />}
        <Stage adjustCamera={false} preset="rembrandt" intensity={0.4} environment="city" contactShadow={false}>
          <group ref={sceneMeshRef}>
            {boothMesh.children.map(child => {
              if (child.name === "rostrum" || child.name === "reception_desk") {
                return <CVSubmitComponent mesh={child} cvSubmitRef={cvSubmitRef} onHover={cvSubmitItemOnHover} handleOpenDetail={handleOpenDetail}/>;
              }
              return <BasicMesh mesh={child}/>
            })}
            {
              boothMesh.children.map(child => {
                if (child.name === "rostrum" || child.name === "reception_desk") {
                  return <ArrowHelper origin={child.position} color={0xe05522} length={8} distance={13}/>
                }
              })
            }
          </group>
          {view ? null : <Character {...modelProps}/>}
        </Stage>
        <ContactShadows frames={10} position={[0, -1.05, 0]} scale={10} blur={2} far={10}/>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={isHover ? cvSubmitRef : undefined}
            visibleEdgeColor="yellow"
            hiddenEdgeColor="yellow"
            edgeStrength={100}
            width={1000}/>
        </EffectComposer>
      </Canvas>
    </div>
  )
}