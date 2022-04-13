import './JobFairLandingPageForm.styles.scss';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import SideBarComponent from '../../commons/SideBar/SideBar.component';
import UploadComponent from '../../commons/UploadComponent/Upload.component';

const { Title } = Typography;
const { TextArea } = Input;
const JobFairLandingPageFormComponent = ({
  form,
  onFinish,
  onHandleNext,
  onHandlePrev,
  uploadProps,
  thumbnailUrl,
  companyInformation
}) => (
  <div className='landing-page-form'>
    <SideBarComponent>
      <a className={'prev-button'} type='primary' onClick={onHandlePrev}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
        <span>Back to assign employee</span>
      </a>
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
          <Input placeholder='Host name' defaultValue={companyInformation.name} />
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
      <div className={'button-container'}>
        <Button type='primary' onClick={onHandleNext} className={'confirm-button'}>
          Next
        </Button>
      </div>
    </SideBarComponent>
  </div>
);

export default JobFairLandingPageFormComponent;
