import { getTemplateLayoutAPI } from '../../services/jobhub-api/TemplateControllerService';
import { uploadProps } from '../../constants/JobFairConst';
import ChooseTemplateJobFairSideBarComponent from '../../components/customized-components/ChooseTemplateJobFairSideBar/ChooseTemplateJobFairSideBar.component';
import React, { useEffect, useState } from 'react';
import SideBarComponent from '../../components/commons/SideBar/SideBar.component';
import UploadModalContainer from '../UploadModal/UploadModal.container';

const ChooseTemplateJobFairContainer = ({ handleLoad3DMap, onHandleNext, onHandlePrev, templateId }) => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [forceRerenderState, setForceRerenderState] = useState(false);
  const [visible, setVisible] = useState(false);

  const fetchData = async () => {
    const res = await getTemplateLayoutAPI();
    setData(res.data);
  };

  // eslint-disable-next-line no-unused-vars
  const fetchOwnTemplate = async () => {
    //TODO: call API later setData(res.data)
  };

  useEffect(() => {
    fetchData();
  }, [forceRerenderState]);

  return (
    <>
      <SideBarComponent>
        <ChooseTemplateJobFairSideBarComponent
          data={data}
          handleLoad3DMap={handleLoad3DMap}
          onHandleNext={onHandleNext}
          onHandlePrev={onHandlePrev}
          templateId={templateId}
        />
        <UploadModalContainer {...uploadProps} visible={visible} setVisible={setVisible} />
      </SideBarComponent>
    </>
  );
};

export default ChooseTemplateJobFairContainer;
