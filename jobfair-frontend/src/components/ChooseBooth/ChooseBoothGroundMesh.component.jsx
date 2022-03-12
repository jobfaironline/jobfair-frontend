import React, {useRef} from "react";
import {BasicMesh} from "../ThreeJSBaseComponent/ChildMesh.component";

export const ChooseBoothGroundMesh = (props) => {
    const {mesh, onPointerOver, onPointerLeave, onClick, isAvailable} = props;
    const ref = useRef();
    if (!isAvailable){
        const newMaterial = mesh.material.clone();
        newMaterial.color.set(0xf54254)
        newMaterial.transparent = true
        mesh.material = newMaterial
    } else {
        const newMaterial = mesh.material.clone();
        newMaterial.color.set(0x42f56f)
        newMaterial.transparent = true
        mesh.material = newMaterial
    }
    return (
        <mesh
            ref={ref}
            name={mesh.name}
            key={mesh.uuid}
            geometry={mesh.geometry}
            material={mesh.material}
            position={mesh.position}
            rotation={mesh.rotation}
            scale={mesh.scale}
            castShadow
            receiveShadow
            onPointerOver={_ => {
                if (!isAvailable) return;
                onPointerOver(ref)
            }}
            onPointerLeave={_ => {
                if (!isAvailable) return;
                onPointerLeave(ref);
            }}
            onClick={isAvailable ? onClick : null}
        >
            {mesh.children.map(child => (
                <BasicMesh mesh={child}/>
            ))}
        </mesh>
    )
}