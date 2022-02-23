import {OrbitControls, Stage, useGLTF} from "@react-three/drei";
import {Canvas} from "@react-three/fiber"
import React, {useEffect, useRef, useState} from "react"
import {ChildMesh} from "../JobFairPackPage/components/model/Final_booth_model"
import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {notify} from "../../utils/toastutil";
import {ToastContainer} from "react-toastify";
import {useHistory} from "react-router-dom";


const loader = new GLTFLoader();


const getBootMesh = async (position, foundationBox, url, companyBoothId) => {
    return new Promise((resolve, reject) => {
        loader.load(
            // resource URL
            url,
            // called when the resource is loaded
            function ( gltf ) {

                const {x, y, z} = position;
                let sceneMesh = gltf.scene;
                //set correct position
                sceneMesh.position.set(x, y, z);

                //scale booth model
                const foundationSize = new THREE.Vector3();
                foundationBox.getSize(foundationSize);

                const meshSize = new THREE.Vector3();
                const meshBoudingBox = new THREE.Box3().setFromObject(sceneMesh);
                meshBoudingBox.getSize(meshSize)

                const scale = Math.max(foundationSize.x / meshSize.x, foundationSize.z / meshSize.z);
                sceneMesh.scale.setScalar(scale);
                sceneMesh.companyBoothId = companyBoothId;
                resolve(sceneMesh);

            },
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            function ( error ) {

                console.log( 'An error happened' );

            });
    });




}

const BoothMesh = React.forwardRef((props, ref) => {
    const {mesh, history} = props;
    return (
        <mesh
            name={mesh.name}
            key={mesh.uuid}
            ref={ref}
            geometry={mesh.geometry}
            material={mesh.material}
            position={mesh.position}
            onClick={event => {
                console.log(history);
                notify(2, `Redirect to ${mesh.companyBoothId}`);
                history.push("/jobfair/attendant");
            }}
            rotation={mesh.rotation}
            scale={mesh.scale}
            castShadow
            receiveShadow
        >
            {mesh.children.map(child => <ChildMesh mesh={child} key={child.uuid}/>)}
        </mesh>
    )
});

const MapModel = React.forwardRef((props, ref) => {
    const {history} = props;

    const {nodes: mapNodes, materials} = useGLTF('./map.glb')

    const [boothMeshes, setBoothMeshes] = useState([]);

    //this data will be fetch from BE
    const data = [
        {
            position: {x: 19.592493057250977, y: 2.200000047683716, z: 15.210623741149902},
            slotName: "company00",
            boothUrl: './untitled.glb',
            companyBoothId: "123",
        },
        {
            position: {x: -30.822830200195312, y: 2.200000047683716, z: -15.00773811340332},
            slotName: "company01",
            boothUrl: './untitled.glb',
            companyBoothId: "1234",
        },
        {
            position: {x: -16.091472625732422, y: 2.200000047683716, z: 13.914505958557129},
            slotName: "company02",
            boothUrl: './untitled.glb',
            companyBoothId: "12345",
        },
        {
            position: {x: 3.1950831413269043, y: 2.200000047683716, z: -15.310139656066895},
            slotName: "company03",
            boothUrl: './untitled.glb',
            companyBoothId: "123456",
        }
    ]

    const transformData = {};
    data.forEach(element => {
        transformData[element.slotName] = {
            position: element.position,
            boothUrl: element.boothUrl,
            companyBoothId: element.companyBoothId,
            sizeBox: null,
        }
    })

    const result = [];
    for (const mesh in mapNodes) {
        if (mapNodes[mesh].parent?.name === 'Scene') result.push(mapNodes[mesh]);
        if (Object.keys(transformData).includes(mapNodes[mesh].name)) {
            transformData[mapNodes[mesh].name].sizeBox = new THREE.Box3().setFromObject(mapNodes[mesh]);
        }
    }

    useEffect(async () => {
        const newBoothMeshesPromise = []
        for (const slot of Object.values(transformData)) {
            const boothMesh = getBootMesh(slot.position, slot.sizeBox, slot.boothUrl, slot.companyBoothId);
            newBoothMeshesPromise.push(boothMesh);
        }
        setBoothMeshes(await Promise.all(newBoothMeshesPromise));
    }, []);


    return (
        <group dispose={null} ref={ref}>
            {result.map(mesh => <ChildMesh key={mesh.uuid} mesh={mesh}/>)}
            {boothMeshes.map(mesh => <BoothMesh key={mesh.uuid} mesh={mesh} history={history}/> )}
        </group>
    )
});


const JobFairParkPage = (props) => {
    const history = useHistory();
    const stageRef = useRef();
    return (<div>
        <Canvas dpr={[1, 2]} camera={{fov: 50}} style={{width: '100%', height: '850px'}}>
            <OrbitControls/>
            <Stage controls={stageRef} preset="rembrandt" intensity={0.3999999999999999} environment="city"
                   contactShadow={false} >
                <MapModel history={history}/>
            </Stage>
        </Canvas>
        <ToastContainer />
    </div>)
}

export default JobFairParkPage;