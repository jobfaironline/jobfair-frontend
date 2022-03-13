import {BasicMesh} from "../ThreeJSBaseComponent/ChildMesh.component";
import React from "react";

export const CVSubmitComponent = props => {
  const {mesh, cvSubmitRef} = props;

  return (
    <mesh
      ref={cvSubmitRef}
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
    >
      {mesh.children.map(child => <BasicMesh mesh={child} key={child.uuid}/>)}
    </mesh>
  )
}