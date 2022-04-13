import './JobFairLandingPageForm.styles.scss';
import { Button, Card, Form, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import UploadComponent from '../../commons/UploadComponent/Upload.component';

const { TextArea } = Input;
const JobFairLandingPageFormComponent = ({ form, onFinish, onHandleNext, onHandlePrev, uploadProps }) => (
  <Card
    title='Create job fair landing page'
    style={{ width: '35rem', height: '45rem', marginTop: '5rem', marginLeft: '43rem' }}>
    <div className='landing-page-form'>
      <a className={'prev-button'} type='primary' onClick={onHandlePrev}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '10px' }} />
        <span>Back to assign employee</span>
      </a>
      <Form
        form={form}
        requiredMark='required'
        autoComplete='off'
        onFinish={onFinish}
        scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
        style={{ height: '20rem', width: '25rem', marginLeft: '2rem' }}>
        <Form.Item
          label='Thumbnail'
          name={'thumbnail'}
          rules={[]}
          style={{
            display: 'inline-block',
            width: '100%',
            marginRight: '1rem',
            marginLeft: '1rem'
          }}>
          <UploadComponent uploadProps={uploadProps} />
        </Form.Item>
        <Form.Item
          label='Host name'
          name={'hostName'}
          rules={OrganizeJobFairValidation.hostname}
          style={{
            display: 'inline-block',
            width: '100%',
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
            width: '100%',
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
            width: '25rem',
            marginRight: '1rem',
            marginLeft: '1rem'
          }}>
          <TextArea showCount maxLength={3000} placeholder='Description' />
        </Form.Item>
        <div className={'button-container'}>
          <Button type='primary' onClick={onHandleNext} className={'confirm-button'}>
            Next
          </Button>
        </div>
      </Form>
    </div>
  </Card>
);

export default JobFairLandingPageFormComponent;
