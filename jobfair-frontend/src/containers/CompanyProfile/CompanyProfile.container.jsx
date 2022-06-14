import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Typography, message, notification } from 'antd';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { getBase64 } from '../../utils/common';
import {
  getCompanyProfileAPI,
  updateCompanyProfileAPI,
  uploadCompanyLogo
} from '../../services/jobhub-api/CompanyControllerService';
import { useSelector } from 'react-redux';
import CompanyProfileForm from '../../components/forms/CompanyProfileForm/CompanyProfileForm.component';
import React, { useEffect, useRef, useState } from 'react';

const mapperCompanyInfoToUpdate = (values) => ({
  address: values.address,
  benefits: values.benefits,
  companyDescription: values.companyDescription,
  email: values.email,
  mediaUrls: values.mediaUrls,
  name: values.name,
  phone: values.phone,
  sizeId: values.sizeId,
  subCategoriesIds: values.subCategoriesIds,
  taxId: values.taxId,
  url: values.websiteUrl
});

const mapperCompanyInfoToDisplay = (values) => ({
  ...values,
  benefits: values.companyBenefitDTOS.map((item) => ({
    ...item,
    id: item.benefitDTO.id,
    description: item.description
  })),
  mediaUrls: values.mediaDTOS,
  subCategoriesIds: values.subCategoryDTOs.map((item) => item.id)
});

export const CompanyProfileContainer = () => {
  const companyId = useSelector((state) => state.authentication.user.companyId);
  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const logoFormData = useRef(new FormData());

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let { data } = await getCompanyProfileAPI(companyId);
      data = mapperCompanyInfoToDisplay(data);
      form.setFieldsValue({ ...data });
      setData(data);
      setMediaUrl(data.companyLogoURL);
    } catch (e) {
      notification['error']({
        message: `Fetch company profile failed`
      });
    }
  };

  const mediaUpload = {
    name: 'file',
    beforeUpload: () => false,
    onChange: async (info) => {
      try {
        const fileExtension = info.file.name.split('.').pop();
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
          notification['error']({
            message: `${info.file.name} is not image file`
          });
          return;
        }
        const url = await getBase64(info.file);
        setMediaUrl(url);
        logoFormData.current.append('file', info.file);
        message.success('Upload company logo to review successfully');
      } catch (err) {
        message.error('Upload company logo failed.');
      }
    },
    onRemove: async () => {
      setMediaUrl(undefined);
    },
    showUploadList: false,
    maxCount: 1
  };

  const onFinish = async (values) => {
    const body = mapperCompanyInfoToUpdate(values);
    try {
      if (logoFormData.current.has('file')) await uploadCompanyLogo(logoFormData.current);
      await updateCompanyProfileAPI(body, companyId);
      notification['success']({
        message: `Update company profile successfully`,
        description: `For company with name: ${values.name}`
      });
    } catch (err) {
      notification['error']({
        message: `Update company profile failed`,
        description: `There is problem while updating, try again later`
      });
    }
  };

  const onCancel = () => {
    setIsEdit(false);
  };

  return (
    <div className={'company-profile-container'}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography.Title level={2} style={{ marginBottom: '0rem' }}>
          Company profile
        </Typography.Title>
        <a
          style={{ display: isEdit ? 'none' : 'block', marginLeft: 'auto' }}
          href={'#'}
          onClick={() => {
            setIsEdit(true);
          }}>
          <FontAwesomeIcon icon={faPen} size={'2x'} color={'black'} />
        </a>
      </div>

      {data ? (
        <CompanyProfileForm
          form={form}
          mediaUrl={mediaUrl}
          onFinish={onFinish}
          editable={isEdit}
          onCancel={onCancel}
          {...mediaUpload}
        />
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};
