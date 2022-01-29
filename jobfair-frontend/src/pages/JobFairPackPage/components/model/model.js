import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { notify } from "../../../../utils/toastutil";
export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/map3Dv1.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Icosphere.geometry}
        material={nodes.Icosphere.material}
        position={[-19.55, 8.76, -17.03]}
        scale={1.14}
      />
      <mesh
        geometry={nodes.company_2.geometry}
        material={materials["com02.01"]}
        onClick={() => {
          console.log("Clicked");
          notify(2, "Company 02: Clicked");
        }}
        position={[-14.27, 3.14, 13.63]}
        rotation={[0, 1.57, 0]}
        scale={[3.96, 6.01, 3.96]}
      >
        <mesh
          geometry={nodes.logo_04.geometry}
          material={materials["com02.02"]}
          onClick={() => {
            console.log("Clicked");
            notify(2, "Company 02: Clicked");
          }}
          position={[0, 2.51, 0]}
          rotation={[-Math.PI, 1.56, -Math.PI]}
          scale={[1.5, 0.66, 0.1]}
        />
      </mesh>
      <mesh
        geometry={nodes["company-4"].geometry}
        material={materials["com4.02"]}
        onClick={() => {
          console.log("Clicked");
          notify(2, "Company 04: Clicked");
        }}
        position={[20.46, 22.68, 13.27]}
        rotation={[Math.PI / 2, 0, 3.13]}
        scale={[5.94, 0.4, 3.96]}
      >
        <mesh
          geometry={nodes.company_3001.geometry}
          material={materials["com4.01"]}
          onClick={() => {
            console.log("Clicked");
            notify(2, "Company 04: Clicked");
          }}
          position={[0, 0, 4.84]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={[1.33, 8, 20]}
        />
      </mesh>
      <mesh
        geometry={nodes.company_3.geometry}
        material={materials["com03.01"]}
        onClick={() => {
          console.log("Clicked");
          notify(2, "Company 03: Clicked");
        }}
        position={[-0.34, 9.57, -16.57]}
        scale={[3.96, 7.92, 3.96]}
      >
        <mesh
          geometry={nodes.logo_2.geometry}
          material={materials["com03.02"]}
          onClick={() => {
            console.log("Clicked");
            notify(2, "Company 02: Clicked");
          }}
          position={[0.02, 1.68, 0]}
          rotation={[Math.PI, -1.57, Math.PI]}
          scale={[0.1, 0.5, 1.5]}
        />
      </mesh>
      <mesh
        geometry={nodes.company_1.geometry}
        material={materials["com01.01"]}
        onClick={() => {
          console.log("Clicked");
          notify(2, "Company 01: Clicked");
        }}
        position={[-31.39, 8.25, -17.93]}
        rotation={[Math.PI, -1.57, Math.PI]}
        scale={[-3.22, -6.55, -3.8]}
      >
        <mesh
          geometry={nodes.Cube005.geometry}
          material={materials["com01.02"]}
          onClick={() => {
            console.log("Clicked");
            notify(2, "Company 01: Clicked");
          }}
          position={[0.06, -1.93, 0.03]}
          scale={[-0.06, -0.61, -1.58]}
        />
      </mesh>
      <mesh
        geometry={nodes.Chau_cay004.geometry}
        material={nodes.Chau_cay004.material}
        position={[-36.7, 4.94, 24.54]}
        scale={[0.71, 0.15, 0.47]}
      />
      <mesh
        geometry={nodes.Den.geometry}
        material={nodes.Den.material}
        position={[31.6, 5.83, -33.67]}
      />
      <mesh
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        position={[0, 1.94, -5.97]}
        scale={[40, 1, 40]}
      >
        <mesh
          geometry={nodes.Chau_cay.geometry}
          material={nodes.Chau_cay.material}
          position={[0.3, 3, 0.13]}
          rotation={[-Math.PI, 0.02, -Math.PI]}
          scale={[0.02, 0.15, 0.01]}
        />
        <mesh
          geometry={nodes.Chau_cay001.geometry}
          material={nodes.Chau_cay001.material}
          position={[0.26, 3, 0.01]}
          scale={[0.02, 0.15, 0.01]}
        />
        <mesh
          geometry={nodes.Chau_cay009.geometry}
          material={nodes.Chau_cay009.material}
          position={[0.45, 3, 0.01]}
          scale={[0.02, 0.15, 0.01]}
        />
      </mesh>
      <mesh
        geometry={nodes.Chau_cay002.geometry}
        material={nodes.Chau_cay002.material}
        position={[-20.68, 4.94, -31.5]}
        scale={[0.71, 0.15, 0.47]}
      />
      <mesh
        geometry={nodes.Chau_cay003.geometry}
        material={nodes.Chau_cay003.material}
        position={[10.55, 4.94, -53.4]}
        rotation={[-Math.PI, 0.02, -Math.PI]}
        scale={[0.71, 0.15, 0.47]}
      />
      <mesh
        geometry={nodes.Chau_cay005.geometry}
        material={nodes.Chau_cay005.material}
        position={[33.13, 4.94, -31.5]}
        scale={[0.71, 0.15, 0.47]}
      />
      <mesh
        geometry={nodes.Icosphere003.geometry}
        material={nodes.Icosphere003.material}
        position={[26.27, 8.76, -42.25]}
        scale={1.14}
      />
      <mesh
        geometry={nodes.Chau_cay006.geometry}
        material={nodes.Chau_cay006.material}
        position={[15.83, 4.94, -31.6]}
        scale={[0.71, 0.15, 0.47]}
      />
      <mesh
        geometry={nodes.Chau_cay007.geometry}
        material={nodes.Chau_cay007.material}
        position={[-7.82, 4.94, -52.73]}
        rotation={[-Math.PI, 0.02, -Math.PI]}
        scale={[0.71, 0.15, 0.47]}
      />
      <mesh
        geometry={nodes.Icosphere004.geometry}
        material={nodes.Icosphere004.material}
        position={[-0.7, 8.76, -42.68]}
        rotation={[-Math.PI, 0.02, -Math.PI]}
        scale={1.14}
      />
      <mesh
        geometry={nodes.Chau_cay008.geometry}
        material={nodes.Chau_cay008.material}
        position={[-37.8, 4.94, -31.6]}
        scale={[0.71, 0.15, 0.47]}
      />
      <mesh
        geometry={nodes.Icosphere005.geometry}
        material={nodes.Icosphere005.material}
        position={[-27.36, 8.76, -42.25]}
        scale={1.14}
      />
      <mesh
        geometry={nodes.Den001.geometry}
        material={nodes.Den001.material}
        position={[13.01, 5.83, -33.67]}
      />
      <mesh
        geometry={nodes.Den002.geometry}
        material={nodes.Den002.material}
        position={[-5.7, 5.83, -33.67]}
      />
      <mesh
        geometry={nodes.Den003.geometry}
        material={nodes.Den003.material}
        position={[-23.4, 5.83, -33.67]}
      />
      <mesh
        geometry={nodes.Den004.geometry}
        material={nodes.Den004.material}
        position={[13.38, 5.83, 25.61]}
      />
      <mesh
        geometry={nodes.Den005.geometry}
        material={nodes.Den005.material}
        position={[21.27, 5.83, -8.29]}
      />
      <mesh
        geometry={nodes.Den007.geometry}
        material={nodes.Den007.material}
        position={[-19.92, 5.83, 24.87]}
      />
      <mesh
        geometry={nodes.Den006.geometry}
        material={nodes.Den006.material}
        position={[-26.06, 5.83, -8.24]}
      />
      <mesh
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[-20.69, 3.09, -42.98]}
        rotation={[-2.37, -1.53, -2.21]}
        scale={[0.02, 0.11, 1.06]}
      />
      <mesh
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[-28.83, 3.09, -42.98]}
        rotation={[-2.37, -1.53, -2.21]}
        scale={[0.02, 0.11, 1.06]}
      />
      <mesh
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
        position={[-12.57, 3.09, -42.98]}
        rotation={[-2.37, -1.53, -2.21]}
        scale={[0.02, 0.11, 1.06]}
      />
      <mesh
        geometry={nodes.Cube006.geometry}
        material={nodes.Cube006.material}
        position={[-3.67, 3.09, -42.98]}
        rotation={[-2.37, -1.53, -2.21]}
        scale={[0.02, 0.11, 1.06]}
      />
      <mesh
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={[5.98, 3.09, -42.98]}
        rotation={[-2.37, -1.53, -2.21]}
        scale={[0.02, 0.11, 1.06]}
      />
      <mesh
        geometry={nodes.Cube008.geometry}
        material={nodes.Cube008.material}
        position={[15.88, 3.09, -42.98]}
        rotation={[-2.37, -1.53, -2.21]}
        scale={[0.02, 0.11, 1.06]}
      />
      <mesh
        geometry={nodes.Cube009.geometry}
        material={nodes.Cube009.material}
        position={[24.59, 3.09, -42.98]}
        rotation={[-2.37, -1.53, -2.21]}
        scale={[0.02, 0.11, 1.06]}
      />
      <mesh
        geometry={nodes.Cube010.geometry}
        material={nodes.Cube010.material}
        position={[33.05, 3.09, -42.98]}
        rotation={[-2.37, -1.53, -2.21]}
        scale={[0.02, 0.11, 1.06]}
      />
      <mesh
        geometry={nodes.Den008.geometry}
        material={nodes.Den008.material}
        position={[3.71, 5.83, -8.29]}
      />
      <mesh
        geometry={nodes.Den009.geometry}
        material={nodes.Den009.material}
        position={[13.38, 5.83, 4.84]}
      />
      <mesh
        geometry={nodes.Den010.geometry}
        material={nodes.Den010.material}
        position={[-34.17, 5.83, 24.87]}
      />
      <mesh
        geometry={nodes.Den011.geometry}
        material={nodes.Den011.material}
        position={[-26.06, 5.83, 4.98]}
      />
      <mesh
        geometry={nodes.Icosphere006.geometry}
        material={nodes.Icosphere006.material}
        position={[-27.36, 8.76, 17.94]}
        scale={1.14}
      />
      <mesh
        geometry={nodes.Icosphere007.geometry}
        material={nodes.Icosphere007.material}
        position={[-27.36, 8.76, 9.81]}
        rotation={[Math.PI, -1.54, Math.PI]}
        scale={1.14}
      />
      <mesh
        geometry={nodes.Icosphere008.geometry}
        material={nodes.Icosphere008.material}
        position={[9.71, 8.76, 18.86]}
        rotation={[-Math.PI, 0.02, -Math.PI]}
        scale={1.14}
      />
    </group>
  );
}

useGLTF.preload("/map3Dv1.glb");
