import { Button, Divider, Modal, Space, Tabs, Typography } from 'antd';
import React, { useState } from 'react';
import SelectJobFairTemplateComponent from '../SelectJobFairTemplate/SelectJobFairTemplate.component';
import UploadComponent from '../../commons/UploadComponent/Upload.component';

const { TabPane } = Tabs;
const { Title } = Typography;
const ChooseTemplateJobFairSideBarComponent = (props) => {
  const { data, onHandleNext, handleLoad3DMap, templateId, uploadProps } = props;
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Divider size='small' plain>
        <Title>Choose job fair template</Title>
      </Divider>
      <Tabs defaultActiveKey='1' centered destroyInactiveTabPane>
        <TabPane tab={'Use default template'} key={1}>
          <SelectJobFairTemplateComponent listData={data} handleLoad3DMap={handleLoad3DMap}>
            <Button type='primary' onClick={onHandleNext} disabled={templateId === ''}>
              Choose
            </Button>
          </SelectJobFairTemplateComponent>
        </TabPane>
        <TabPane tab={'Use your own template'} key={2}>
          <SelectJobFairTemplateComponent listData={data} handleLoad3DMap={handleLoad3DMap}>
            <Space>
              <Button type='primary' onClick={onHandleNext} disabled={templateId === ''}>
                Choose
              </Button>
              <div style={{ width: '100%', height: '20%' }}>
                <Button type='primary' onClick={() => setVisible(true)}>
                  Upload template
                </Button>
                <UploadModal {...uploadProps} visible={visible} setVisible={setVisible} />
              </div>
            </Space>
          </SelectJobFairTemplateComponent>
        </TabPane>
      </Tabs>
    </>
  );
};

export const UploadModal = ({ uploadProps, visible, setVisible }) => {
  const onCancel = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} title={'Upload your template as .glb file'} footer={null} onCancel={onCancel}>
      <UploadComponent {...uploadProps} />
    </Modal>
  );
};

export default ChooseTemplateJobFairSideBarComponent;
