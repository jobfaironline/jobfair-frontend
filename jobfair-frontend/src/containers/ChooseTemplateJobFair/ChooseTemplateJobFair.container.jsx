import ChooseTemplateJobFairSideBarContainer from '../ChooseTemplateJobFairSideBar/ChooseTemplateJobFairSideBar.container';
import React, { useState } from 'react';
import SideBarComponent from '../../components/commons/SideBar/SideBar.component';

const ChooseTemplateJobFairContainer = ({ handleLoad3DMap, onHandleNext, onHandlePrev, templateId }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <SideBarComponent>
        <ChooseTemplateJobFairSideBarContainer
          handleLoad3DMap={handleLoad3DMap}
          onHandleNext={onHandleNext}
          onHandlePrev={onHandlePrev}
          templateId={templateId}
          setVisible={setVisible}
          visible={visible}
        />
      </SideBarComponent>
    </>
  );
};

export default ChooseTemplateJobFairContainer;
