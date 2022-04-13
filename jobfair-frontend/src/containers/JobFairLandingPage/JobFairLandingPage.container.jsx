import { getBase64 } from '../../utils/common';
import { notification } from 'antd';
import { uploadJobFairThumbnailAPI } from '../../services/jobhub-api/JobFairControllerService';
import JobFairLandingPageFormComponent from '../../components/forms/JobFairLandingPageForm/JobFairLandingPageForm.component';
import React, { useState } from 'react';

const JobFairLandingPageContainer = ({ onFinish, form, onHandleNext, onHandlePrev, jobFairId }) => {
  const [isError, setIsError] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState();

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
      await uploadJobFairThumbnailAPI(jobFairId, formData);
      setIsError(false);
      const url = await getBase64(info.file);
      setThumbnailUrl(url);
    },
    showUploadList: !isError
  };
  return (
    <JobFairLandingPageFormComponent
      form={form}
      onFinish={onFinish}
      onHandleNext={onHandleNext}
      onHandlePrev={onHandlePrev}
      uploadProps={uploadProps}
      thumbnailUrl={thumbnailUrl}
    />
  );
};

export default JobFairLandingPageContainer;
