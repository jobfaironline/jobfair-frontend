import { uploadProps } from '../../constants/JobFairConst';
import ChooseTemplateJobFairSideBarComponent from '../../components/customized-components/ChooseTemplateJobFairSideBar/ChooseTemplateJobFairSideBar.component';
import React, { useState } from 'react';
import SideBarComponent from '../../components/commons/SideBar/SideBar.component';
import UploadModalContainer from '../UploadModal/UploadModal.container';

const ChooseTemplateJobFairContainer = ({ handleLoad3DMap, onHandleNext, onHandlePrev, templateId }) => {
  // eslint-disable-next-line no-unused-vars
  const [forceRerenderState, setForceRerenderState] = useState(false);
  const [visible, setVisible] = useState(false);

  return (
    <>
      <SideBarComponent>
        <ChooseTemplateJobFairSideBarComponent
          handleLoad3DMap={handleLoad3DMap}
          onHandleNext={onHandleNext}
          onHandlePrev={onHandlePrev}
          templateId={templateId}
          setVisible={setVisible}
        />
        <UploadModalContainer {...uploadProps} visible={visible} setVisible={setVisible} />
      </SideBarComponent>
    </>
  );
};

export default ChooseTemplateJobFairContainer;
