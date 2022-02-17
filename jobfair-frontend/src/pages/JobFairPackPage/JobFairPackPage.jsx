import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./components/model/Final_booth_model";
import { OrbitControls } from "@react-three/drei";
import { ToastContainer, toast } from "react-toastify";
const JobFairPackPage = () => {
    const [isDragging, setIsDragging] = useState(false);
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [-75, 30, -10] }}
        style={{ width: "100%", height: "850px" }}
      >
          <OrbitControls enabled={!isDragging} />
        <directionalLight intensity={0.5} />
        <ambientLight intensity={0.2} />
          <Model setIsDragging={setIsDragging} />
      </Canvas>
      <ToastContainer />
    </>
  );
};

export default JobFairPackPage;
