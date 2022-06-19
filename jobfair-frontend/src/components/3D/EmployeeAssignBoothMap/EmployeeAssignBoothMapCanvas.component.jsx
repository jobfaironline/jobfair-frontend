import { ArrowHelper } from '../ArrowHelper/ArrowHelper.component';
import { BasicMesh } from '../ThreeJSBaseComponent/ChildMesh.component';
import { CameraControls } from '../ThreeJSBaseComponent/CameraControls.component';
import { Canvas } from '@react-three/fiber';
import { ChooseBoothGroundMesh } from '../ChooseBooth/ChooseBoothGroundMesh.component';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { KernelSize, Resizer } from 'postprocessing';
import { SkyComponent, SkyType } from '../ThreeJSBaseComponent/Sky.component';
import { SkyTypeSelect } from '../ThreeJSBaseComponent/SelectSkyType.component';
import { Stats } from '@react-three/drei';
import React, { Fragment, useState } from 'react';

export const EmployeeAssignBoothMapCanvas = (props) => {
  const { mapMesh, jobFairBoothData, boothMeshesRef, onBoothMouseOver, onBoothMouseOut, hoverRef, onClick } = props;
  const [skyType, setSkyType] = useState(SkyType.Morning);

  const onChangeSkyType = (value) => {
    setSkyType(value.value);
  };

  const boothName = jobFairBoothData.booth.name;

  return (
    <Fragment>
      <SkyTypeSelect onChange={onChangeSkyType} />
      <Canvas
        dpr={[1, 2]}
        shadowMap
        style={{
          width: '100%',
          height: 'calc(100vh - 124px)',
          cursor: hoverRef === undefined ? 'default' : 'pointer'
        }}
        camera={{ far: 5000, fov: 50 }}>
        <CameraControls />
        <SkyComponent style={skyType} />
        <group dispose={null}>
          {mapMesh.children.map((childMesh) => {
            if (childMesh.name.includes(boothName)) {
              const id = jobFairBoothData.id;
              return (
                <ChooseBoothGroundMesh
                  key={childMesh.uuid}
                  mesh={childMesh}
                  boothId={id}
                  isAvailable={true}
                  onPointerOver={onBoothMouseOver}
                  onPointerLeave={onBoothMouseOut}
                  onClick={onClick}
                  boothMeshesRef={boothMeshesRef}
                />
              );
            }
            return <BasicMesh key={childMesh.uuid} mesh={childMesh} />;
          })}
          {mapMesh.children.map((childMesh) => {
            if (childMesh.name.includes(boothName))
              return <ArrowHelper origin={childMesh.position} color={0x32a852} length={20} distance={23} />;
            return null;
          })}
        </group>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={hoverRef}
            edgeStrength={10000}
            width={Resizer.AUTO_SIZE} // render width
            height={Resizer.AUTO_SIZE} // render height
            kernelSize={KernelSize.LARGE} //
            hiddenEdgeColor={0xffffff}
            visibleEdgeColor={0x22090a}
          />
        </EffectComposer>
      </Canvas>
      <Stats />
    </Fragment>
  );
};
