import React from 'react';
import { Button, DatePicker, Divider, Form, Input, Space, Typography } from 'antd';
import SideBarComponent from '../../commons/SideBar/SideBar.component';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const JobFairLandingPageFormComponent = ({ form, onFinish, onHandleNext, onHandlePrev }) => {
  return (
    <div>
      <SideBarComponent>
        <Divider size='small' plain>
          <Title>Job fair landing page</Title>
        </Divider>
        <Form
          form={form}
          requiredMark='required'
          autoComplete='off'
          onFinish={onFinish}
          scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
          style={{ height: '20rem', width: '25rem' }}>
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
            <Input placeholder='Job fair thumbnail' />
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
      </SideBarComponent>
    </div>
  );
};

export default JobFairLandingPageFormComponent;