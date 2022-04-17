import { AssignEmployeeBoothList } from '../../../components/customized-components/AssignEmployeeBoothList/AssignEmployeeBoothList.component';
import { AssignEmployeeModalContainer } from '../../AssignEmployeeModal/AssignEmployeeModal.container';
import { ChooseBoothCanvas } from '../../../components/3D/ChooseBooth/ChooseBoothCanvas.component';
import { SideBarComponent } from '../../../components/commons/SideBar/SideBar.component';
import { getAssigmentByJobFairBoothId } from '../../../services/jobhub-api/AssignmentControllerService';
import { getJobFairBoothByJobFairId } from '../../../services/jobhub-api/JobFairBoothControllerService';
import { getLayoutByJobFairId } from '../../../services/jobhub-api/LayoutControllerService';
import { loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import React, { useEffect, useRef, useState } from 'react';
import ReactLoading from 'react-loading';

export const AssignEmployeeContainer = (props) => {
  const { jobFairId, onHandleNext, onHandlePrev } = props;
  const [state, setState] = useState({
    glbMesh: undefined,
    boothDataForMesh: {},
    boothData: []
  });
  const [modalState, setModalState] = useState({
    isVisible: false,
    boothId: ''
  });
  const [selectionRef, setSelectionRef] = useState();
  const [hoverRef, setHoverRef] = useState();
  const boothMeshesRef = useRef([]);

  const onBoothClick = (boothId, meshName) => {
    const ref = boothMeshesRef?.current?.filter((meshRef) => meshRef?.current?.name === meshName)[0];
    setSelectionRef(ref);
    setModalState((prevState) => ({ ...prevState, boothId, isVisible: true }));
  };

  const handleCancel = () => {
    setSelectionRef(undefined);
    setModalState((prevState) => ({ ...prevState, boothId: '', isVisible: false }));
  };

  const onBoothMouseOver = (meshName) => {
    const ref = boothMeshesRef?.current?.filter((meshRef) => meshRef?.current?.name === meshName)[0];
    if (ref?.current?.uuid !== hoverRef?.current?.uuid) setHoverRef(ref);
  };
  const onBoothMouseOut = () => {
    setHoverRef(undefined);
  };
  const handleModalOk = async () => {
    const data = await fetchBoothAssigmentData();
    setSelectionRef(undefined);
    setModalState((prevState) => ({ ...prevState, boothId: '', isVisible: false }));
    setState((prevState) => ({ ...prevState, boothData: data }));
  };

  const fetchBoothAssigmentData = async () => {
    let data = await getJobFairBoothByJobFairId(jobFairId).then((response) => response.data);

    data = data.sort((booth1, booth2) => booth1.booth.name.localeCompare(booth2.booth.name));

    const assignmentPromises = [];
    for (const booth of data) {
      const promise = getAssigmentByJobFairBoothId(booth.id).then((response) => response.data);
      assignmentPromises.push(promise);
    }
    const assignments = await Promise.all(assignmentPromises);
    for (let i = 0; i < assignments.length; i++) data[i].assignments = assignments[i] === '' ? [] : assignments[i];
    return data;
  };

  useEffect(async () => {
    const data = await fetchBoothAssigmentData();
    const layoutData = await getLayoutByJobFairId(jobFairId).then((response) => response.data);
    const url = layoutData.url;

    const glb = await loadGLBModel(url);
    const boothData = {};
    for (const boothInfo of data) {
      const id = boothInfo.id;
      const name = boothInfo.booth.name;
      boothData[name] = {
        id
      };
    }

    setState((prevState) => ({ ...prevState, glbMesh: glb.scene, boothDataForMesh: boothData, boothData: data }));
  }, []);

  if (state.glbMesh === undefined || state.boothDataForMesh.length === 0) {
    return (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <ReactLoading type={'spin'} color={'#1890ff'} height={100} width={100} />
      </div>
    );
  }

  return (
    <>
      <SideBarComponent
        leftSide={
          <ChooseBoothCanvas
            mesh={state.glbMesh}
            boothData={state.boothDataForMesh}
            jobFairId={jobFairId}
            onClick={onBoothClick}
            selectionRef={selectionRef}
            onCompanyGroundPointerOver={onBoothMouseOver}
            onCompanyGroundPointerOut={onBoothMouseOut}
            hoverRef={hoverRef}
            boothMeshesRef={boothMeshesRef}
          />
        }
        rightSide={
          <AssignEmployeeBoothList
            onHandleNext={onHandleNext}
            onHandlePrev={onHandlePrev}
            data={state.boothData}
            onHoverIn={onBoothMouseOver}
            onHoverOut={onBoothMouseOut}
            onClick={onBoothClick}
          />
        }
        nextButtonContent={'Start design landing page'}
        prevButtonContent={'Back to set booth timeline'}
        onNext={onHandleNext}
        isPrevButtonDisable={false}
        onPrev={onHandlePrev}
        ratio={3 / 4}
      />
      {modalState.isVisible ? (
        <AssignEmployeeModalContainer
          boothId={modalState.boothId}
          handleCancel={handleCancel}
          handleOk={handleModalOk}
          jobFairId={jobFairId}
        />
      ) : null}
    </>
  );
};
