import './JobFairParkMap.styles.scss';
import * as THREE from 'three';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { PATH } from '../../../constants/Paths/Path';
import { Typography } from 'antd';
import { addVideoTexture, fixTextureOffset, loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import { generatePath, useHistory } from 'react-router-dom';
import {
  getJobFairByIDAPI,
  getLayoutInformationForJobFairPark
} from '../../../services/jobhub-api/JobFairControllerService';
import JobFairParkMapComponent from '../../../components/3D/JobFairParkMap/JobFairParkMap.component';
import React, { useEffect, useState } from 'react';

const { Title } = Typography;

const getBootMesh = async (position, foundationBox, url, companyBoothId, companyBoothLayoutVideos) => {
  const gltf = await loadGLBModel(url);
  const { x, y, z } = position;
  const sceneMesh = gltf.scene;
  //set correct position
  sceneMesh.position.set(x, y, z);

  //scale booth model
  const foundationSize = new THREE.Vector3();
  foundationBox.getSize(foundationSize);

  const meshSize = new THREE.Vector3();
  const meshBoundingBox = new THREE.Box3().setFromObject(sceneMesh);
  meshBoundingBox.getSize(meshSize);

  const scale = Math.max(foundationSize.x / meshSize.x, foundationSize.z / meshSize.z);
  sceneMesh.scale.setScalar(scale);
  sceneMesh.companyBoothId = companyBoothId;
  for (const mesh of sceneMesh.children) {
    addVideoTexture(mesh, companyBoothLayoutVideos);
    fixTextureOffset(mesh);
  }
  return sceneMesh;
};

const JobFairParkMapContainer = ({ jobFairId }) => {
  const history = useHistory();
  const [state, setState] = useState({
    boothMeshes: [],
    mapMesh: null,
    jobFairData: undefined
  });

  useEffect(async () => {
    const jobFairData = (await getJobFairByIDAPI(jobFairId)).data;
    const responseData = (await getLayoutInformationForJobFairPark(jobFairId)).data;
    const url = responseData.jobFairLayoutUrl;
    const data = responseData.booths;
    const glb = await loadGLBModel(url);

    const transformData = {};
    data.forEach((element) => {
      const companyBoothLayoutVideos = {};
      element.companyBoothLayoutVideos?.forEach((data) => {
        companyBoothLayoutVideos[data.itemName] = data.url;
      });
      transformData[element.slotName] = {
        position: element.position,
        boothUrl: element.boothUrl,
        companyBoothId: element.companyBoothId,
        sizeBox: null,
        companyBoothLayoutVideos
      };
    });
    for (const mesh of glb.scene.children) {
      if (Object.keys(transformData).includes(mesh.name))
        transformData[mesh.name].sizeBox = new THREE.Box3().setFromObject(mesh);
    }
    const newBoothMeshesPromise = [];
    for (const slot of Object.values(transformData)) {
      const boothMesh = getBootMesh(
        slot.position,
        slot.sizeBox,
        slot.boothUrl,
        slot.companyBoothId,
        slot.companyBoothLayoutVideos
      );
      newBoothMeshesPromise.push(boothMesh);
    }
    const meshes = await Promise.all(newBoothMeshesPromise);

    setState({
      boothMeshes: meshes,
      mapMesh: glb.scene,
      jobFairData
    });
  }, []);

  if (state.mapMesh === null && state.boothMeshes.length === 0) return <LoadingComponent isWholePage={true} />;

  const clickHandle = (companyBoothId) => {
    const url = generatePath(PATH.BOOTH_PAGE, {
      companyBoothId
    });
    history.push(url);
  };

  return (
    <div className={'job-fair-park-map'}>
      <div className={'job-fair-name'}>
        <Title level={5}>{state.jobFairData.name}</Title>
      </div>
      <JobFairParkMapComponent mapMesh={state.mapMesh} boothMeshes={state.boothMeshes} onClick={clickHandle} />;
    </div>
  );
};

export default JobFairParkMapContainer;
