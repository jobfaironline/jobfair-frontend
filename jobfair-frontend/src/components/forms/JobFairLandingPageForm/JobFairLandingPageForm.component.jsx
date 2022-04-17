import { Divider, Form, Input, Typography } from 'antd';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';
import React from 'react';
import UploadComponent from '../../commons/UploadComponent/Upload.component';

const { Title } = Typography;
const { TextArea } = Input;
const JobFairLandingPageFormComponent = ({ form, onFinish, uploadProps, thumbnailUrl, companyInformation }) => (
  <>
    <Divider size='small' plain>
      <Title>Schedule job fair event</Title>
    </Divider>
    <Form
      initialValues={{ hostName: companyInformation.name }}
      form={form}
      requiredMark='required'
      autoComplete='off'
      onFinish={onFinish}
      scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
      <Form.Item
        label='Thumbnail'
        name={'thumbnail'}
        rules={[]}
        style={{
          display: 'inline-block',
          marginRight: '1rem',
          marginLeft: '1rem'
        }}>
        <UploadComponent uploadProps={uploadProps}>
          {thumbnailUrl ? <img src={thumbnailUrl} alt='avatar' style={{ width: '100%' }} /> : undefined}
        </UploadComponent>
      </Form.Item>
      <Form.Item
        label='Host name'
        name={'hostName'}
        rules={OrganizeJobFairValidation.hostname}
        style={{
          display: 'inline-block',
          width: '70%',
          marginRight: '1rem',
          marginLeft: '1rem'
        }}>
        <Input placeholder='Host name' />
      </Form.Item>
      <Form.Item
        label='Target attendant'
        name={'targetAttendant'}
        rules={OrganizeJobFairValidation.targetAttendant}
        style={{
          display: 'inline-block',
          width: '90%',
          marginRight: '1rem',
          marginLeft: '1rem'
        }}>
        <Input placeholder='Target attendant' />
      </Form.Item>
      <Form.Item
        label='Description'
        name={'description'}
        rules={OrganizeJobFairValidation.description}
        style={{
          display: 'inline-block',
          width: '90%',
          marginRight: '1rem',
          marginLeft: '1rem'
        }}>
        <TextArea showCount maxLength={3000} placeholder='Description' />
      </Form.Item>
    </Form>
  </>
);

export default JobFairLandingPageFormComponent;
