import { useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useDrag } from "react-use-gesture";
import * as THREE from "three";


function TrashCan({ nodes, floorPlane, initialPosition, setIsDragging }){
    const [position, setPosition] = useState(initialPosition);
    let planeIntersectPoint = new THREE.Vector3();
    const bind = useDrag(({ offset: [x, y] , event, active, dragging}) => {
            if (active) {
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                setPosition([planeIntersectPoint.x, initialPosition[1], planeIntersectPoint.z]);
            }
            setIsDragging(active);
        }, { pointerEvents: true }
    );
    return <mesh
        geometry={nodes.trash.geometry}
        material={nodes.trash.material}
        position={position}
        {...bind()}
        onClick={(e) =>e.stopPropagation()}
        scale={[0.4, 1, 0.4]}
    />
}

function Banner({ nodes, floorPlane, initialPosition, setIsDragging }){
    const [position, setPosition] = useState(initialPosition);
    let planeIntersectPoint = new THREE.Vector3();
    const bind = useDrag(({ offset: [x, y] , event, active, dragging}) => {
            if (active) {
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                setPosition([planeIntersectPoint.x, initialPosition[1], planeIntersectPoint.z]);
            }
            setIsDragging(active);
        }, { pointerEvents: true }
    );
    return <mesh
        geometry={nodes.banner01.geometry}
        material={nodes.banner01.material}
        position={position}
        {...bind()}
        onClick={(e) =>e.stopPropagation()}

        rotation={[0, 0, 1.38]}
        scale={[2.95, 0.74, 1.31]}
    >
        <mesh
            geometry={nodes.Cube010_1.geometry}
            material={nodes.Cube010_1.material}
            position={[-0.07, -1.54, 0.02]}
            rotation={[0, 0, -1.25]}
            scale={[0.1, 0.06, 0.11]}
        />
        <mesh
            geometry={nodes.Cylinder008.geometry}
            material={nodes.Cylinder008.material}
            position={[-0.89, -3.14, 0.03]}
            rotation={[0, 0, -1.19]}
            scale={[5, 0, 2.88]}
        />
        <mesh
            geometry={nodes.Cylinder009.geometry}
            material={nodes.Cylinder009.material}
            position={[-0.51, -2.42, 0.03]}
            rotation={[0, 0, -0.9]}
            scale={[1.58, 0.66, 0.99]}
        />
        <mesh
            geometry={nodes.Cylinder011.geometry}
            material={nodes.Cylinder011.material}
            position={[-0.55, -0.67, -0.48]}
            rotation={[-0.37, -0.31, 0.95]}
            scale={[1.65, 0.65, 0.95]}
        />
        <mesh
            geometry={nodes.Cylinder012.geometry}
            material={nodes.Cylinder012.material}
            position={[0.45, -0.82, -0.46]}
            rotation={[-0.32, 0.27, -0.95]}
            scale={[1.65, 0.75, 0.96]}
        />
        <mesh
            geometry={nodes.Cylinder013.geometry}
            material={nodes.Cylinder013.material}
            position={[0.45, -0.82, 0.51]}
            rotation={[0.32, -0.27, -0.95]}
            scale={[1.65, 0.75, 0.96]}
        />
        <mesh
            geometry={nodes.Cylinder014.geometry}
            material={nodes.Cylinder014.material}
            position={[-1.01, -0.03, 0.03]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
            scale={[2.23, 0.75, 0.56]}
        />
        <mesh
            geometry={nodes.Cylinder015.geometry}
            material={nodes.Cylinder015.material}
            position={[1.01, -0.04, 0.03]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
            scale={[2.23, 0.75, 0.56]}
        />
        <mesh
            geometry={nodes.Cylinder017.geometry}
            material={nodes.Cylinder017.material}
            position={[1.01, -0.04, 0.03]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
            scale={[2.23, 0.75, 0.56]}
        />
        <mesh
            geometry={nodes.Cylinder018.geometry}
            material={nodes.Cylinder018.material}
            position={[-1.01, -0.03, 0.03]}
            rotation={[Math.PI / 2, -Math.PI / 2, 0]}
            scale={[2.23, 0.75, 0.56]}
        />
        <mesh
            geometry={nodes.Cylinder019.geometry}
            material={nodes.Cylinder019.material}
            position={[0.45, -0.82, 0.51]}
            rotation={[0.32, -0.27, -0.95]}
            scale={[1.65, 0.75, 0.96]}
        />
        <mesh
            geometry={nodes.Cylinder021_1.geometry}
            material={nodes.Cylinder021_1.material}
            position={[-0.55, -0.67, -0.48]}
            rotation={[-0.37, -0.31, 0.95]}
            scale={[1.65, 0.65, 0.95]}
        />
        <mesh
            geometry={nodes.Cylinder022.geometry}
            material={nodes.Cylinder022.material}
            position={[-0.55, -0.67, 0.53]}
            rotation={[0.37, 0.31, 0.95]}
            scale={[1.65, 0.65, 0.95]}
        />
        <mesh
            geometry={nodes.Cylinder023.geometry}
            material={nodes.Cylinder023.material}
            position={[-0.51, -2.42, 0.03]}
            rotation={[0, 0, -0.9]}
            scale={[1.58, 0.66, 0.99]}
        />
        <mesh
            geometry={nodes.Cylinder024.geometry}
            material={nodes.Cylinder024.material}
            position={[-0.89, -3.14, 0.03]}
            rotation={[0, 0, -1.19]}
            scale={[5, 0, 2.88]}
        />
    </mesh>
}

function MainBoard({ nodes, floorPlane, initialPosition, setIsDragging }){
    const [position, setPosition] = useState(initialPosition);
    let planeIntersectPoint = new THREE.Vector3();
    const bind = useDrag(({ offset: [x, y] , event, active, dragging}) => {
            if (active) {
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                setPosition([planeIntersectPoint.x, initialPosition[1], planeIntersectPoint.z]);
            }
            setIsDragging(active);
        }, { pointerEvents: true }
    );
    return <mesh
        geometry={nodes.main_board.geometry}
        material={nodes.main_board.material}
        position={position}
        {...bind()}
        onClick={(e) =>e.stopPropagation()}
        scale={[0.21, 3.38, 6]}
    >
        <mesh
            geometry={nodes.Cube004.geometry}
            material={nodes.Cube004.material}
            position={[-1, -1, 0]}
            scale={[0.8, 0.25, 1]}
        />
    </mesh>
}

function SecondBoard({ nodes, floorPlane, initialPosition, setIsDragging }){
    const [position, setPosition] = useState(initialPosition);
    let planeIntersectPoint = new THREE.Vector3();
    const bind = useDrag(({ offset: [x, y] , event, active, dragging}) => {
            if (active) {
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                setPosition([planeIntersectPoint.x, initialPosition[1], planeIntersectPoint.z]);
            }
            setIsDragging(active);
        }, { pointerEvents: true }
    );
    return <mesh
        geometry={nodes.second_board.geometry}
        material={nodes.second_board.material}
        position={position}
        {...bind()}
        onClick={(e) =>e.stopPropagation()}
        scale={[6, 3, 0.2]}
    >

    </mesh>
}

function Rostrum({ nodes, floorPlane, initialPosition, setIsDragging }){
    const [position, setPosition] = useState(initialPosition);
    let planeIntersectPoint = new THREE.Vector3();
    const bind = useDrag(({ offset: [x, y] , event, active, dragging}) => {
            if (active) {
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                setPosition([planeIntersectPoint.x, initialPosition[1], planeIntersectPoint.z]);
            }
            setIsDragging(active);
        }, { pointerEvents: true }
    );
    return <mesh
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={position}
        {...bind()}
        onClick={(e) =>e.stopPropagation()}
        scale={1.5}
    >
        <mesh
            geometry={nodes.Cube008.geometry}
            material={nodes.Cube008.material}
            position={[0, 1, 0]}
            scale={[1, 0.1, 1]}
        />
    </mesh>

}


export default function Model({ ...props }) {

  const { nodes, materials } = useGLTF("/final_booth_model.glb");
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  let floorPlane = new THREE.Plane(new THREE.Vector3(  -0.24, 0.5, 0.15 ), 0)
  const {setIsDragging} = props;

  console.log(nodes.sand.geometry)
  console.log(nodes.main_board.geometry)
  return (
    <group  {...props} dispose={null}>

      <mesh
        geometry={nodes.sand.geometry}
        material={nodes.sand.material}
        position={[-0.24, 0.5, 0.15]}
        scale={[10, 0.5, 10]}
      />

        <Rostrum nodes={nodes} floorPlane={floorPlane} setIsDragging={setIsDragging} initialPosition={[1.07, 2.66, 5.78]}/>
        <SecondBoard nodes={nodes} floorPlane={floorPlane} setIsDragging={setIsDragging} initialPosition={[1.05, 4, 9.15]}/>
        <MainBoard nodes={nodes} floorPlane={floorPlane} setIsDragging={setIsDragging} initialPosition={[7.76, 4.8, -0.61]}/>
        <TrashCan nodes={nodes} floorPlane={floorPlane} setIsDragging={setIsDragging} initialPosition={[5.39, 1.5, -7.96]}/>
        <Banner nodes={nodes} floorPlane={floorPlane} setIsDragging={setIsDragging} initialPosition={[0, 3.99, -7.5]}/>
        <Banner nodes={nodes} floorPlane={floorPlane} setIsDragging={setIsDragging} initialPosition={[-7.39, 3.99, 6.24]}/>

    </group>
  );
}

useGLTF.preload("/final_booth_model.glb");
