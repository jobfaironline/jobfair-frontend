import './JobFairParkMap.styles.scss';
import * as THREE from 'three';
import { Card, Modal, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { NotificationType } from '../../../constants/NotificationConstant';
import { PATH } from '../../../constants/Paths/Path';
import { addVideoTexture, fixTextureOffset, loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import { faHeart, faUsers, faX } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory } from 'react-router-dom';
import { getCompanyBoothById } from '../../../services/jobhub-api/CompanyBoothControllerService';
import {
  getJobFairByIDAPI,
  getLayoutInformationForJobFairPark
} from '../../../services/jobhub-api/JobFairControllerService';
import { leaveJobFair, visitJobFair } from '../../../services/jobhub-api/VisitControllerService';
import { selectWebSocket } from '../../../redux-flow/web-socket/web-socket-selector';
import { useSelector } from 'react-redux';
import JobFairParkMapComponent from '../../../components/3D/JobFairParkMap/JobFairParkMap.component';
import JobPositionDetailModalComponent from '../../../components/customized-components/JobPositionDetailModal/JobPositionDetailModal.component';
import React, { useEffect, useRef, useState } from 'react';

const { Title, Text, Paragraph } = Typography;

const getBootMesh = async (position, foundationBox, url, companyBoothId, companyBoothLayoutVideos, boothName) => {
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
  sceneMesh.boothName = boothName;
  for (const mesh of sceneMesh.children) {
    addVideoTexture(mesh, companyBoothLayoutVideos);
    fixTextureOffset(mesh);
  }
  return sceneMesh;
};

const JobFairParkMapContainer = ({ jobFairId }) => {
  const history = useHistory();
  const webSocketClient = useSelector(selectWebSocket);
  const [state, setState] = useState({
    boothMeshes: [],
    mapMesh: null,
    jobFairData: undefined
  });
  const [boothDialogState, setBoothDialogState] = useState({
    boothData: undefined,
    visible: false
  });
  const boothDialogLatestState = useRef(boothDialogState);

  useEffect(() => {
    visitJobFair(jobFairId);
    webSocketClient.addEvent('change-job-fair-booth-view', changeJobFairBoothView);
    const leaveJobFairFn = () => {
      leaveJobFair(jobFairId);
      webSocketClient.removeEvent('change-job-fair-booth-view');
      window.removeEventListener(leaveJobFairFn);
    };
    window.addEventListener('beforeunload', leaveJobFairFn);
    return () => {
      leaveJobFair(jobFairId);
      webSocketClient.removeEvent('change-job-fair-booth-view');
    };
  }, []);

  const changeJobFairBoothView = (notificationData) => {
    if (!boothDialogLatestState.current || !notificationData) return;
    if (notificationData.notificationType === NotificationType.VISIT_JOB_FAIR_BOOTH) {
      const messageObject = JSON.parse(notificationData.message);
      const { jobFairId: messageJobFairId, count, jobFairBoothId } = messageObject;
      if (messageJobFairId !== jobFairId) return;
      if (boothDialogLatestState.current.boothData.id !== jobFairBoothId) return;
      boothDialogLatestState.current.boothData.visitCount = count;
      setBoothDialogState({ ...boothDialogLatestState.current });
    }
  };

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
        companyBoothLayoutVideos,
        boothName: element.boothName
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
        slot.companyBoothLayoutVideos,
        slot.boothName
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

  const clickHandle = async (companyBoothId) => {
    const data = (await getCompanyBoothById(companyBoothId)).data;

    setBoothDialogState((prevState) => {
      boothDialogLatestState.current = { ...prevState, boothData: data, visible: true };
      return { ...prevState, boothData: data, visible: true };
    });
  };

  const closeDialog = () => {
    setBoothDialogState((prevState) => {
      boothDialogLatestState.current = { ...prevState, visible: false };
      return { ...prevState, visible: false };
    });
  };

  const handleJoinBooth = () => {
    const url = generatePath(PATH.BOOTH_PAGE, {
      companyBoothId: boothDialogState.boothData.id
    });
    history.push(url);
  };

  return (
    <div className={'job-fair-park-map'}>
      {boothDialogState.visible ? (
        <div className={'booth-information'}>
          <Card
            className={'card-dialog'}
            extra={
              <div onClick={closeDialog}>
                <FontAwesomeIcon icon={faX} size={'xl'} />
              </div>
            }
            actions={[
              <Title level={4} onClick={handleJoinBooth}>
                Join now
              </Title>
            ]}
            title={
              <div className={'header-status'}>
                <div>
                  <Title level={3} style={{ marginBottom: '0', marginRight: '10px' }}>
                    {boothDialogState.boothData?.visitCount}
                  </Title>
                  <FontAwesomeIcon icon={faUsers} size={'xl'} />
                </div>
                <div>
                  <FontAwesomeIcon icon={faHeart} size={'xl'} />
                </div>
              </div>
            }>
            <div className={'booth-name'}>{boothDialogState.boothData?.name}</div>
            <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}>
              {boothDialogState.boothData?.description}
            </Paragraph>
            <Title level={5}>{'Job positions'}</Title>
            <ul>
              {boothDialogState.boothData?.boothJobPositions.map((item) => (
                <li style={{ listStyleType: 'none' }}>
                  <Text
                    type='strong'
                    onClick={() =>
                      Modal.info({
                        title: 'Job position detail',
                        width: '50rem',
                        closable: true,
                        maskClosable: true,
                        content: <JobPositionDetailModalComponent data={item} />
                      })
                    }>
                    {item.title}
                  </Text>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      ) : null}
      <div className={'job-fair-name'}>
        <Title level={5}>{state.jobFairData.name}</Title>
      </div>
      <JobFairParkMapComponent mapMesh={state.mapMesh} boothMeshes={state.boothMeshes} onClick={clickHandle} />
    </div>
  );
};

export default JobFairParkMapContainer;
