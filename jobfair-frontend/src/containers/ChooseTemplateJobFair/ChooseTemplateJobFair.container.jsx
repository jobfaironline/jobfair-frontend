import ChooseTemplateJobFairSideBarContainer from '../ChooseTemplateJobFairSideBar/ChooseTemplateJobFairSideBar.container';
import React from 'react';
import SideBarComponent from '../../components/commons/SideBar/SideBar.component';

const ChooseTemplateJobFairContainer = ({ handleLoad3DMap, onHandleNext, onHandlePrev, templateId }) => (
  <>
    <SideBarComponent>
      <ChooseTemplateJobFairSideBarContainer
        handleLoad3DMap={handleLoad3DMap}
        onHandleNext={onHandleNext}
        onHandlePrev={onHandlePrev}
        templateId={templateId}
      />
    </SideBarComponent>
  </>
);

export default ChooseTemplateJobFairContainer;
