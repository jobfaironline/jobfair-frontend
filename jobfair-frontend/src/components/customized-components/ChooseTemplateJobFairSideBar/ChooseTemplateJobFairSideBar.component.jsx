import { Button, Divider, Tabs, Typography } from 'antd';
import React from 'react';
import SelectJobFairTemplateComponent from '../SelectJobFairTemplate/SelectJobFairTemplate.component';

const { TabPane } = Tabs;
const { Title } = Typography;
const ChooseTemplateJobFairSideBarComponent = (props) => {
  const { data, onHandleNext, handleLoad3DMap } = props;
  return (
    <>
      <Divider size='small' plain>
        <Title>Choose job fair template</Title>
      </Divider>
      <Tabs defaultActiveKey='1' centered destroyInactiveTabPane>
        <TabPane tab={'Use default template'} key={1}>
          <SelectJobFairTemplateComponent listData={data} handleLoad3DMap={handleLoad3DMap}>
            <Button type='primary' onClick={onHandleNext}>
              Choose
            </Button>
          </SelectJobFairTemplateComponent>
        </TabPane>
        <TabPane tab={'Use your own template'} key={2}>
          <SelectJobFairTemplateComponent listData={data} handleLoad3DMap={handleLoad3DMap}>
            <Button type='primary' onClick={onHandleNext}>
              Choose
            </Button>
          </SelectJobFairTemplateComponent>
        </TabPane>
      </Tabs>
    </>
  );
};

export default ChooseTemplateJobFairSideBarComponent;
