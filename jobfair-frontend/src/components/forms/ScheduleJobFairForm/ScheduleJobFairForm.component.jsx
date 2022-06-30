import './ScheduleJobFairFormComponent.styles.scss';
import { DateFormat, MinuteFormat } from '../../../constants/ApplicationConst';
import { DatePicker, Form, Input, TimePicker, Typography } from 'antd';
import { OrganizeJobFairValidation } from '../../../validate/OrganizeJobFairValidation';
import { PUBLIC_RANGE_LIMIT, SHIFT_DISABLE_TIME } from '../../../constants/JobFairConst';
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
  const publicRangesRef = useRef(null);
  const decorateRangesRef = useRef(null);

  const disabledPastDate = (current) => current && current < moment().endOf('day').subtract(1, 'days');

  //TODO: Limit public range to 2 days (will be updated when implement subscription)
  const disabledPublicRange = (current) => {
    //disable past date
    if (current < moment().endOf('day').subtract(1, 'days')) return true;
    //disable pass decorate time
    if (decorateRangesRef.current) if (current.isBefore(decorateRangesRef.current[1])) return true;

    if (!publicRangesRef.current) return false;
    const tooLate = publicRangesRef.current[0] && current.diff(publicRangesRef.current[0], 'days') > PUBLIC_RANGE_LIMIT;
    const tooEarly =
      publicRangesRef.current[1] && publicRangesRef.current[1].diff(current, 'days') > PUBLIC_RANGE_LIMIT;
    return !!tooEarly || !!tooLate;
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
            <RangePicker
              format={DateFormat}
              disabledDate={disabledPastDate}
              onCalendarChange={(value) => (decorateRangesRef.current = value)}
            />
          </Form.Item>
          <Form.Item
            className={'form-item'}
            label={`Public time range (${timeZone})`}
            name={'publicRange'}
            rules={OrganizeJobFairValidation.publicRange}>
            <RangePicker
              format={DateFormat}
              disabledDate={disabledPublicRange}
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
