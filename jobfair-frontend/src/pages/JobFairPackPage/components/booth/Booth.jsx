import React, { useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import "../shaders/materials/ScreenMaterial";
const Booth = (props, elementId) => {
  const { nodes, materials } = useGLTF("/map3DV10.glb");
  const [hovered, setHovered] = useState(false);
  useEffect(
    () => (document.body.style.cursor = hovered ? "pointer" : "auto"),
    [hovered]
  );
  return (
    <mesh
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={() => setHovered(false)}
      material={materials[`${elementId}`]}
      geometry={nodes.Slice001.geometry}
      {...props}
    />
  );
};
export default Booth;
