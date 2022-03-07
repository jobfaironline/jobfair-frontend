import React, { useEffect, useState } from 'react'
import {addVideoTexture, fixTextureOffset, loadModel} from '../../utils/glbModelUtil'
import * as THREE from 'three'
import JobFairParkMapComponent from '../../components/JobFairParkMap/JobFairParkMap.component'
import { getLayoutInformationForJobFairPark } from '../../services/job-fair-controller/JobFairConTrollerService'
import { useHistory } from 'react-router-dom'
import { PATH } from '../../constants/Paths/Path'
const getBootMesh = async (position, foundationBox, url, companyBoothId, companyBoothLayoutVideos) => {
  const gltf = await loadModel(url)
  const { x, y, z } = position
  let sceneMesh = gltf.scene
  //set correct position
  sceneMesh.position.set(x, y, z)

  //scale booth model
  const foundationSize = new THREE.Vector3()
  foundationBox.getSize(foundationSize)

  const meshSize = new THREE.Vector3()
  const meshBoundingBox = new THREE.Box3().setFromObject(sceneMesh)
  meshBoundingBox.getSize(meshSize)

  const scale = Math.max(foundationSize.x / meshSize.x, foundationSize.z / meshSize.z)
  sceneMesh.scale.setScalar(scale)
  sceneMesh.companyBoothId = companyBoothId
  for (const mesh of sceneMesh.children){
    addVideoTexture(mesh, companyBoothLayoutVideos)
    fixTextureOffset(mesh)
  }
  return sceneMesh
}
const JobFairParkMapContainer = props => {
  const history = useHistory()
  const { jobFairId } = props
  const [state, setState] = useState({
    boothMeshes: [],
    mapMesh: null
  })

  useEffect(async () => {
    const responseData = await getLayoutInformationForJobFairPark(jobFairId).then(response => response.data)
    const url = responseData.jobFairLayoutUrl
    const data = responseData.booths
    const glb = await loadModel(url)

    const transformData = {}
    data.forEach(element => {
      const companyBoothLayoutVideos = {}
      element.companyBoothLayoutVideos?.forEach(data => {
        companyBoothLayoutVideos[data.itemName] = data.url;
      })
      transformData[element.slotName] = {
        position: element.position,
        boothUrl: element.boothUrl,
        companyBoothId: element.companyBoothId,
        sizeBox: null,
        companyBoothLayoutVideos: companyBoothLayoutVideos
      }
    })
    for (const mesh of glb.scene.children) {
      if (Object.keys(transformData).includes(mesh.name)) {
        transformData[mesh.name].sizeBox = new THREE.Box3().setFromObject(mesh)
      }
    }
    const newBoothMeshesPromise = []
    for (const slot of Object.values(transformData)) {
      const boothMesh = getBootMesh(slot.position, slot.sizeBox, slot.boothUrl, slot.companyBoothId, slot.companyBoothLayoutVideos)
      newBoothMeshesPromise.push(boothMesh)
    }
    const meshes = await Promise.all(newBoothMeshesPromise)

    setState({
      boothMeshes: meshes,
      mapMesh: glb.scene
    })
  }, [])

  if (state.mapMesh === null && state.boothMeshes.length === 0) {
    return null
  }

  const clickHandle = companyBoothId => {
    history.push(`${PATH.ATTENDANT_JOB_FAIR_PATH}${companyBoothId}`)
  }

  return <JobFairParkMapComponent mapMesh={state.mapMesh} boothMeshes={state.boothMeshes} onClick={clickHandle} />
}

export default JobFairParkMapContainer
