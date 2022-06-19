import { AssignEmployeeBoothList } from '../../../components/customized-components/AssignEmployeeBoothList/AssignEmployeeBoothList.component';
import { AssignEmployeeModalContainer } from '../../AssignEmployeeModal/AssignEmployeeModal.container';
import { Button } from 'antd';
import { ChooseBoothCanvas } from '../../../components/3D/ChooseBooth/ChooseBoothCanvas.component';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { SideBarComponent } from '../../../components/commons/SideBar/SideBar.component';
import { UploadCSVModal } from '../../UploadModal/UploadCSVModal.container';
import { getAssigmentByJobFairBoothId, uploadCSVFile } from '../../../services/jobhub-api/AssignmentControllerService';
import { getJobFairBoothByJobFairId } from '../../../services/jobhub-api/JobFairBoothControllerService';
import { getLayoutByJobFairId } from '../../../services/jobhub-api/LayoutControllerService';
import { loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import { uploadUtil } from '../../../utils/uploadCSVUtil';
import React, { useEffect, useRef, useState } from 'react';

const assignBoothColors = ['F9C80E', 'F86624', 'EA3546', '662E9B', '43BCCD', 'FF8811', 'F4D06F', '9DD9D2', '392F5A'];

export const AssignEmployeeContainer = (props) => {
  const { jobFairId, onHandleNext, onHandlePrev, currentStep, handleGotoChecklist } = props;
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
  const [uploadCSVModalVisibility, setUploadCSVModalVisibility] = useState(false);
  const [rerender, setRender] = useState(false);

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

    data.forEach((boothInfo, index) => {
      const id = boothInfo.id;
      const name = boothInfo.booth.name;
      boothData[name] = {
        id,
        color: `#${assignBoothColors[index % assignBoothColors.length]}`
      };
    });

    setState((prevState) => ({ ...prevState, glbMesh: glb.scene, boothDataForMesh: boothData, boothData: data }));
  }, []);

  useEffect(async () => {
    const data = await fetchBoothAssigmentData();
    setState((prevState) => ({ ...prevState, boothData: data }));
  }, [rerender]);

  const onClickUploadCSV = () => {
    setUploadCSVModalVisibility(true);
  };

  const onUpload = async (file) => {
    await uploadUtil(file, uploadCSVFile, jobFairId);
  };

  const onCloseUploadModal = () => {
    setUploadCSVModalVisibility(false);
    setRender((prevState) => !prevState);
  };

  if (state.glbMesh === undefined || state.boothDataForMesh.length === 0)
    return <LoadingComponent isWholePage={true} />;

  return (
    <>
      <UploadCSVModal
        visible={uploadCSVModalVisibility}
        handleUpload={onUpload}
        onCancel={onCloseUploadModal}
        templateURl={`${window.location.origin}/xlsx_template/assignment_success.xlsx`}
      />
      <SideBarComponent
        rightSide={
          <>
            <Button
              onClick={handleGotoChecklist}
              style={{
                position: 'absolute',
                zIndex: 1000,
                right: 0
              }}>
              Go to checklist
            </Button>
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
          </>
        }
        leftSide={
          <AssignEmployeeBoothList
            onHandleNext={onHandleNext}
            onHandlePrev={onHandlePrev}
            data={state.boothData}
            onHoverIn={onBoothMouseOver}
            onHoverOut={onBoothMouseOut}
            onBoothClick={onBoothClick}
            onClickUploadCSV={onClickUploadCSV}
            boothData={state.boothDataForMesh}
          />
        }
        nextButtonContent={'Start design landing page'}
        prevButtonContent={'Back to set booth timeline'}
        onNext={onHandleNext}
        isPrevButtonDisable={false}
        onPrev={onHandlePrev}
        ratio={450 / 1728}
        currentStep={currentStep}
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
