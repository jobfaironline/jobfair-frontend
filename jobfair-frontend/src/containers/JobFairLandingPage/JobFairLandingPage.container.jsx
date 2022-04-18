import { getBase64 } from '../../utils/common';
import { getCompanyProfileAPI } from '../../services/jobhub-api/CompanyControllerService';
import { notification } from 'antd';
import { uploadJobFairThumbnailAPI } from '../../services/jobhub-api/JobFairControllerService';
import { useSelector } from 'react-redux';
import JobFairLandingPageFormComponent from '../../components/forms/JobFairLandingPageForm/JobFairLandingPageForm.component';
import React, { useEffect, useState } from 'react';

const JobFairLandingPageContainer = ({ jobFairData, onFinish, form, jobFairId }) => {
  const [isError, setIsError] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState(jobFairData.thumbnailUrl);
  const [companyInformation, setCompanyInformation] = useState();

  const companyId = useSelector((state) => state.authentication.user.companyId);

  useEffect(async () => {
    const companyInformation = await getCompanyProfileAPI(companyId).then((response) => response.data);
    setCompanyInformation(companyInformation);
  }, []);

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
  return companyInformation ? (
    <JobFairLandingPageFormComponent
      jobFairData={jobFairData}
      form={form}
      onFinish={onFinish}
      uploadProps={uploadProps}
      thumbnailUrl={thumbnailUrl}
      companyInformation={companyInformation}
    />
  ) : null;
};

export default JobFairLandingPageContainer;
