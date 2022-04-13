import './ChooseTemplateJobFairSideBar.style.scss';

import { Divider, Tabs, Typography } from 'antd';
import React from 'react';
import SelectCompanyTemplateJobFairContainer from '../SelectCompanyTemplateJobFair/SelectCompanyTemplateJobFair.container';
import SelectDefaultTemplateJobFairContainer from '../SelectDefaultTemplateJobFair/SelectDefaultTemplateJobFair.container';

const { TabPane } = Tabs;
const { Title } = Typography;
const ChooseTemplateJobFairSideBarContainer = (props) => {
  const { onHandleNext, handleLoad3DMap, templateId, setVisible, visible } = props;
  return (
    <>
      <Divider size='small' plain>
        <Title>Choose job fair template</Title>
      </Divider>
      <div className={'chooseTemplateJobFairSideBar'}>
        <Tabs defaultActiveKey='1' centered destroyInactiveTabPane>
          <TabPane tab={'Use default template'} key={1}>
            <div className={'infinity-container'}>
              <SelectDefaultTemplateJobFairContainer
                handleLoad3DMap={handleLoad3DMap}
                onHandleNext={onHandleNext}
                templateId={templateId}
              />
            </div>
          </TabPane>
          <TabPane tab={'Use your own template'} key={2}>
            <div className={'infinity-container'}>
              <SelectCompanyTemplateJobFairContainer
                handleLoad3DMap={handleLoad3DMap}
                onHandleNext={onHandleNext}
                templateId={templateId}
                setVisible={setVisible}
                visible={visible}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default ChooseTemplateJobFairSideBarContainer;
