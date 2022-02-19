import React, {useState} from "react";
import {useGLTF} from "@react-three/drei";
import {useDrag} from "react-use-gesture";
import * as THREE from "three";

function ItemMesh({mesh, borderBox = new THREE.Box3(), floorPlane, setIsDragging}) {
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

function Mesh({mesh, isItem = false, isFloor = false, borderBox = new THREE.Box3(), floorPlane, setIsDragging}) {
    if (isItem && !isFloor) {
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
    const {setIsDragging, url} = props;
    const {nodes, materials} = useGLTF(url);

    const result = [];
    for (let mesh in nodes) {
        if (nodes[mesh].parent?.name === "Scene") result.push(nodes[mesh]);
    }

    const floorMesh = result.filter(mesh => mesh.name === "sand")[0];
    const floorPlane = new THREE.Plane(floorMesh.position);
    const floorBox = new THREE.Box3().setFromObject(floorMesh);
    return (
        <group dispose={null} ref={ref}>
            {result.map(mesh => {
                if (mesh === floorMesh) {
                    return <Mesh key={mesh.uuid} mesh={mesh} borderBox={floorBox} setIsDragging={setIsDragging}
                                 floorPlane={floorPlane} isItem={true} isFloor={true}/>
                }
                return <Mesh key={mesh.uuid} mesh={mesh} borderBox={floorBox} setIsDragging={setIsDragging}
                             floorPlane={floorPlane} isItem={true}/>
            })}
        </group>
    );

})


useGLTF.preload("/final_booth_model.glb");
