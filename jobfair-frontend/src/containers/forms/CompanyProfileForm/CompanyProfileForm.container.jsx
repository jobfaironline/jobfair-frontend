import { Affix, Button, Card, Form, Spin, message, notification } from 'antd';
import { getBase64 } from '../../../utils/common';
import {
  getCompanyProfileAPI,
  updateCompanyProfileAPI,
  uploadCompanyLogo
} from '../../../services/jobhub-api/CompanyControllerService';
import { useSelector } from 'react-redux';
import CompanyProfileForm from '../../../components/forms/CompanyProfileForm/CompanyProfileForm.component';
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
  url: values.url
});

const mapperCompanyInfoToDisplay = (values) => ({
  ...values,
  benefits: values.companyBenefitDTOS.map((item) => ({
    ...item,
    id: item.benefitDTO.id,
    description: item.benefitDTO.description
  })),
  mediaUrls: values.mediaDTOS,
  subCategoriesIds: values.subCategoryDTOs.map((item) => item.id),
  url: values.websiteUrl
});
const CompanyProfileFormContainer = () => {
  const [form] = Form.useForm();
  const companyId = useSelector((state) => state.authentication.user.companyId);
  const [data, setData] = useState({});
  const fromData = useRef(new FormData());
  const [mediaUrl, setMediaUrl] = useState('');
  const [isEditable, setIsEditable] = useState(false);

  const mediaUpload = {
    name: 'file',
    beforeUpload: () => false,
    onChange: async (info) => {
      try {
        setIsEditable(true);
        const url = await getBase64(info.file);
        setMediaUrl(url);
        fromData.current.append('file', info.file);
        message.success('Upload company logo to review successfully');
      } catch (err) {
        message.error('Upload company logo failed.');
      }
    },
    onRemove: async () => {
      setMediaUrl(undefined);
    },
    showUploadList: true,
    maxCount: 1
  };

  const onFinish = async (values) => {
    const body = mapperCompanyInfoToUpdate(values);
    try {
      await uploadCompanyLogo(fromData.current);
      await updateCompanyProfileAPI(body, companyId);
      notification['success']({
        message: `Update company profile successfully`,
        description: `For company with ${values.companyName}`
      });
      setIsEditable(false);
    } catch (err) {
      notification['error']({
        message: `Update company profile failed`,
        description: `There is problem while updating, try again later`
      });
    }
    fetchData();
  };

  const fetchData = async () => {
    try {
      const res = await getCompanyProfileAPI(companyId);
      // fromData.current.append('file', )
      setData(mapperCompanyInfoToDisplay(res.data));
    } catch (err) {
      notification['error']({
        message: `Fetch company profile failed`,
        description: `Failed for company with ${companyId}`
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  form.setFieldsValue({ ...data });

  return (
    <>
      {data === undefined || data === null || Object.keys(data).length === 0 ? (
        <Spin size='large' />
      ) : (
        <Card
          title=''
          style={{
            boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
            marginBottom: '2rem'
          }}
          headStyle={{ backgroundColor: 'white', border: 0 }}
          bodyStyle={{ backgroundColor: 'white', border: 0 }}>
          <Form form={form} onFinish={onFinish} requiredMark='required' autoComplete='off' scrollToFirstError={true}>
            <CompanyProfileForm form={form} urlValue={data.url} mediaUrl={mediaUrl} {...mediaUpload} />
            <Form.Item>
              <Affix offsetBottom={10}>
                <Button type='primary' htmlType='submit' disabled={!isEditable}>
                  Submit
                </Button>
              </Affix>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
};

export default CompanyProfileFormContainer;
