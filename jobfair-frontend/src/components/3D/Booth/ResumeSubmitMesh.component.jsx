/* eslint-disable no-unused-vars */
import { BasicMesh } from '../ThreeJSBaseComponent/ChildMesh.component';
import { Html } from '@react-three/drei';
import React, { useRef } from 'react';

export const ResumeSubmitMeshComponent = (props) => {
  const { mesh, resumeSubmitRef, handleOpenDetail, onHover, isHover } = props;

  const toolTipPositionRef = useRef({
    x: 0,
    y: 0
  });

  return (
    <mesh
      ref={resumeSubmitRef}
      name={mesh.name}
      key={mesh.uuid}
      uuid={mesh.uuid}
      geometry={mesh.geometry}
      material={mesh.material}
      position={mesh.position}
      rotation={mesh.rotation}
      scale={mesh.scale}
      castShadow={true}
      receiveShadow={true}
      onClick={(_) => {
        handleOpenDetail(true, '1');
      }}
      onPointerMove={(e) => {
        toolTipPositionRef.current.x = e.offsetX + 10;
        toolTipPositionRef.current.y = e.offsetY;
        document.getElementsByTagName('html')[0].style.cursor = 'pointer';
        onHover(true);
      }}
      onPointerLeave={(_) => {
        onHover(false);
        document.getElementsByTagName('html')[0].style.cursor = 'default';
      }}>
      <Html
        calculatePosition={() => [toolTipPositionRef.current.x, toolTipPositionRef.current.y]}
        style={{
          visibility: isHover ? 'visible' : 'hidden',
          background: 'white',
          padding: '5px',
          minWidth: '150px',
          textAlign: 'center'
        }}>
        Click here to apply CV
      </Html>
      {mesh.children.map((child) => (
        <BasicMesh mesh={child} key={child.uuid} />
      ))}
    </mesh>
  );
};
