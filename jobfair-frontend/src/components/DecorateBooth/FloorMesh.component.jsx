import {useSelector} from "react-redux";
import {ModeConstant} from "../../constants/AppConst";
import * as THREE from "three";
import {
    calculateMeshDimensionRange,
    calculateMeshSize,
    calculatePositionWithBoundary,
    loadModel
} from "../../utils/glbModelUtil";
import {BasicMesh} from "../ThreeJSBaseComponent/ChildMesh.component";
import React from "react";

export const FloorMesh = (props) => {
    const { mesh, handleAdd } = props
    const mode =  useSelector(state => state.decorateBooth.mode)
    const selectedSampleItem = useSelector(state => state.decorateBooth.selectedSampleItem)

    const onPlaneClick = async e => {
        if (mode !== ModeConstant.ADD) return
        if (selectedSampleItem.id === undefined) {
            return
        }
        //get intersection point between click coordinate and plane coordinate
        const planeIntersectPoint = new THREE.Vector3()
        const floorPlane = new THREE.Plane(new THREE.Vector3(mesh.position.x, mesh.position.y + 0.5, mesh.position.z))
        e.ray.intersectPlane(floorPlane, planeIntersectPoint)

        //load new item mesh
        const gltf = await loadModel(selectedSampleItem.url)
        const itemMesh = gltf.scene.children[0]

        //calculate new item position on plane
        const { x_range: floor_x_range, z_range: floor_z_range } = calculateMeshDimensionRange(mesh)
        const { length: item_length, width: item_width, height: item_height } = calculateMeshSize(itemMesh)
        const { height: floor_height } = calculateMeshSize(mesh)
        const { x, y, z } = calculatePositionWithBoundary({
            x: planeIntersectPoint.x,
            y: mesh.position.y + floor_height / 2 + item_height / 2,
            z: planeIntersectPoint.z,
            x_range: floor_x_range,
            y_range: [-1000, 10000],
            z_range: floor_z_range,
            height: item_length,
            width: item_width,
            length: item_height
        })
        itemMesh.position.set(x, y, z)
        handleAdd(itemMesh);

    }
    return (
        <mesh
            name={mesh.name}
            onClick={onPlaneClick}
            key={mesh.uuid}
            uuid={mesh.uuid}
            geometry={mesh.geometry}
            material={mesh.material}
            position={mesh.position}
            rotation={mesh.rotation}
            scale={mesh.scale}
            castShadow
            receiveShadow
        >
            {mesh.children.map(child => <BasicMesh mesh={child} key={child.uuid}/>)}
        </mesh>
    )
}