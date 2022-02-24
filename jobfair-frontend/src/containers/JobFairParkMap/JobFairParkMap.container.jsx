import React, {useEffect, useState} from "react";
import {loadModel} from "../../utils/model_loader";
import * as THREE from "three";
import JobFairParkMapComponent from "../../components/JobFairParkMap/JobFairParkMap.component";


const getBootMesh = async (position, foundationBox, url, companyBoothId) => {
    const gltf = await loadModel(url);
    const {x, y, z} = position;
    let sceneMesh = gltf.scene;
    //set correct position
    sceneMesh.position.set(x, y, z);

    //scale booth model
    const foundationSize = new THREE.Vector3();
    foundationBox.getSize(foundationSize);

    const meshSize = new THREE.Vector3();
    const meshBoundingBox = new THREE.Box3().setFromObject(sceneMesh);
    meshBoundingBox.getSize(meshSize)

    const scale = Math.max(foundationSize.x / meshSize.x, foundationSize.z / meshSize.z);
    sceneMesh.scale.setScalar(scale);
    sceneMesh.companyBoothId = companyBoothId;
    return sceneMesh;
}

const JobFairParkMapContainer = (props) => {
    const {history} = props;
    const [state, setState] = useState(
        {
            boothMeshes: [],
            mapMesh: null,
        }
    );

    useEffect(async () => {
        //fetch this from BE
        const url = './map.glb';
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
        ];

        const glb = await loadModel(url);

        const transformData = {};
        data.forEach(element => {
            transformData[element.slotName] = {
                position: element.position,
                boothUrl: element.boothUrl,
                companyBoothId: element.companyBoothId,
                sizeBox: null,
            }
        })

        for (const mesh of glb.scene.children) {
            if (Object.keys(transformData).includes(mesh.name)) {
                transformData[mesh.name].sizeBox = new THREE.Box3().setFromObject(mesh);
            }
        }
        const newBoothMeshesPromise = []
        for (const slot of Object.values(transformData)) {
            const boothMesh = getBootMesh(slot.position, slot.sizeBox, slot.boothUrl, slot.companyBoothId);
            newBoothMeshesPromise.push(boothMesh);
        }
        const meshes = await Promise.all(newBoothMeshesPromise)

        //GET data from BE
        setState({
            boothMeshes: meshes,
            mapMesh: glb.scene
        })
    }, [])

    if (state.mapMesh === null || state.boothMeshes.length === 0) {
        return null;
    }

    return (
        <JobFairParkMapComponent history={history} mapMesh={state.mapMesh} boothMeshes={state.boothMeshes}/>
    );
}

export default JobFairParkMapContainer;