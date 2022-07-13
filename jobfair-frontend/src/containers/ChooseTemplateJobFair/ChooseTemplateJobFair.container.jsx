import './ChooseTemplateJobFair.style.scss';
import { Button, Tabs, Tooltip, Typography } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import SelectCompanyTemplateJobFairContainer from '../SelectCompanyTemplateJobFair/SelectCompanyTemplateJobFair.container';

const { TabPane } = Tabs;
const { Title } = Typography;

const ChooseTemplateJobFairContainer = ({ handleLoad3DMap, onNext, layoutData }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={'choose-template-job-fair-container'}>
      <div style={{ textAlign: 'center' }}>
        <Title level={5}>
          Choose job fair layout
          <Tooltip
            title={
              "Job fair layout will be the 3D base of your job fair upon which you can decorate your company's booth"
            }>
            <QuestionCircleOutlined style={{ marginLeft: '5px' }} />
          </Tooltip>
        </Title>
      </div>
      <Tabs defaultActiveKey='1' centered destroyInactiveTabPane>
        <TabPane tab={'Use default template'} key={1}>
          <SelectCompanyTemplateJobFairContainer
            handleLoad3DMap={handleLoad3DMap}
            visible={visible}
            setVisible={setVisible}
            isDefaultTemplate={true}
          />
          <div className={'button-container'}>
            <Button
              className={'confirm-button'}
              type='primary'
              onClick={onNext}
              disabled={layoutData.glb === undefined}>
              Choose template
            </Button>
          </div>
        </TabPane>
        <TabPane tab={'Use your own template'} key={2}>
          <SelectCompanyTemplateJobFairContainer
            handleLoad3DMap={handleLoad3DMap}
            visible={visible}
            setVisible={setVisible}
            isDefaultTemplate={false}
          />
          <div className={'button-container'}>
            <Button className={'confirm-button'} type='primary' onClick={() => setVisible(true)}>
              Upload template
            </Button>
            <Button
              className={'confirm-button'}
              type='primary'
              onClick={onNext}
              disabled={layoutData.glb === undefined}>
              Choose template
            </Button>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ChooseTemplateJobFairContainer;
