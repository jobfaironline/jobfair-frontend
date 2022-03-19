import {BasicMesh} from "../../ThreeJSBaseComponent/ChildMesh.component";
import React from "react";
import {CSS2DObject, CSS2DRenderer} from "three/examples/jsm/renderers/CSS2DRenderer"
import {useThree} from "@react-three/fiber";
import {Html} from "@react-three/drei";


function drawTooltip(tooltipText) {
  if (tooltipText) {
    let divToolTip;
    divToolTip = document.createElement('div');
    divToolTip.id = "tien-cute";
    let strong = document.createElement('strong');
    strong.innerHTML = tooltipText;
    divToolTip.appendChild(strong);
    return divToolTip;
  }
}


export const CVSubmitComponent = props => {
  const {mesh, cvSubmitRef, handleOpenDetail, onHover} = props;

  const {scene} = useThree();

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
      onClick={e => handleOpenDetail(true, "1")}
      onPointerOver={e => {
        document.getElementsByTagName("html")[0].style.cursor = "pointer"
        onHover(true);
      }}
      onPointerLeave={e => {
        onHover(false);
        document.getElementsByTagName("html")[0].style.cursor = "default"
      }}
    >
      {mesh.children.map(child => <BasicMesh mesh={child} key={child.uuid}/>)}
    </mesh>
  )
}