import '../ChooseTemplateJobFairSideBar/ChooseTemplateJobFairSideBar.style.scss';
import { Button, notification } from 'antd';
import { getBase64 } from '../../utils/common';
import {
  getCompanyLayoutAPI,
  uploadTemplateAPI,
  uploadTemplateMetaDataAPI,
  uploadThumbnailAPI
} from '../../services/jobhub-api/LayoutControllerService';
import React, { useEffect, useRef, useState } from 'react';
import SelectJobFairTemplateComponent from '../../components/customized-components/SelectJobFairTemplate/SelectJobFairTemplate.component';
import UploadModalContainer from '../UploadModal/UploadModal.container';

const SelectCompanyTemplateJobFairContainer = ({ handleLoad3DMap, onHandleNext, templateId }) => {
  const [data, setData] = useState([]);
  const [forceRerenderState, setForceRerenderState] = useState(false);
  const [visible, setVisible] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [isUploadGlb, setIsUploadGlb] = useState(false);
  const glbFormData = useRef(new FormData());
  const thumbnailFormData = useRef(new FormData());

  const fetchData = async () => {
    const res = await getCompanyLayoutAPI();
    setData(res.data);
  };

  const glbUploadProps = {
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
      glbFormData.current.append('file', info.file);

      if (info.fileList.length > 0) setIsUploadGlb(true);
    },
    onRemove: async () => {
      setIsUploadGlb(false);
    },
    showUploadList: true,
    maxCount: 1
  };

  const thumbnailUploadProps = {
    name: 'file',
    beforeUpload: () => false,
    onChange: async (info) => {
      const url = await getBase64(info.file);
      setThumbnailUrl(url);
      thumbnailFormData.current.append('file', info.file);
    },
    onRemove: async () => {
      setThumbnailUrl(undefined);
    },
    showUploadList: true,
    maxCount: 1
  };

  const onFinish = async (values) => {
    const body = {
      name: values.name,
      description: values.description
    };
    const res = await uploadTemplateMetaDataAPI(body);
    await uploadTemplateAPI(res.data.id, glbFormData.current);
    await uploadThumbnailAPI(res.data.id, thumbnailFormData.current);
    notification['success']({
      message: `upload successfully`
    });
    setVisible(false);
    //force render to fetch data after upload
    setForceRerenderState((prevState) => !prevState);
  };

  const onCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchData();
  }, [forceRerenderState]);
  return (
    <div>
      <UploadModalContainer
        glbUploadProps={glbUploadProps}
        thumbnailUploadProps={thumbnailUploadProps}
        visible={visible}
        onFinish={onFinish}
        onCancel={onCancel}
        thumbnailUrl={thumbnailUrl}
        isUploadGlb={isUploadGlb}
      />
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
