import React, {Suspense, useEffect, useLayoutEffect, useRef, useState} from "react";
import { Canvas } from "@react-three/fiber";
import {Model} from "./components/model/Final_booth_model";
import { OrbitControls } from "@react-three/drei";
import { ToastContainer, toast } from "react-toastify";
import {Button} from "antd";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
const JobFairPackPage = () => {


    function handleClick(e){
        const exporter = new GLTFExporter();
        exporter.parse(
            ref.current.parent,
            // called when the gltf has been generated
            function ( gltf ) {
                const link = document.createElement('a');
                link.style.display = 'none';
                document.body.appendChild(link);
                const blob = new Blob([gltf], { type: 'application/octet-stream' });
                link.href = URL.createObjectURL(blob);
                link.download = 'scene.glb';
                link.click();
                document.body.removeChild(link)

            },
            // called when there is an error in the generation
            function ( error ) {

                console.log( 'An error happened' );

            },
            {
                binary: true,
                trs: true
            }
        );
    }

    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef();
  return (
    <>
    <Button onClick={handleClick}>Download</Button>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [-75, 30, -10] }}
        style={{ width: "100%", height: "850px" }}
      >
        <OrbitControls enabled={!isDragging} />
        <directionalLight intensity={0.5} />
        <ambientLight intensity={0.2} />
          <Model setIsDragging={setIsDragging} ref={ref} url={'/untitled.glb'} />
      </Canvas>
      <ToastContainer />
    </>
  );
};

export default JobFairPackPage;
