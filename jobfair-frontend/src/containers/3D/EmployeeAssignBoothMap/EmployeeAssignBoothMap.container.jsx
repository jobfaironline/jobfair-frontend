import { EmployeeAssignBoothMapCanvas } from '../../../components/3D/EmployeeAssignBoothMap/EmployeeAssignBoothMapCanvas.component';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { PATH } from '../../../constants/Paths/Path';
import { generatePath, useHistory, useParams } from 'react-router-dom';
import { getAssignmentById } from '../../../services/jobhub-api/AssignmentControllerService';
import { getLayoutByJobFairId } from '../../../services/jobhub-api/LayoutControllerService';
import { loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import { notification } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

export const EmployeeAssignBoothMapContainer = () => {
  const { assignmentId } = useParams();
  const history = useHistory();
  const [state, setState] = useState({
    glb: undefined,
    jobFairBoothData: undefined
  });
  const [hoverRef, setHoverRef] = useState();
  const boothMeshesRef = useRef([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const assigmentData = (await getAssignmentById(assignmentId)).data;
      const jobFairId = assigmentData.jobFairBooth.jobFair.id;
      const layoutData = (await getLayoutByJobFairId(jobFairId)).data;
      const glb = await loadGLBModel(layoutData.url);
      const boothName = assigmentData.jobFairBooth.booth.name;

      //change color for booth base
      glb.scene.children.forEach((child) => {
        if (child.name.includes(boothName)) {
          const newMaterial = child.material.clone();
          newMaterial.color.set(0x42f56f);
          newMaterial.transparent = true;
          child.material = newMaterial;
        }
      });

      setState({
        glb: glb.scene,
        jobFairBoothData: assigmentData.jobFairBooth
      });
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  const onBoothMouseOver = (meshName) => {
    const ref = boothMeshesRef?.current?.filter((meshRef) => meshRef?.current?.name === meshName)[0];
    if (ref?.current?.uuid !== hoverRef?.current?.uuid) setHoverRef(ref);
  };
  const onBoothMouseOut = () => {
    setHoverRef(undefined);
  };

  const onClick = () => {
    const jobFairId = state.jobFairBoothData.jobFair.id;
    const boothId = state.jobFairBoothData.id;
    const url = generatePath(PATH.DECORATE_BOOTH_PAGE, {
      jobFairId,
      companyBoothId: boothId
    });
    history.push(url);
  };

  return state.glb ? (
    <EmployeeAssignBoothMapCanvas
      mapMesh={state.glb}
      jobFairBoothData={state.jobFairBoothData}
      boothMeshesRef={boothMeshesRef}
      onBoothMouseOver={onBoothMouseOver}
      onBoothMouseOut={onBoothMouseOut}
      hoverRef={hoverRef}
      onClick={onClick}
    />
  ) : (
    <LoadingComponent isWholePage={true} />
  );
};
