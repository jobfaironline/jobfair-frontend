import '../ChooseTemplateJobFairSideBar/ChooseTemplateJobFairSideBar.style.scss';
import { Button, notification } from 'antd';
import {
  getCompanyLayoutAPI,
  uploadTemplateAPI,
  uploadTemplateMetaDataAPI
} from '../../services/jobhub-api/LayoutControllerService';
import React, { useEffect, useState } from 'react';
import SelectJobFairTemplateComponent from '../../components/customized-components/SelectJobFairTemplate/SelectJobFairTemplate.component';
import UploadModalContainer from '../UploadModal/UploadModal.container';

const SelectCompanyTemplateJobFairContainer = ({ handleLoad3DMap, onHandleNext, setVisible, visible, templateId }) => {
  const [data, setData] = useState([]);
  const [forceRerenderState, setForceRerenderState] = useState(false);

  const formData = new FormData();
  const fetchData = async () => {
    const res = await getCompanyLayoutAPI();
    setData(res.data);
  };

  const uploadProps = {
    name: 'file',
    beforeUpload: () => false,
    onChange: async (info) => {
      const fileExtension = info.file.name.split('.').pop();
      if (fileExtension !== 'glb') {
        notification['error']({
          message: `${info.file.name} is not glb file`
        });
        return;
      }
      formData.append('file', info.file);
    },
    showUploadList: true
  };

  const onFinish = async (values) => {
    const body = {
      name: values.name,
      description: values.description
    };
    const res = await uploadTemplateMetaDataAPI(body);
    await uploadTemplateAPI(res.data.id, formData);
    notification['success']({
      message: `upload successfully`
    });
    setVisible(false);
    //force render to fetch data after upload
    setForceRerenderState((prevState) => !prevState);
  };

  useEffect(() => {
    fetchData();
  }, [forceRerenderState]);
  return (
    <div>
      <UploadModalContainer uploadProps={uploadProps} visible={visible} setVisible={setVisible} onFinish={onFinish} />
      <SelectJobFairTemplateComponent listData={data} handleLoad3DMap={handleLoad3DMap}>
        <div className={'button-container'}>
          <Button className={'confirm-button'} type='primary' onClick={onHandleNext} disabled={templateId === ''}>
            Choose
          </Button>
          <Button className={'confirm-button'} type='primary' onClick={() => setVisible(true)}>
            Upload template
          </Button>
        </div>
      </SelectJobFairTemplateComponent>
    </div>
  );
};

export default SelectCompanyTemplateJobFairContainer;
