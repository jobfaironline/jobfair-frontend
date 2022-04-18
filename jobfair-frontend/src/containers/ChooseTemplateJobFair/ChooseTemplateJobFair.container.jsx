import { Button, Divider, Tabs, Typography } from 'antd';
import React, { useState } from 'react';
import SelectCompanyTemplateJobFairContainer from '../SelectCompanyTemplateJobFair/SelectCompanyTemplateJobFair.container';

const { TabPane } = Tabs;
const { Title } = Typography;

const ChooseTemplateJobFairContainer = ({ handleLoad3DMap }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Divider size='small' plain>
        <Title>Choose job fair template</Title>
      </Divider>
      <div>
        <Tabs defaultActiveKey='1' centered destroyInactiveTabPane>
          <TabPane tab={'Use default template'} key={1}>
            <SelectCompanyTemplateJobFairContainer
              handleLoad3DMap={handleLoad3DMap}
              visible={visible}
              setVisible={setVisible}
              isDefaultTemplate={true}
            />
          </TabPane>
          <TabPane tab={'Use your own template'} key={2}>
            <SelectCompanyTemplateJobFairContainer
              handleLoad3DMap={handleLoad3DMap}
              visible={visible}
              setVisible={setVisible}
              isDefaultTemplate={false}
            />
            <div className={'button-container'} style={{ marginBottom: 0 }}>
              <Button className={'confirm-button'} type='primary' onClick={() => setVisible(true)}>
                Upload template
              </Button>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default ChooseTemplateJobFairContainer;
