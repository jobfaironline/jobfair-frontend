import './ChooseTemplateJobFairSideBar.style.scss';

import { Button, Divider, Tabs, Typography } from 'antd';
import React from 'react';
import SelectJobFairTemplateComponent from '../SelectJobFairTemplate/SelectJobFairTemplate.component';

const { TabPane } = Tabs;
const { Title } = Typography;
const ChooseTemplateJobFairSideBarComponent = (props) => {
  const { data, onHandleNext, handleLoad3DMap, templateId, setVisible } = props;

  return (
    <>
      <Divider size='small' plain>
        <Title>Choose job fair template</Title>
      </Divider>
      <div className={'chooseTemplateJobFairSideBar'}>
        <Tabs defaultActiveKey='1' centered destroyInactiveTabPane>
          <TabPane tab={'Use default template'} key={1}>
            <div className={'infinity-container'}>
              <SelectJobFairTemplateComponent listData={data} handleLoad3DMap={handleLoad3DMap}>
                <div className={'button-container'}>
                  <Button
                    className={'confirm-button'}
                    type='primary'
                    onClick={onHandleNext}
                    disabled={templateId === ''}>
                    Choose
                  </Button>
                </div>
              </SelectJobFairTemplateComponent>
            </div>
          </TabPane>
          <TabPane tab={'Use your own template'} key={2}>
            <div className={'infinity-container'}>
              <SelectJobFairTemplateComponent listData={data} handleLoad3DMap={handleLoad3DMap}>
                <div className={'button-container'}>
                  <Button
                    className={'confirm-button'}
                    type='primary'
                    onClick={onHandleNext}
                    disabled={templateId === ''}>
                    Choose
                  </Button>
                  <Button className={'confirm-button'} type='primary' onClick={() => setVisible(true)}>
                    Upload template
                  </Button>
                </div>
              </SelectJobFairTemplateComponent>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default ChooseTemplateJobFairSideBarComponent;
