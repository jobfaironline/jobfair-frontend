import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getLayoutDetail } from '../../services/jobhub-api/LayoutControllerService';
import { loadGLBModel } from '../../utils/ThreeJS/threeJSUtil';
import { useHistory, useParams } from 'react-router-dom';
import JobFairParkMapComponent from '../../components/3D/JobFairParkMap/JobFairParkMap.component';
import React, { useEffect, useState } from 'react';

const JobFairTemplateDetailContainer = () => {
  const template = useParams();
  const [glb, setGlb] = useState(undefined);
  const history = useHistory();

  useEffect(async () => {
    const res = await getLayoutDetail(template.templateId);
    const glb = await loadGLBModel(res.data.url);
    setGlb(glb.scene);
  }, []);
  return (
    <>
      <a className={'prev-button'} type='primary' onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
        <span>Back to template page</span>
      </a>
      <div>{glb ? <JobFairParkMapComponent mapMesh={glb} /> : null}</div>
    </>
  );
};

export default JobFairTemplateDetailContainer;
