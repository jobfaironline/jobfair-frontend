import { Badge, Button, Card, Col, DatePicker, Form, Modal, Row, Space, TimePicker, Typography } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { DateFormat, MinuteFormat } from '../../../constants/ApplicationConst';
import { convertToDateString, convertToDateValue, convertToUTCString, handleType } from '../../../utils/common';
import React from 'react';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';

const InterviewScheduleModalRequestChangeComponent = (props) => {
  const { data, visible, onCancel, form, onFinish, disabledDate } = props;
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} centered={true}>
      <Card title={'Request to change interview schedule'} bordered={false}>
        <Card.Meta
          style={{ marginBottom: '2rem', marginTop: '1rem' }}
          description={
            <div>
              <Badge
                status={handleType(data?.status)}
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
          onFinish={onFinish}
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
                    rules={[]}
                    style={{ display: 'inline-block' }}>
                    <DatePicker
                      defaultValue={moment(convertToDateString(data?.interviewDate), DateFormat)}
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
                  name={'startTime'}
                  rules={[]}
                  style={{ display: 'inline-block' }}>
                  <TimePicker
                    defaultValue={moment(
                      convertToUTCString(data?.timeStart).split('GMT')[0].split(' ')[4],
                      MinuteFormat
                    )}
                    format={MinuteFormat}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Typography.Text strong>
                      End time <ClockCircleOutlined />
                    </Typography.Text>
                  }
                  name={'endTime'}
                  rules={[]}
                  style={{ display: 'inline-block' }}>
                  <TimePicker
                    defaultValue={moment(convertToUTCString(data?.timeEnd).split('GMT')[0].split(' ')[4], MinuteFormat)}
                    format={MinuteFormat}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col span={24}>
                <Space direction='vertical'>
                  <Form.Item
                    label={<Typography.Text strong>Reason to change</Typography.Text>}
                    name={'reason'}
                    rules={[]}
                    style={{ display: 'inline-block' }}>
                    <TextArea placeholder='Input reason' />
                  </Form.Item>
                </Space>
              </Col>
            </Row>
          </div>
          <div>
            <Row>
              <Col span={24}>
                <Space direction='horizontal'>
                  <Form.Item>
                    <Button type='primary' htmlType='submit'>
                      Request
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary'>Cancel</Button>
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
