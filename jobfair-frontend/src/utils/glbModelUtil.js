/* eslint-disable no-unused-vars */

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import * as THREE from 'three'
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader";

const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader();
loader.setDRACOLoader( dracoLoader );


const exporter = new GLTFExporter()

export async function loadModel(url) {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      data => resolve(data),
      null,
      error => reject(error)
    )
  })
}

export const parseModel = async (mesh) => {
  return new Promise(resolve => {
    exporter.parse(
        mesh,
        // called when the gltf has been generated
        function (gltf) {
          const blob = new Blob([gltf], { type: 'application/octet-stream' })
          resolve(blob);
        },
        // called when there is an error in the generation
        function (error) {
          console.log(error)
        },
        {
          binary: true,
          trs: true
        }
    )
  })
}

export const downloadModel = mesh => {
  exporter.parse(
    mesh,
    // called when the gltf has been generated
    function (gltf) {
      const link = document.createElement('a')
      link.style.display = 'none'
      document.body.appendChild(link)
      const blob = new Blob([gltf], { type: 'application/octet-stream' })
      link.href = URL.createObjectURL(blob)
      link.download = 'scene.glb'
      link.click()
      document.body.removeChild(link)
    },
    // called when there is an error in the generation
    function (error) {
      console.log(error)
    },
    {
      binary: true,
      trs: true
    }
  )
}

export const calculateMeshDimensionRange = mesh => {
  const borderBox = new THREE.Box3().setFromObject(mesh)
  const x_range = { min: borderBox.min.x, max: borderBox.max.x }
  const y_range = { min: borderBox.min.y, max: borderBox.max.y }
  const z_range = { min: borderBox.min.z, max: borderBox.max.z }
  return {
    x_range,
    y_range,
    z_range
  }
}

export const calculateMeshSize = mesh => {
  const meshSize = new THREE.Box3().setFromObject(mesh, true)
  const vector = new THREE.Vector3()
  meshSize.getSize(vector)
  return { length: vector.x, height: vector.y, width: vector.z }
}

export const calculatePositionWithBoundary = ({
  x,
  y,
  z,
  x_range,
  y_range,
  z_range,
  length,
  width,
  height
}) => {
  let new_x = x
  let new_y = y
  let new_z = z
  if (x <= x_range.min + length / 2) new_x = x_range.min + length / 2
  if (x >= x_range.max - length / 2) new_x = x_range.max - length / 2
  if (y <= y_range.min + height / 2) new_x = y_range.min + height / 2
  if (y >= y_range.max - height / 2) new_x = y_range.max - height / 2
  if (z <= z_range.min + width / 2) new_z = z_range.min + width / 2
  if (z >= z_range.max - width / 2) new_z = z_range.max - width / 2

  return {
    x: new_x,
    y: new_y,
    z: new_z
  }
}

export const fixTextureOffset = (mesh) => {
  if (mesh?.material?.map !== null) {
    mesh?.material?.map?.center.set(0.5, 0.5)
  }
  mesh.children.forEach(child => fixTextureOffset(child));
}
