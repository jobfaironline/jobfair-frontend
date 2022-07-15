import './JobFairLandingPageForm.styles.scss';
import { EyeOutlined } from '@ant-design/icons';
import { Form, Input, Tooltip, Typography } from 'antd';
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
  handleReviewLandingPage,
  onValueChange
}) => (
  <div className={'job-fair-landing-page'}>
    <div style={{ textAlign: 'center' }}>
      <Title level={4}>Design landing page</Title>
      <Tooltip title='Review landing page'>
        <EyeOutlined className={'icon'} onClick={handleReviewLandingPage} />
      </Tooltip>
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
      onValuesChange={onValueChange}
      scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
      <Form.Item
        label='Thumbnail'
        name={'thumbnail'}
        className={'form-item'}
        tooltip={'Thumbnail for your landing page'}
        required>
        <UploadComponent uploadProps={uploadProps} aspect={2 / 1} isImageCrop={true}>
          {thumbnailUrl ? <img src={thumbnailUrl} alt='avatar' style={{ width: '100%' }} /> : undefined}
        </UploadComponent>
      </Form.Item>
      <Form.Item
        tooltip={'Name of your job fair host. Default is your company name.'}
        label='Host name'
        name={'hostName'}
        rules={OrganizeJobFairValidation.hostname}
        className={'form-item'}>
        <Input placeholder='Host name' />
      </Form.Item>
      <Form.Item
        tooltip={'The target attendant of your job fair.'}
        label='Target attendant'
        name={'targetAttendant'}
        rules={OrganizeJobFairValidation.targetAttendant}
        className={'form-item'}>
        <Input placeholder='Target attendant' />
      </Form.Item>
      <Form.Item
        tooltip={'Tell briefly your attendant what this job fair is about.'}
        label='Description'
        name={'description'}
        rules={OrganizeJobFairValidation.description}
        className={'form-item'}>
        <TextArea showCount maxLength={500} autoSize={{ minRows: 6 }} placeholder='Description' />
      </Form.Item>
    </Form>
  </div>
);

export default JobFairLandingPageFormComponent;
