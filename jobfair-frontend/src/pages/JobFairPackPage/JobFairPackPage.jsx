import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./components/model/model";
import { OrbitControls } from "@react-three/drei";
import { ToastContainer, toast } from "react-toastify";
const JobFairPackPage = () => {
  return (
    <>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [-75, 30, -10] }}
        dpr={[1, 5, 2]}
        // camera={{ position: [-80, 50, -30], fov: 100, near: 1, far: 50 }}
        style={{ width: "100%", height: "850px" }}
      >
        {/* <ambientLight intensity={2} />
      <color attach="background" args={["#202020"]} />
      <fog attach="fog" args={["#202020", 20, 25]} />
      <directionalLight position={[-10, 0, -15]} intensity={0.2} />
      <directionalLight position={[10, 10, 10]} intensity={0.2} />
      <Suspense fallback={null}>
        <Model
          position={[1, -1.4, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          modelUrl="/map3Dv1.glb"
        />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 3}
      /> */}
        <OrbitControls />
        <directionalLight intensity={0.5} />
        <ambientLight intensity={0.2} />
        <Model />
      </Canvas>
      <ToastContainer />
    </>
  );
};

export default JobFairPackPage;
