import './ScheduleJobFairFormComponent.styles.scss';
import { DateFormat, MinuteFormat } from '../../../constants/ApplicationConst';
import { DatePicker, Form, Input, TimePicker, Typography } from 'antd';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';
import React from 'react';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const mapJobFairDataToFormInitialValues = (jobFairData) => {
  const shift = jobFairData.shifts?.sort((a, b) => a.beginTime - b.beginTime);
  const startOfDate = moment().startOf('day').valueOf();
  return {
    name: jobFairData.name,
    decorateRange: [
      jobFairData.decorateStartTime ? moment(jobFairData.decorateStartTime) : undefined,
      jobFairData.decorateEndTime ? moment(jobFairData.decorateEndTime) : undefined
    ],
    publicRange: [
      jobFairData.publicStartTime ? moment(jobFairData.publicStartTime) : undefined,
      jobFairData.publicEndTime ? moment(jobFairData.publicEndTime) : undefined
    ],
    morningShift: [
      shift?.[0]?.beginTime !== undefined ? moment(startOfDate + shift[0].beginTime) : undefined,
      shift?.[0]?.endTime !== undefined ? moment(startOfDate + shift[0].endTime) : undefined
    ],
    afternoonShift: [
      shift?.[1]?.beginTime !== undefined ? moment(startOfDate + shift[1].beginTime) : undefined,
      shift?.[1]?.endTime !== undefined ? moment(startOfDate + shift[1].endTime) : undefined
    ]
  };
};

const ScheduleJobFairFormComponent = ({ jobFairData, form, onFinish, onValueChange }) => {
  const initialFormValue = mapJobFairDataToFormInitialValues(jobFairData);
  return (
    <div className={'schedule-job-fair-form'}>
      <div style={{ textAlign: 'center' }}>
        <Title level={5}>Schedule job fair event</Title>
      </div>
      <div className={'form-container'}>
        <Form
          initialValues={initialFormValue}
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
            <RangePicker format={DateFormat} />
          </Form.Item>
          <Form.Item
            className={'form-item'}
            label='Public time range'
            name={'publicRange'}
            rules={OrganizeJobFairValidation.publicRange}>
            <RangePicker format={DateFormat} />
          </Form.Item>
          <Form.Item
            className={'form-item'}
            label='Morning shift'
            name={'morningShift'}
            rules={OrganizeJobFairValidation.morningShift}>
            <TimePicker.RangePicker format={MinuteFormat} />
          </Form.Item>
          <Form.Item
            className={'form-item'}
            label='Afternoon shift'
            name={'afternoonShift'}
            rules={OrganizeJobFairValidation.afternoonShift}>
            <TimePicker.RangePicker format={MinuteFormat} />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ScheduleJobFairFormComponent;
