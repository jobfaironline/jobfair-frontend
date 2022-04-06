import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import * as THREE from 'three'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { IMAGE_PLANE_NAME } from '../../constants/DecorateBoothConstant'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
loader.setDRACOLoader(dracoLoader)
const exporter = new GLTFExporter()

export async function loadGLBModel(url) {
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      data => resolve(data),
      null,
      error => reject(error)
    )
  })
}

export const parseModel = async mesh => {
  return new Promise(resolve => {
    exporter.parse(
      mesh,
      // called when the gltf has been generated
      function (gltf) {
        const blob = new Blob([gltf], { type: 'application/octet-stream' })
        resolve(blob)
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
  return { x_range, y_range, z_range }
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

export const addVideoTexture = (mesh, videoData) => {
  if (Object.keys(videoData).includes(mesh.name)) {
    const imagePlane = mesh.children.filter(child =>
      child.name.includes(IMAGE_PLANE_NAME)
    )[0]
    const vid = document.createElement('video')
    vid.crossOrigin = 'Anonymous'
    vid.loop = true
    vid.muted = true
    vid.src = videoData[mesh.name]
    vid.play()
    const texture = new THREE.VideoTexture(vid)
    texture.flipY = false
    texture.encoding = THREE.sRGBEncoding
    if (imagePlane !== undefined) {
      const newMaterial = imagePlane.material.clone()
      newMaterial.map = texture
      imagePlane.material = newMaterial
    } else {
      texture.rotation = Math.PI / 2
      const newMaterial = mesh.material.clone()
      newMaterial.map = texture
      mesh.material = newMaterial
    }
  }
}

export const fixTextureOffset = mesh => {
  if (mesh?.material?.map !== null) {
    mesh?.material?.map?.center.set(0.5, 0.5)
  }
  mesh.children.forEach(child => fixTextureOffset(child))
}

export const rotateModelLeft = (mesh, angleInDegree) => {
  const myAxis = new THREE.Vector3(0, 1, 0)
  mesh.rotateOnWorldAxis(myAxis, THREE.Math.degToRad(angleInDegree))
}

export const rotateModelRight = (mesh, angleInDegree) => {
  const myAxis = new THREE.Vector3(0, 1, 0)
  mesh.rotateOnWorldAxis(myAxis, -THREE.Math.degToRad(angleInDegree))
}

export const moveModelUp = (mesh, distance) => {
  mesh.position.set(
    mesh.position.x,
    mesh.position.y + distance,
    mesh.position.z
  )
}

export const moveModelDown = (mesh, distance) => {
  mesh.position.set(
    mesh.position.x,
    mesh.position.y - distance,
    mesh.position.z
  )
}

export const extractTexture = (mesh, meshName) => {
  let result = []
  if (mesh.material.map !== null && mesh.material.map.isVideoTexture) {
    result.push({ texture: mesh.material.map, meshName: meshName })
    const newMaterial = mesh.material.clone()
    newMaterial.map = null
    mesh.material = newMaterial
  }

  for (const child of mesh.children) {
    result = [...result, ...extractTexture(child, meshName)]
  }
  return result
}

export const b64toBlob = async (b64Data, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  return new Blob(byteArrays, { type: contentType })
}

export const loadFBXModel = async url => {
  const loader = new FBXLoader()
  return new Promise((resolve, reject) => {
    loader.load(
      url,
      data => resolve(data),
      null,
      error => reject(error)
    )
  })
}

export const getBase64Image = img => {
  // Create an empty canvas element
  const canvas = document.createElement('canvas')
  canvas.width = img.width
  canvas.height = img.height

  // Copy the image contents to the canvas
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)

  // Get the data-URL formatted image
  // Firefox supports PNG and JPEG. You could check img.src to
  // guess the original format, but be aware the using "image/jpg"
  // will re-encode the image.
  return canvas.toDataURL('image/png')
}
