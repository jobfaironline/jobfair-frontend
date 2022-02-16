import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./components/model/Final_booth_model";
import { OrbitControls } from "@react-three/drei";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { mockData } from "./components/mockData/mockData";
function parseNode(node) {
  function parse(node) {
    const object = {};
    object["geometry"] = node.attributes["geometry"]?.value;
    object["material"] = node.attributes["material"]?.value;
    object["position"] = eval(node.attributes["position"]?.value);
    object["rotation"] = eval(node.attributes["rotation"]?.value);
    object["scale"] = eval(node.attributes["scale"]?.value);
    return object;
  }

  if (node.children.length === 0) {
    const object = parse(node);
    object["children"] = null;
    return object;
  }
  const children = [];
  for (let childNode of node.children) {
    const result = parseNode(childNode);
    children.push(result);
  }
  const object = parse(node);
  object["children"] = children;
  return object;
}
function parseText(text) {
  const pre_process_text = text.replaceAll("{", "'").replaceAll("}", "'");
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(pre_process_text, "text/xml");
  const result = [];
  for (let node of xmlDoc.children) {
    console.log(node);
    const nodeObject = parseNode(node);
    result.push(nodeObject);
  }
  return result;
}
const JobFairPackPage = () => {
  const [position, setposition] = useState([-20, 5, 10]);
  // useEffect(() => console.log(position), [position]);
  const transfer = (data) => {
    parseText(data);
    // console.log();
  };
  return (
    <>
      {/* <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: position }}
        style={{ width: "100%", height: "850px" }}
      >
        <OrbitControls onChange={() => console.log(position)} />
        <directionalLight intensity={0.5} />
        <ambientLight intensity={0.2} />
        <Model />
      </Canvas>
      <ToastContainer /> */}
      <div style={{ backgroundColor: "red" }}>
        <button type="button" onClick={() => transfer(mockData)}>
          Click Me!
        </button>
      </div>
    </>
  );
};

export default JobFairPackPage;
