import { BOOTH_NAME_PREFIX } from '../../../constants/3DConst';
import { BasicMesh } from '../ThreeJSBaseComponent/ChildMesh.component';
import { CameraControls } from '../ThreeJSBaseComponent/CameraControls.component';
import { Canvas } from '@react-three/fiber';
import { ChooseBoothGroundMesh } from './ChooseBoothGroundMesh.component';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { KernelSize, Resizer } from 'postprocessing';
import { SkyComponent, SkyType } from '../ThreeJSBaseComponent/Sky.component';
import { SkyTypeSelect } from '../ThreeJSBaseComponent/SelectSkyType.component';
import { Stats } from '@react-three/drei';
import React, { Fragment, useState } from 'react';

export const ChooseBoothCanvas = (props) => {
  const {
    mesh,
    boothData,
    onClick,
    selectionRef,
    onCompanyGroundPointerOver,
    onCompanyGroundPointerOut,
    hoverRef,
    boothMeshesRef
  } = props;

  const [skyType, setSkyType] = useState(SkyType.Morning);

  const onChangeSkyType = (value) => {
    setSkyType(value.value);
  };

  const calculateOutline = () => {
    const result = [];
    if (selectionRef !== undefined && selectionRef?.current !== undefined) result.push(selectionRef);

    if (hoverRef !== undefined && hoverRef?.current !== undefined) result.push(hoverRef);

    return result.length === 0 ? null : result;
  };

  return (
    <Fragment>
      <SkyTypeSelect onChange={onChangeSkyType} />
      <Canvas
        dpr={[1, 2]}
        shadowMap
        style={{
          width: '100%',
          height: 'calc(100vh - 80px)',
          cursor: hoverRef === undefined ? 'default' : 'pointer'
        }}
        camera={{ far: 7000, fov: 50, position: [100, 100, 0] }}>
        <CameraControls />
        <SkyComponent style={skyType} />

        <group dispose={null}>
          {mesh.children.map((childMesh) => {
            if (childMesh.name.includes(BOOTH_NAME_PREFIX)) {
              const id = boothData[childMesh.name]?.id;
              const color = boothData[childMesh.name]?.color;
              return (
                <ChooseBoothGroundMesh
                  key={childMesh.uuid}
                  mesh={childMesh}
                  boothId={id}
                  isAvailable={boothData[childMesh.name] !== undefined}
                  onPointerOver={onCompanyGroundPointerOver}
                  onPointerLeave={onCompanyGroundPointerOut}
                  onClick={onClick}
                  boothMeshesRef={boothMeshesRef}
                  color={color}
                />
              );
            }
            return <BasicMesh key={childMesh.uuid} mesh={childMesh} />;
          })}
        </group>
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={calculateOutline()}
            edgeStrength={10000}
            width={Resizer.AUTO_SIZE} // render width
            height={Resizer.AUTO_SIZE} // render height
            kernelSize={KernelSize.LARGE} //
            hiddenEdgeColor={0xffffff}
            visibleEdgeColor={0x22090a}
          />
        </EffectComposer>
      </Canvas>
      <Stats></Stats>
    </Fragment>
  );
};
