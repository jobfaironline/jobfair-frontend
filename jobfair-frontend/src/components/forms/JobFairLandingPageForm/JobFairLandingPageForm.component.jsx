import { Button, Card, Form, Input, Space } from 'antd';
import React from 'react';
import UploadComponent from '../../commons/UploadComponent/Upload.component';

const JobFairLandingPageFormComponent = ({ form, onFinish, onHandleNext, onHandlePrev, uploadProps }) => (
  <div>
    <Card
      title='Create job fair landing page'
      style={{ width: '35rem', height: '35rem', marginTop: '10rem', marginLeft: '43rem' }}>
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
          <UploadComponent {...uploadProps} />
        </Form.Item>
        <Form.Item
          label='Host name'
          name={'hostname'}
          rules={[]}
          style={{
            display: 'inline-block',
            width: '100%',
            marginRight: '1rem',
            marginLeft: '1rem'
          }}>
          <Input placeholder='Host name' />
        </Form.Item>
        <Form.Item
          label='Description'
          name={'description'}
          rules={[]}
          style={{
            display: 'inline-block',
            width: '25rem',
            marginRight: '1rem',
            marginLeft: '1rem'
          }}>
          <Input placeholder='Description' />
        </Form.Item>
        <Space style={{ marginLeft: '1rem' }}>
          <Button type='primary' onClick={onHandleNext}>
            Next
          </Button>
          <Button type='primary' onClick={onHandlePrev}>
            Previous
          </Button>
        </Space>
      </Form>
    </Card>
  </div>
);

export default JobFairLandingPageFormComponent;
