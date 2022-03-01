import React, {useRef} from "react";
import {ChildMesh} from "../../pages/JobFairPackPage/components/model/Final_booth_model";

export const ChooseBoothGroundMesh = (props) => {
    const {mesh, onPointerOver, onPointerLeave} = props;
    const ref = useRef()
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
            onPointerOver={event => {
                onPointerOver(ref)
            }}
            onPointerLeave={event => {
                onPointerLeave(ref);
            }}
        >
            {mesh.children.map(child => (
                <ChildMesh mesh={child}/>
            ))}
        </mesh>
    )
}