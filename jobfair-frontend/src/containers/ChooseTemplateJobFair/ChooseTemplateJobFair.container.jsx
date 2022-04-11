import { getTemplateLayoutAPI } from '../../services/jobhub-api/TemplateControllerService';
import ChooseTemplateJobFairSideBarComponent from '../../components/customized-components/ChooseTemplateJobFairSideBar/ChooseTemplateJobFairSideBar.component';
import React, { useEffect, useState } from 'react';
import SideBarComponent from '../../components/commons/SideBar/SideBar.component';
import JobFairParkMapComponent from '../../components/3D/JobFairParkMap/JobFairParkMap.component';
import { loadGLBModel } from '../../utils/ThreeJS/threeJSUtil';

const ChooseTemplateJobFairContainer = ({ onHandleNext }) => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState();

  const fetchData = async () => {
    const res = await getTemplateLayoutAPI();
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoad3DMap = async (url) => {
    const glb = await loadGLBModel(url);
    setLayout(glb.scene);
  };

  return (
    <>
      <div style={{ width: '75%' }}>{layout ? <JobFairParkMapComponent mapMesh={layout} /> : null}</div>
      <SideBarComponent>
        <ChooseTemplateJobFairSideBarComponent data={data} handleLoad3DMap={handleLoad3DMap} />
      </SideBarComponent>
    </>
  );
};

export default ChooseTemplateJobFairContainer;
