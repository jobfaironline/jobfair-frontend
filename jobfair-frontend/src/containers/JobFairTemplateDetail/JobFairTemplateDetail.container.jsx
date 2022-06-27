import { PRIMARY_COLOR } from '../../styles/custom-theme';
import { getLayoutDetail } from '../../services/jobhub-api/LayoutControllerService';
import { loadGLBModel } from '../../utils/ThreeJS/threeJSUtil';
import { useParams } from 'react-router-dom';
import JobFairParkMapComponent from '../../components/3D/JobFairParkMap/JobFairParkMap.component';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';

const JobFairTemplateDetailContainer = () => {
  const template = useParams();
  const [glb, setGlb] = useState(undefined);

  useEffect(async () => {
    const res = await getLayoutDetail(template.templateId);
    const glb = await loadGLBModel(res.data.url);
    setGlb(glb.scene);
  }, []);
  return (
    <>
      <div>
        {glb !== undefined ? (
          <JobFairParkMapComponent mapMesh={glb} />
        ) : (
          <div
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <ReactLoading type={'spin'} color={PRIMARY_COLOR} height={100} width={100} />
          </div>
        )}
      </div>
    </>
  );
};

export default JobFairTemplateDetailContainer;
