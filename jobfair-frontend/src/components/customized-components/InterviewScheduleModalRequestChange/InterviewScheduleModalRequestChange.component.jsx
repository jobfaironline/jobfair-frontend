import { Badge, Button, Card, Col, DatePicker, Form, Modal, Row, Space, TimePicker, Typography } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { DateFormat, MinuteFormat } from '../../../constants/ApplicationConst';
import { InterviewScheduleValidation } from '../../../validate/InterviewScheduleValidation';
import { SHIFT_HOUR } from '../../../constants/InterviewScheduleConst';
import { convertToDateString, convertToDateValue, convertToUTCString } from '../../../utils/common';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';

const InterviewScheduleModalRequestChangeComponent = (props) => {
  const { data, visible, onCancel, form, onFinish, requestChangeError } = props;

  const disabledDate = (current) =>
    !current ||
    current.isBefore(moment().startOf('day')) ||
    current.isAfter(moment(data?.jobFairPublicEndTime).startOf('day'));

  const disableStartTime = () => {
    const selectedDate = form.getFieldValue('interviewDate');
    let disabledHours;
    if (selectedDate.startOf('day').isSame(moment().startOf('day')))
      disabledHours = [...Array(24).keys()].filter((hour) => !SHIFT_HOUR.includes(hour) || hour < moment().hour());
    else disabledHours = [...Array(24).keys()].filter((hour) => !SHIFT_HOUR.includes(hour));

    return {
      disabledHours: () => disabledHours,
      disabledMinutes: (selectedHour) => {
        if (disabledHours.length === 24) return [...Array(60).keys()];
        if (selectedHour === moment().hour())
          return [...Array(60).keys()].filter((minute) => minute < moment().minute());
        return [];
      }
    };
  };

  const disableEndTime = () => {
    const selectedDate = form.getFieldValue('interviewDate');
    let availableHour = SHIFT_HOUR;
    //if the select date is job fair end time check for closing hour
    if (selectedDate.startOf('day').isSame(moment(data?.jobFairPublicEndTime).startOf('day')))
      availableHour = SHIFT_HOUR.filter((hour) => hour < moment(data?.jobFairPublicEndTime).hour() + 1);
    let disabledHours = [...Array(24).keys()].filter((hour) => !availableHour.includes(hour));
    //check with today hour
    if (selectedDate.startOf('day').isSame(moment().startOf('day')))
      disabledHours = [...Array(24).keys()].filter((hour) => hour < moment().hour() || disabledHours.includes(hour));

    return {
      disabledHours: () => disabledHours,
      disabledMinutes: (selectedHour) => {
        if (disabledHours.length === 24) return [...Array(60).keys()];
        //if the selected hour is closing hour check for closing minute
        if (selectedHour === moment(data?.jobFairPublicEndTime).hour()) {
          const availableMinute = [...Array(moment(data?.jobFairPublicEndTime).minutes() + 1).keys()];
          return [...Array(60).keys()].filter(
            (minute) => !availableMinute.includes(minute) || minute < moment().minute()
          );
        }
        //if today is selected date check for today closing minute
        if (selectedDate.startOf('day').isSame(moment().startOf('day')) || selectedHour === moment().hour())
          return [...Array(60).keys()].filter((minute) => minute < moment().minute());
        return [];
      }
    };
  };

  const defaultData = {
    interviewDate: moment(convertToDateString(data?.timeStart), DateFormat),
    timeStart: moment(convertToUTCString(data?.timeStart).split('GMT')[0].split(' ')[4], MinuteFormat),
    timeEnd: moment(convertToUTCString(data?.timeEnd).split('GMT')[0].split(' ')[4], MinuteFormat)
  };
  form.setFieldsValue({ ...defaultData });

  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} centered={true}>
      <Card title={'Request to change interview schedule'} bordered={false}>
        <Card.Meta
          style={{ marginBottom: '2rem', marginTop: '1rem' }}
          description={
            <div>
              <Badge
                status={data?.badgeType}
                text={
                  <Typography.Text>
                    {data?.title} ({convertToUTCString(data?.timeStart).split('GMT')[0].split(' ')[4]} -{' '}
                    {convertToUTCString(data?.timeEnd).split('GMT')[0].split(' ')[4]}){' '}
                  </Typography.Text>
                }
              />
            </div>
          }
        />
        <Form
          form={form}
          onFinish={(values) => onFinish(values, data)}
          requiredMark='required'
          autoComplete='off'
          scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
          <div style={{ marginTop: '2rem' }}>
            <Row>
              <Col span={24}>
                <Space direction='vertical'>
                  <Form.Item
                    label={
                      <Typography.Text strong>
                        Interview date <CalendarOutlined />
                      </Typography.Text>
                    }
                    name={'interviewDate'}
                    rules={InterviewScheduleValidation.interviewDate}
                    style={{ display: 'inline-block' }}>
                    <DatePicker
                      format={DateFormat}
                      onChange={(date, dateString) => convertToDateValue(dateString)}
                      disabledDate={disabledDate}
                    />
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col span={12}>
                <Form.Item
                  label={
                    <Typography.Text strong>
                      Start time <ClockCircleOutlined />
                    </Typography.Text>
                  }
                  name={'timeStart'}
                  rules={InterviewScheduleValidation.startTime}
                  style={{ display: 'inline-block' }}>
                  <TimePicker format={MinuteFormat} disabledTime={disableStartTime} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Typography.Text strong>
                      End time <ClockCircleOutlined />
                    </Typography.Text>
                  }
                  name={'timeEnd'}
                  rules={InterviewScheduleValidation.endTime}
                  style={{ display: 'inline-block' }}>
                  <TimePicker format={MinuteFormat} disabledTime={disableEndTime} />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div>
            <Form.Item
              label={<Typography.Text strong>Reason to change</Typography.Text>}
              name={'reason'}
              rules={InterviewScheduleValidation.reason}
              style={{ display: 'inline-block', width: '100%' }}>
              <TextArea placeholder='Input reason' showCount maxLength={3000} />
            </Form.Item>
          </div>
          {requestChangeError ? (
            <div style={{ marginBottom: '1rem' }}>
              <Typography.Text type='danger'>{requestChangeError}</Typography.Text>
            </div>
          ) : null}
          <div>
            <Row>
              <Col span={24}>
                <Space direction='horizontal'>
                  <Form.Item>
                    <Button style={{ borderRadius: 8 }} type='primary' htmlType='submit'>
                      Request
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button style={{ borderRadius: 8 }} type='primary' onClick={onCancel}>
                      Cancel
                    </Button>
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          </div>
        </Form>
      </Card>
    </Modal>
  );
};

export default InterviewScheduleModalRequestChangeComponent;
