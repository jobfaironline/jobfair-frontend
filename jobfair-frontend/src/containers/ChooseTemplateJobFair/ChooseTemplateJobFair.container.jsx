import { getTemplateLayoutAPI } from '../../services/jobhub-api/TemplateControllerService';
import { notification } from 'antd';
import ChooseTemplateJobFairSideBarComponent from '../../components/customized-components/ChooseTemplateJobFairSideBar/ChooseTemplateJobFairSideBar.component';
import React, { useEffect, useState } from 'react';
import SideBarComponent from '../../components/commons/SideBar/SideBar.component';
import UploadModalContainer from '../UploadModal/UploadModal.container';

const ChooseTemplateJobFairContainer = ({ handleLoad3DMap, onHandleNext, onHandlePrev, templateId }) => {
  const [data, setData] = useState([]);
  const [forceRerenderState, setForceRerenderState] = useState(false);
  const [visible, setVisible] = useState(false);

  const fetchData = async () => {
    const res = await getTemplateLayoutAPI();
    setData(res.data);
  };

  // eslint-disable-next-line no-unused-vars
  const fetchOwnTemplate = async () => {
    //TODO: call API later setData(res.data)
  };

  useEffect(() => {
    fetchData();
  }, [forceRerenderState]);

  const uploadProps = {
    name: 'file',
    multiple: true,
    beforeUpload: () => false,
    accept: '.glb',
    onChange: async (info) => {
      if (info.file.type !== 'model/gltf-binary') {
        notification['error']({
          message: `${info.file.name} is not glb file`
        });
        return;
      }
      const formData = new FormData();
      formData.append('file', info.file);
      //TODO: adding upload GLB API later
      // await uploadCSVFile(formData);
      notification['success']({
        message: `${info.file.name} upload successfully`
      });
      //force render to fetch data after upload
      setForceRerenderState((prevState) => !prevState);
    },
    showUploadList: false
  };
  const componentProps = {
    data: data,
    handleLoad3DMap: handleLoad3DMap,
    onHandleNext: onHandleNext,
    onHandlePrev: onHandlePrev,
    templateId: templateId
  };
  return (
    <>
      <SideBarComponent>
        <ChooseTemplateJobFairSideBarComponent {...componentProps} setVisible={setVisible} />
        <UploadModalContainer {...uploadProps} visible={visible} setVisible={setVisible} />
      </SideBarComponent>
    </>
  );
};

export default ChooseTemplateJobFairContainer;
