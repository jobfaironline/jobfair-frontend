import './JobFairLandingPageForm.styles.scss';
import { EyeOutlined } from '@ant-design/icons';
import { Form, Input, Typography } from 'antd';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';
import React from 'react';
import UploadComponent from '../../commons/UploadComponent/Upload.component';

const { Title } = Typography;
const { TextArea } = Input;
const JobFairLandingPageFormComponent = ({
  form,
  onFinish,
  uploadProps,
  thumbnailUrl,
  companyInformation,
  jobFairData,
  handleReviewLandingPage
}) => (
  <div className={'job-fair-landing-page'}>
    <div style={{ textAlign: 'center' }}>
      <Title level={4}>Schedule job fair event</Title>
      <EyeOutlined className={'icon'} onClick={handleReviewLandingPage} />
    </div>
    <Form
      initialValues={{
        hostName: jobFairData.hostName === null ? companyInformation.name : jobFairData.hostName,
        targetAttendant: jobFairData.targetAttendant,
        description: jobFairData.description
      }}
      form={form}
      requiredMark='required'
      autoComplete='off'
      onFinish={onFinish}
      scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
      <Form.Item label='Thumbnail' name={'thumbnail'} rules={[]} className={'form-item'}>
        <UploadComponent uploadProps={uploadProps}>
          {thumbnailUrl ? <img src={thumbnailUrl} alt='avatar' style={{ width: '100%' }} /> : undefined}
        </UploadComponent>
      </Form.Item>
      <Form.Item label='Host name' name={'hostName'} rules={OrganizeJobFairValidation.hostname} className={'form-item'}>
        <Input placeholder='Host name' />
      </Form.Item>
      <Form.Item
        label='Target attendant'
        name={'targetAttendant'}
        rules={OrganizeJobFairValidation.targetAttendant}
        className={'form-item'}>
        <Input placeholder='Target attendant' />
      </Form.Item>
      <Form.Item
        label='Description'
        name={'description'}
        rules={OrganizeJobFairValidation.description}
        className={'form-item'}>
        <TextArea showCount maxLength={1000} autoSize={{ minRows: 6 }} placeholder='Description' />
      </Form.Item>
    </Form>
  </div>
);

export default JobFairLandingPageFormComponent;
