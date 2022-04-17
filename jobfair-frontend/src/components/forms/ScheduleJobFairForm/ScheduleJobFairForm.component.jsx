import { DatePicker, Divider, Form, Input, Typography } from 'antd';
import { HourMinuteDateFormat } from '../../../constants/ApplicationConst';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';
import React from 'react';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const ScheduleJobFairFormComponent = ({ form, onFinish, onValueChange }) => (
  <>
    <Divider size='small' plain>
      <Title>Schedule job fair event</Title>
    </Divider>
    <div className={'form-container'}>
      <Form
        form={form}
        requiredMark='required'
        autoComplete='off'
        onFinish={onFinish}
        onValuesChange={onValueChange}
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
      </Form>
    </div>
  </>
);

export default ScheduleJobFairFormComponent;
