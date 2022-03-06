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
    //fetch this from BE
    const responseData = await getLayoutInformationForJobFairPark(jobFairId).then(response => response.data)
    const url = responseData.jobFairLayoutUrl
    const data = responseData.booths
    //the bellow is the data format
    /*const data = [
            {
                position: {x: 19.592493057250977, y: 2.200000047683716, z: 15.210623741149902},
                slotName: "company00",
                boothUrl: 'https://d3polnwtp0nqe6.cloudfront.net/Booth/bf78dec0-98b3-41f7-bca0-72e2c65abcfb',
                companyBoothId: "123",
            },
            {
                position: {x: -30.822830200195312, y: 2.200000047683716, z: -15.00773811340332},
                slotName: "company01",
                boothUrl: 'https://d3polnwtp0nqe6.cloudfront.net/Booth/bf78dec0-98b3-41f7-bca0-72e2c65abcfb',
                companyBoothId: "1234",
                companyBoothLayoutVideos: [
                  {
                    "id": "065aad8b-3974-445a-9331-cd32b70e2433",
                    "url": "https://d3polnwtp0nqe6.cloudfront.net/BoothVideo/065aad8b-3974-445a-9331-cd32b70e2433",
                    "itemName": "banner01",
                    "companyBoothLayoutId": "3c35dd82-42fb-48e8-8afd-da198616f541"
                  },
                  {
                    "id": "0f64578a-3a60-47f4-96a5-69ff40e3dbb1",
                    "url": "https://d3polnwtp0nqe6.cloudfront.net/BoothVideo/0f64578a-3a60-47f4-96a5-69ff40e3dbb1",
                    "itemName": "main_board",
                    "companyBoothLayoutId": "3c35dd82-42fb-48e8-8afd-da198616f541"
                  }
               ]
            },
            {
                position: {x: -16.091472625732422, y: 2.200000047683716, z: 13.914505958557129},
                slotName: "company02",
                boothUrl: 'https://d3polnwtp0nqe6.cloudfront.net/Booth/bf78dec0-98b3-41f7-bca0-72e2c65abcfb',
                companyBoothId: "12345",
            },

        ];*/

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

    //GET data from BE
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
