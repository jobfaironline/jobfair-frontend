import React from 'react';
import { Button, DatePicker, Divider, Form, Input, Space, Typography } from 'antd';
import { HourMinuteDateFormat } from '../../../constants/ApplicationConst';
import SideBarComponent from '../../commons/SideBar/SideBar.component';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const OrganizeJobFairFormComponent = ({ form, onHandleNext, onHandlePrev, onFinish }) => {
  return (
    <div>
      <SideBarComponent>
        <Divider size='small' plain>
          <Title>Schedule job fair event</Title>
        </Divider>
        <Form
          form={form}
          requiredMark='required'
          autoComplete='off'
          onFinish={onFinish}
          scrollToFirstError={{ block: 'center', behavior: 'smooth' }}
          style={{ height: '20rem', width: '25rem' }}>
          <Form.Item
            label='Name'
            name={'name'}
            rules={OrganizeJobFairValidation.name}
            style={{
              display: 'inline-block',
              width: '100%',
              marginRight: '1rem',
              marginLeft: '1rem'
            }}>
            <Input placeholder='Job fair name' />
          </Form.Item>
          <Form.Item
            label='Decoration booth time range'
            name={'decorateRange'}
            rules={OrganizeJobFairValidation.decorateRange}
            style={{
              display: 'inline-block',
              width: '100%',
              marginRight: '1rem',
              marginLeft: '1rem'
            }}>
            <RangePicker format={HourMinuteDateFormat} showTime />
          </Form.Item>
          <Form.Item
            label='Public time range'
            name={'publicRange'}
            rules={OrganizeJobFairValidation.publicRange}
            style={{
              display: 'inline-block',
              width: '25rem',
              marginRight: '1rem',
              marginLeft: '1rem'
            }}>
            <RangePicker format={HourMinuteDateFormat} showTime />
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

export default OrganizeJobFairFormComponent;