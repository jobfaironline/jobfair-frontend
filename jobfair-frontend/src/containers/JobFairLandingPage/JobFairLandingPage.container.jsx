import { notification } from 'antd';
import { uploadThumbnailAPI } from '../../services/jobhub-api/LayoutControllerService';
import JobFairLandingPageFormComponent from '../../components/forms/JobFairLandingPageForm/JobFairLandingPageForm.component';
import React, { useState } from 'react';

const JobFairLandingPageContainer = ({ onFinish, form, onHandleNext, onHandlePrev, templateId }) => {
  // const [forceRerenderState, setForceRerenderState] = useState(false);
  const [isError, setIsError] = useState(false);

  const uploadProps = {
    name: 'file',
    beforeUpload: () => false,
    listType: 'picture',
    maxCount: 1,
    onChange: async (info) => {
      const fileExtension = info.file.name.split('.').pop();
      if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
        notification['error']({
          message: `${info.file.name} is not image file`
        });
        setIsError(true);
        return;
      }
      const formData = new FormData();
      formData.append('file', info.file);
      await uploadThumbnailAPI(formData, templateId);
      setIsError(false);
      notification['success']({
        message: `${info.file.name} upload successfully`
      });
      //force render to fetch data after upload
      // setForceRerenderState((prevState) => !prevState);
    },
    showUploadList: !isError
  };
  // eslint-disable-next-line no-empty-function
  // useEffect(() => {}, [forceRerenderState]);
  return (
    <JobFairLandingPageFormComponent
      form={form}
      onFinish={onFinish}
      onHandleNext={onHandleNext}
      onHandlePrev={onHandlePrev}
      uploadProps={uploadProps}
    />
  );
};

export default JobFairLandingPageContainer;
