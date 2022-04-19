import './ScheduleJobFairFormComponent.styles.scss';
import { DatePicker, Form, Input, Typography } from 'antd';
import { HourMinuteDateFormat } from '../../../constants/ApplicationConst';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';
import React from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Title } = Typography;
const ScheduleJobFairFormComponent = ({ jobFairData, form, onFinish, onValueChange }) => (
  <div className={'schedule-job-fair-form'}>
    <div style={{ textAlign: 'center' }}>
      <Title level={5}>Schedule job fair event</Title>
    </div>
    <div className={'form-container'}>
      <Form
        initialValues={{
          name: jobFairData.name,
          decorateRange: [
            jobFairData.decorateStartTime ? moment.unix(jobFairData.decorateStartTime / 1000) : undefined,
            jobFairData.decorateEndTime ? moment.unix(jobFairData.decorateEndTime / 1000) : undefined
          ],
          publicRange: [
            jobFairData.publicStartTime ? moment.unix(jobFairData.publicStartTime / 1000) : undefined,
            jobFairData.publicEndTime ? moment.unix(jobFairData.publicEndTime / 1000) : undefined
          ]
        }}
        form={form}
        requiredMark='required'
        autoComplete='off'
        onFinish={onFinish}
        onValuesChange={onValueChange}
        scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
        <Form.Item label='Name' name={'name'} rules={OrganizeJobFairValidation.name} className={'form-item'}>
          <Input placeholder='Job fair name' />
        </Form.Item>
        <Form.Item
          label='Decoration booth time range'
          name={'decorateRange'}
          rules={OrganizeJobFairValidation.decorateRange}
          className={'form-item'}>
          <RangePicker format={HourMinuteDateFormat} showTime />
        </Form.Item>
        <Form.Item
          className={'form-item'}
          label='Public time range'
          name={'publicRange'}
          rules={OrganizeJobFairValidation.publicRange}>
          <RangePicker format={HourMinuteDateFormat} showTime />
        </Form.Item>
      </Form>
    </div>
  </div>
);

export default ScheduleJobFairFormComponent;
