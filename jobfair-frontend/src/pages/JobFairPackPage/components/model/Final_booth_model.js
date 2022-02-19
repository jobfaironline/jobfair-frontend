import React, {useState} from "react";
import {useGLTF} from "@react-three/drei";
import {useDrag} from "react-use-gesture";
import * as THREE from "three";
import {useThree} from "@react-three/fiber";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

function ItemMesh({mesh, borderBox = new THREE.Box3(), floorPlane, setIsDragging}) {
    console.log("Call item mesh")
    const x_range = {min: borderBox.min.x, max: borderBox.max.x};
    const z_range = {min: borderBox.min.z, max: borderBox.max.z};
    const [position, setPosition] = useState(mesh.position)
    let planeIntersectPoint = new THREE.Vector3();
    const meshSize = new THREE.Box3().setFromObject(mesh);
    const z_height = Math.abs(meshSize.max.z - meshSize.min.z);
    const x_height = Math.abs(meshSize.max.x - meshSize.min.x);
    const bind = useDrag(({offset: [x, y], event, active, dragging}) => {
            if (active) {
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                let x = planeIntersectPoint.x;
                let z = planeIntersectPoint.z;

                if (x < x_range.min + x_height / 2) x = x_range.min + x_height / 2;
                if (x > x_range.max - x_height / 2) x = x_range.max - x_height / 2;
                if (z < z_range.min + z_height / 2) z = z_range.min + z_height / 2;
                if (z > z_range.max - z_height / 2) z = z_range.max - z_height / 2;

                setPosition([x, mesh.position.y, z]);
            }
            setIsDragging(active);
        }, {pointerEvents: true}
    );
    return (<mesh
        key={mesh.uuid}
        geometry={mesh.geometry}
        material={mesh.material}
        position={position}
        {...bind()}
        rotation={mesh.rotation}
        scale={mesh.scale}
    >
        {mesh.children.map(child => Mesh({key: child.uuid, mesh: child}))}
    </mesh>);
}


function Plane({mesh, selected, groupRef, setModelItems}){
    const { mouse, camera } = useThree();
    const onPlaneClick = (e) => {
        if (selected.id === undefined){
            return;
        }
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        var dir = vector.sub(camera.position).normalize();
        var distance = - camera.position.z / dir.z;
        var pos = camera.position.clone().add(dir.multiplyScalar(distance));

        const loader = new GLTFLoader();
        loader.load(
            // resource URL
            selected.url,
            // called when the resource is loaded
            function ( gltf ) {
                const newMesh = gltf.scene.children[0]
                const meshSize = new THREE.Box3().setFromObject(newMesh);
                const y_height = Math.abs(meshSize.max.y - meshSize.min.y);
                newMesh.position.set(pos.x, mesh.position.y + y_height/2 + 0.5, pos.z);

                setModelItems(prevState => {
                    return [...prevState, gltf.scene.children[0]];
                });

            },
            // called while loading is progressing
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( 'An error happened' );

            }
        );
    };
    return (<mesh
        onClick={onPlaneClick}
        key={mesh.uuid}
        geometry={mesh.geometry}
        material={mesh.material}
        position={mesh.position}
        rotation={mesh.rotation}
        scale={mesh.scale}
    >
        {mesh.children.map(child => Mesh({mesh: child}))}
    </mesh>);
}

function Mesh({mesh, isItem = false, borderBox = new THREE.Box3(), floorPlane, setIsDragging}) {
    if (isItem) {
        return <ItemMesh mesh={mesh} borderBox={borderBox} floorPlane={floorPlane} setIsDragging={setIsDragging}/>
    }
    return (<mesh
        key={mesh.uuid}
        geometry={mesh.geometry}
        material={mesh.material}
        position={mesh.position}
        rotation={mesh.rotation}
        scale={mesh.scale}
    >
        {mesh.children.map(child => Mesh({mesh: child}))}
    </mesh>);
}

export const Model = React.forwardRef((props, ref) => {
    const {setIsDragging, url, selectedItem, modelItems, setModelItems} = props;

    const floorMesh = modelItems.filter(mesh => mesh.name === "sand")[0];
    const floorPlane = new THREE.Plane(floorMesh.position);
    const floorBox = new THREE.Box3().setFromObject(floorMesh);
    return (
        <group dispose={null} ref={ref}>
            {modelItems.map(mesh => {
                if (mesh === floorMesh) {
                    return <Plane mesh={mesh} selected={selectedItem} groupRef={ref} setModelItems={setModelItems}/>
                }
                return <Mesh key={mesh.uuid} mesh={mesh} borderBox={floorBox} setIsDragging={setIsDragging}
                             floorPlane={floorPlane} isItem={true}/>
            })}
        </group>
    );

})


useGLTF.preload("/final_booth_model.glb");
