import { BREADCUMB_HEIGHT, NAVBAR_HEIGHT } from '../../../../styles/custom-theme';
import { CameraControls } from '../../ThreeJSBaseComponent/CameraControls.component';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { FloorMeshContainer } from '../../../../containers/3D/DecorateBooth/FloorMesh.container';
import { ItemMeshContainer } from '../../../../containers/3D/DecorateBooth/ItemMesh.container';
import { ModeConstant } from '../../../../constants/AppConst';
import { ReactReduxContext, useSelector } from 'react-redux';
import { Stage, useContextBridge } from '@react-three/drei';
import React from 'react';

export const DecorateBoothCanvas = React.forwardRef((props, ref) => {
  const { modelItems, handleAdd, renderRef, hasUnsavedChangeRef } = props;
  const ContextBridge = useContextBridge(ReactReduxContext);
  const { hoverItem, selectedItem, mode } = useSelector((state) => state.decorateBooth);

  const calculateOutlineMesh = () => {
    const result = [];
    if (hoverItem !== undefined) result.push(hoverItem);

    if (mode !== ModeConstant.SELECT) return result;
    if (selectedItem !== undefined) result.push(selectedItem);

    return result.length === 0 ? null : result;
  };
  const floorMesh = modelItems.filter((mesh) => mesh.name === 'sand')[0];

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ fov: 40, zoom: 1.2, position: [-1, 1, -1] }}
      style={{
        width: '100vw',
        height: `calc(100vh - ${NAVBAR_HEIGHT} - ${BREADCUMB_HEIGHT})`
      }}
      onCreated={(state) => {
        renderRef.current = state.gl;
      }}>
      <ContextBridge>
        <CameraControls enabled={mode !== ModeConstant.DRAGGING} />
        <Stage adjustCamera={false} preset='rembrandt' intensity={0.4} environment='city' contactShadow={false}>
          <group dispose={null} ref={ref}>
            {modelItems.map((mesh) => {
              if (mesh === floorMesh) return <FloorMeshContainer key={mesh.uuid} mesh={mesh} handleAdd={handleAdd} />;

              return (
                <ItemMeshContainer
                  key={mesh.uuid}
                  mesh={mesh}
                  floorMesh={floorMesh}
                  hasUnsavedChangeRef={hasUnsavedChangeRef}
                />
              );
            })}
          </group>
        </Stage>

        <EffectComposer multisampling={8} autoClear={false}>
          <Outline
            selection={calculateOutlineMesh()}
            visibleEdgeColor='yellow'
            hiddenEdgeColor='yellow'
            edgeStrength={100}
            width={1000}
          />
        </EffectComposer>
      </ContextBridge>
    </Canvas>
  );
});
