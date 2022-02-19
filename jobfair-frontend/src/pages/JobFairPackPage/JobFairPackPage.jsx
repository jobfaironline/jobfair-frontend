import React, {useRef, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Model} from "./components/model/Final_booth_model";
import {OrbitControls, useGLTF} from "@react-three/drei";
import {ToastContainer} from "react-toastify";
import {Button} from "antd";
import {GLTFExporter} from "three/examples/jsm/exporters/GLTFExporter";
import Menu from "./ItemListMenu";

export const ModeConstant = {
    "SELECT": 0,
    "ADD": 1,
}

const JobFairPackPage = () => {



    const initialSampleItems = [
        {
            id: 1,
            name: "Banner",
            description: "Banner",
            url: "./banner.glb",
        },
        {
            id: 2,
            name: "main board",
            description: "main board",
            url: "./main_board.glb",
        },
        {
            id: 3,
            name: "rostrum",
            description: "Rostrum",
            url: "./rostrum.glb",
        },
        {
            id: 4,
            name: "Trash",
            description: "Trash",
            url: "./trash.glb",
        }

    ]

    function handleClick(e) {
        const exporter = new GLTFExporter();
        exporter.parse(
            ref.current.parent,
            // called when the gltf has been generated
            function (gltf) {
                const link = document.createElement('a');
                link.style.display = 'none';
                document.body.appendChild(link);
                const blob = new Blob([gltf], {type: 'application/octet-stream'});
                link.href = URL.createObjectURL(blob);
                link.download = 'scene.glb';
                link.click();
                document.body.removeChild(link)

            },
            // called when there is an error in the generation
            function (error) {
                console.log('An error happened');
            },
            {
                binary: true,
                trs: true
            }
        );
    }

    const [isDragging, setIsDragging] = useState(false);
    const [sampleItems, setSampleItems] = useState(initialSampleItems);
    const [selectedSampleItem, setSelectedSampleItem] = useState({});
    const [mode, setMode] = useState(ModeConstant.SELECT)
    const ref = useRef();
    //parse file and get items
    //const {nodes, materials} = useGLTF('https://d3polnwtp0nqe6.cloudfront.net/booths/untitled.glb');
    const {nodes, materials} = useGLTF('./untitled.glb');
    const result = [];
    for (const mesh in nodes) {
        if (nodes[mesh].parent?.name === "Scene") result.push(nodes[mesh]);
    }

    const [modelItems, setModelItems] = useState(result);
    const [selectedItemUUID, setSelectedItemsUUID] = useState("");
    return (
        <>
            <Button onClick={handleClick}>Download</Button>
            <Canvas
                dpr={[1, 2]}
                camera={{fov: 45, position: [-75, 30, -10]}}
                style={{width: "100%", height: "850px"}}
            >
                <OrbitControls enabled={!isDragging}/>
                <directionalLight intensity={0.5}/>
                <ambientLight intensity={0.2}/>
                <Model setIsDragging={setIsDragging} ref={ref} selectedSampleItem={selectedSampleItem} modelItems={modelItems}
                       setModelItems={setModelItems} mode={mode} setMode={setMode} />
            </Canvas>
            <ToastContainer/>
            <Menu items={sampleItems} selected={selectedSampleItem}
                  setSelected={setSelectedSampleItem} setMode={setMode}/>
        </>
    );
};

export default JobFairPackPage;
