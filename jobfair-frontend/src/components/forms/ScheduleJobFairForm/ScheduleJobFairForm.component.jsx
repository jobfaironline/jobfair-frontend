import './ScheduleJobFairFormComponent.styles.scss';
import { DateFormat, MinuteFormat } from '../../../constants/ApplicationConst';
import { DatePicker, Form, Input, TimePicker, Typography } from 'antd';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';
import { SHIFT_DISABLE_TIME } from '../../../constants/JobFairConst';
import { getTimeZoneCode } from '../../../utils/common';
import React, { useRef } from 'react';
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
  const timeZone = getTimeZoneCode();
  const hackRef = useRef(null);
  const publicValueRef = useRef(null);
  const publicRangesRef = useRef(null);

  const disabledDate = (current) =>
    // Can not select days before today and today
    current && current < moment().endOf('day');
  //TODO: Limit public range to 2 days (will be updated when implement subscription)
  const disabledPublicRange = (current) => {
    if (!publicRangesRef.current) return false;

    const tooLate = publicRangesRef.current[0] && current.diff(publicRangesRef.current[0], 'days') > 2;
    const tooEarly = publicRangesRef.current[1] && publicRangesRef.current[1].diff(current, 'days') > 2;

    return !!tooEarly || !!tooLate;
  };

  const onOpenChange = (open) => {
    if (open) {
      hackRef.current = [null, null];
      publicRangesRef.current = [null, moment().add(3, 'day').endOf('day')];
    } else hackRef.current = null;
  };
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
            label={`Decoration booth time range (${timeZone})`}
            name={'decorateRange'}
            rules={OrganizeJobFairValidation.decorateRange}
            className={'form-item'}>
            <RangePicker format={DateFormat} disabledDate={disabledDate} />
          </Form.Item>
          <Form.Item
            className={'form-item'}
            label={`Public time range (${timeZone})`}
            name={'publicRange'}
            rules={OrganizeJobFairValidation.publicRange}>
            <RangePicker
              format={DateFormat}
              disabledDate={disabledPublicRange}
              value={hackRef || publicValueRef}
              // ranges={{
              //   '1 Day': [moment(), moment().add(1, 'days')],
              //   '2 Days': [moment(), moment().add(2, 'days')],
              //   '3 Days ': [moment(), moment().add(3, 'days')]
              // }}
              onOpenChange={onOpenChange}
              onChange={(value) => (publicValueRef.current = value)}
              onCalendarChange={(value) => (publicRangesRef.current = value)}
            />
          </Form.Item>
          <Form.Item
            className={'form-item'}
            label={`Morning shift (${timeZone})`}
            name={'morningShift'}
            rules={OrganizeJobFairValidation.morningShift}>
            <TimePicker.RangePicker
              format={MinuteFormat}
              disabledTime={() => ({
                disabledHours: () => SHIFT_DISABLE_TIME.MORNING_SHIFT
              })}
            />
          </Form.Item>
          <Form.Item
            className={'form-item'}
            label={`Afternoon shift (${timeZone})`}
            name={'afternoonShift'}
            rules={OrganizeJobFairValidation.afternoonShift}>
            <TimePicker.RangePicker
              format={MinuteFormat}
              disabledTime={() => ({
                disabledHours: () => SHIFT_DISABLE_TIME.AFTERNOON_SHIFT
              })}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ScheduleJobFairFormComponent;
