import { ChooseBoothCanvas } from '../../../components/3D/ChooseBooth/ChooseBoothCanvas.component';
import { getLayoutAndAvailableSlotByJobFairId } from '../../../services/jobhub-api/LayoutControllerService';
import { loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

export const ChooseBoothPageContainer = (props) => {
  const { jobFairId } = props;
  const [state, setState] = useState({
    glbMesh: undefined,
    boothData: []
  });

  useEffect(async () => {
    const data = await getLayoutAndAvailableSlotByJobFairId(jobFairId).then((response) => response.data);
    const url = data.url;

    const glb = await loadGLBModel(url);
    const boothData = {};
    for (const boothInfo of data.booths) {
      const { id, name, price, status } = boothInfo;
      boothData[name] = {
        id,
        price,
        status
      };
    }

    setState((prevState) => ({ ...prevState, glbMesh: glb.scene, boothData }));
  }, []);

  if (state.glbMesh === undefined || state.boothData.length === 0) {
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
  return <ChooseBoothCanvas mesh={state.glbMesh} boothData={state.boothData} jobFairId={jobFairId} />;
};
