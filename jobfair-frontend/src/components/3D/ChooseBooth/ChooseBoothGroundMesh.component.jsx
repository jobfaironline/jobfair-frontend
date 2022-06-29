import { AvailableBoothColor, UnAvailableBoothColor } from '../../../constants/AssignmentConst';
import { BasicMesh } from '../ThreeJSBaseComponent/ChildMesh.component';
import React, { useRef } from 'react';

export const ChooseBoothGroundMesh = (props) => {
  const { mesh, onPointerOver, onPointerLeave, onClick, isAvailable, boothId, boothMeshesRef, color } = props;
  const ref = useRef();
  boothMeshesRef.current.push(ref);
  if (!isAvailable) {
    const newMaterial = mesh.material.clone();
    newMaterial.color.set(UnAvailableBoothColor);
    newMaterial.transparent = true;
    mesh.material = newMaterial;
  } else {
    const newMaterial = mesh.material.clone();
    if (color !== undefined) newMaterial.color.set(AvailableBoothColor);
    else newMaterial.color.set(AvailableBoothColor);
    newMaterial.transparent = true;
    mesh.material = newMaterial;
  }
  return (
    <mesh
      ref={ref}
      name={mesh.name}
      key={mesh.uuid}
      geometry={mesh.geometry}
      material={mesh.material}
      position={mesh.position}
      rotation={mesh.rotation}
      scale={mesh.scale}
      castShadow={true}
      receiveShadow={true}
      onPointerOver={() => {
        if (!isAvailable) return;
        onPointerOver(mesh.name);
      }}
      onPointerLeave={() => {
        if (!isAvailable) return;
        onPointerLeave(mesh.name);
      }}
      onClick={() => {
        // eslint-disable-next-line no-unused-expressions
        isAvailable ? onClick(boothId, mesh.name) : null;
      }}>
      {mesh.children.map((child) => (
        <BasicMesh mesh={child} />
      ))}
    </mesh>
  );
};
