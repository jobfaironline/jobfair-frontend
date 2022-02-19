import React, {Suspense, useEffect, useLayoutEffect, useRef, useState} from "react";
import { Canvas } from "@react-three/fiber";
import {Model} from "./components/model/Final_booth_model";
import { OrbitControls } from "@react-three/drei";
import { ToastContainer, toast } from "react-toastify";
import {Button} from "antd";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
const JobFairPackPage = () => {
    const link = document.createElement('a');
    link.style.display = 'none';
    document.body.appendChild(link);

    function save(blob, filename) {
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        document.body.removeChild(link)

        // URL.revokeObjectURL( url ); breaks Firefox...
    }

    function saveString(text, filename) {

        save(new Blob([text], {
            type: 'text/plain'
        }), filename);
    }

    function handleClick(e){
        console.log(ref)
        const exporter = new GLTFExporter();
        exporter.parse(
            ref.current.parent,
            // called when the gltf has been generated
            function ( gltf ) {
                console.log(gltf);
                //save(new Blob([gltf], { type: 'application/octet-stream' }), 'scene.glb');
                const output = JSON.stringify( gltf, null, 2 );
                saveString( output, 'scene.gltf' );

            },
            // called when there is an error in the generation
            function ( error ) {

                console.log( 'An error happened' );

            },
            {
                binary: false,
                trs: true
            }
        );

    }

    const [isDragging, setIsDragging] = useState(false);
    const ref = useRef();
  return (
    <>
    <Button onClick={handleClick}> tien</Button>
      <Canvas
        dpr={[1, 2]}
        camera={{ fov: 45, position: [-75, 30, -10] }}
        style={{ width: "100%", height: "850px" }}
      >
        <OrbitControls enabled={!isDragging} />
        <directionalLight intensity={0.5} />
        <ambientLight intensity={0.2} />
          <Model setIsDragging={setIsDragging} ref={ref} />
      </Canvas>
      <ToastContainer />
    </>
  );
};

export default JobFairPackPage;
