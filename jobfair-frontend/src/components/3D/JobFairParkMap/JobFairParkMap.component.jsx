import * as THREE from 'three';
import { BasicMesh } from '../ThreeJSBaseComponent/ChildMesh.component';
import { CameraControls } from '../ThreeJSBaseComponent/CameraControls.component';
import { Canvas } from '@react-three/fiber';
import { NAVBAR_HEIGHT } from '../../../styles/custom-theme';
import { SkyComponent, SkyType } from '../ThreeJSBaseComponent/Sky.component';
import { SkyTypeSelect } from '../ThreeJSBaseComponent/SelectSkyType.component';
import { Stage, Stats } from '@react-three/drei';
import { makeTextSprite } from '../../../utils/ThreeJS/sprite-util';
import React, { useState } from 'react';

const BoothMesh = React.forwardRef((props, ref) => {
  const { mesh, onclick } = props;

  return (
    <group>
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
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          document.body.style.cursor = 'default';
        }}
        receiveShadow={true}>
        {mesh.children.map((child) => (
          <BasicMesh mesh={child} key={child.uuid} />
        ))}
      </mesh>
    </group>
  );
});

const JobFairParkMapComponent = (props) => {
  const { onClick, mapMesh, boothMeshes } = props;
  const [skyType, setSkyType] = useState(SkyType.Morning);
  const onChangeSkyType = (value) => {
    setSkyType(value.value);
  };
  return (
    <>
      <SkyTypeSelect onChange={onChangeSkyType} />
      <Canvas
        dpr={[1, 2]}
        camera={{ far: 5000, fov: 50 }}
        style={{ width: '100%', height: `calc(100vh - ${NAVBAR_HEIGHT})` }}
        colorManagement={false}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.NoToneMapping;
        }}>
        <CameraControls />
        <SkyComponent style={skyType} />
        <Stage
          adjustCamera={false}
          intensity={-0.4}
          environment='warehouse'
          contactShadow={{
            blur: 2,
            opacity: 0.5
          }}
          preset={'rembrandt'}>
          <group dispose={null}>
            <BasicMesh mesh={mapMesh} />
            {boothMeshes?.map((mesh) => (
              <BoothMesh key={mesh.uuid} mesh={mesh} onclick={onClick} />
            ))}
            {boothMeshes?.map((mesh) => (
              <primitive
                object={makeTextSprite(`${mesh.boothName}`, {
                  fontsize: 20,
                  position: { x: mesh.position.x, y: mesh.position.y + 2, z: mesh.position.z },
                  borderColor: { r: 0, g: 0, b: 0, a: 0 },
                  backgroundColor: { r: 255, g: 255, b: 255, a: 0.9 }
                })}
              />
            ))}
          </group>
        </Stage>
      </Canvas>
      <Stats />
    </>
  );
};
export default JobFairParkMapComponent;
