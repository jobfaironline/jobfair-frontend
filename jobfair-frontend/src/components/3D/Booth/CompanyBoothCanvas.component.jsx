import { ArrowHelper } from '../ArrowHelper/ArrowHelper.component';
import { BasicMesh } from '../ThreeJSBaseComponent/ChildMesh.component';
import { Canvas, useFrame } from '@react-three/fiber';
import { Character } from './Character.component';
import { ContactShadows, OrbitControls, Stage, useContextBridge } from '@react-three/drei';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { FirstPersonControl } from '../ThreeJSBaseComponent/FirstPersonControl.component';
import { NAVBAR_HEIGHT } from '../../../styles/custom-theme';
import { ReactReduxContext } from 'react-redux';
import { ResumeSubmitMeshComponent } from './ResumeSubmitMesh.component';
import { Select } from 'antd';
import { SkyComponent, SkyType } from '../ThreeJSBaseComponent/Sky.component';
import React, { useRef, useState } from 'react';

const { Option } = Select;

const AiCharacter = (props) => {
  const { state } = props;

  useFrame((rootState, delta) => {
    if (state.isMoving) {
      state.animations.walk.timeScale = 1;
      state.animations.walk.crossFadeTo(state.animations.idle, 2, true);
      state.animations.walk.play();
    } else {
      state.animations.idle.time = 0.0;
      state.animations.idle.enabled = true;
      state.animations.idle.setEffectiveTimeScale(1.0);
      state.animations.idle.setEffectiveWeight(1.0);
      state.animations.idle.crossFadeTo(state.animations.walk, 2, true);
      state.animations.idle.play();
    }

    state.mixer.update(delta);
  });

  return <primitive object={state.model} />;
};

const ViewSelect = ({ onChange }) => (
  <Select
    labelInValue
    defaultValue={{ value: 'Third' }}
    style={{ width: 120, position: 'absolute', zIndex: 10, right: 100 }}
    onChange={onChange}>
    <Option value={'First'}>First</Option>
    <Option value={'Third'}>Third</Option>
  </Select>
);

export const CompanyBoothCanvasComponent = (props) => {
  const { boothMesh, model, characterControl, cameraRef, sceneMeshRef, zoom, user, isChangeCamera, geckoClientRef } =
    props;
  const [view, setView] = useState(false);
  const resumeSubmitRef = useRef();

  const [isHover, setIsHover] = useState(false);

  const modelProps = { model, characterControl, isChangeCamera };

  const ContextBridge = useContextBridge(ReactReduxContext);

  const onChange = (value) => {
    isChangeCamera.current = true;
    setView(value.value === 'First');
  };

  const resumeSubmitItemOnHover = (status) => {
    isChangeCamera.current = false;
    setIsHover(status);
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ViewSelect onChange={onChange} />
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, zoom: 0.04 / zoom }}
        style={{ width: '100%', height: `calc(100vh - ${NAVBAR_HEIGHT})` }}
        onCreated={(state) => {
          cameraRef.current = state.camera;
        }}>
        <ContextBridge>
          <SkyComponent style={SkyType.Sunset} />
          {view ? (
            <FirstPersonControl
              model={model}
              isChangeCamera={isChangeCamera}
              collidableMeshListRef={sceneMeshRef}
              geckoClientRef={geckoClientRef}
              zoom={zoom}
            />
          ) : (
            <OrbitControls enableZoom={true} maxPolarAngle={Math.PI / 2 - Math.PI / 10} minPolarAngle={0} />
          )}
          <Stage adjustCamera={false} preset='rembrandt' intensity={0.4} environment='city' contactShadow={false}>
            <group ref={sceneMeshRef}>
              {boothMesh.children.map((child) => {
                if (child.name === 'rostrum' || child.name === 'reception_desk') {
                  return (
                    <ResumeSubmitMeshComponent
                      mesh={child}
                      resumeSubmitRef={resumeSubmitRef}
                      onHover={resumeSubmitItemOnHover}
                      isHover={isHover}
                    />
                  );
                }
                return <BasicMesh mesh={child} />;
              })}
              {boothMesh.children.map((child) => {
                if (child.name === 'rostrum' || child.name === 'reception_desk') {
                  return (
                    <ArrowHelper
                      origin={child.position}
                      color={0xe05522}
                      length={8 * zoom * 50}
                      distance={13 * zoom * 50}
                    />
                  );
                }
              })}
            </group>
            {view ? null : <Character {...modelProps} />}
            {user.map((u) => (
              <AiCharacter state={u} />
            ))}
          </Stage>
          <ContactShadows frames={10} position={[0, -1.05, 0]} scale={10} blur={2} far={10} />
          <EffectComposer multisampling={8} autoClear={false}>
            <Outline
              selection={isHover ? resumeSubmitRef : undefined}
              visibleEdgeColor='yellow'
              hiddenEdgeColor='yellow'
              edgeStrength={100}
              width={1000}
            />
          </EffectComposer>
        </ContextBridge>
      </Canvas>
    </div>
  );
};
