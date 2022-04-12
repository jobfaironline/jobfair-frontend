import './ChooseTemplateJobFairSideBar.style.scss';

import { Divider, Tabs, Typography } from 'antd';
import React from 'react';
import SelectCompanyTemplateJobFairContainer from '../../../containers/SelectCompanyTemplateJobFair/SelectCompanyTemplateJobFair.container';
import SelectDefaultTemplateJobFairContainer from '../../../containers/SelectDefaultTemplateJobFair/SelectDefaultTemplateJobFair.container';

const { TabPane } = Tabs;
const { Title } = Typography;
const ChooseTemplateJobFairSideBarComponent = (props) => {
  const { onHandleNext, handleLoad3DMap, templateId, setVisible } = props;
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
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default ChooseTemplateJobFairSideBarComponent;
