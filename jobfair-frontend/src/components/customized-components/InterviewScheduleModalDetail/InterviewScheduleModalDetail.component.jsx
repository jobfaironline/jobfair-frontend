import { Badge, Button, Card, Col, Modal, Row, Space, Typography } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { INTERVIEW_SCHEDULE_STATUS } from '../../../constants/InterviewScheduleConst';
import { convertEnumToString, convertToDateString, convertToUTCString } from '../../../utils/common';
import React from 'react';

export const handleTag = (status) => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'FINISH':
      return 'success';
    case 'CANCEL':
      return 'error';
    default:
      return 'default';
  }
};

const InterviewScheduleModalDetailComponent = (props) => {
  const { data, visible, onCancel, handleRequestChange, buttonAction } = props;
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} centered={true}>
      <Card title={data?.title} bordered={false}>
        <Card.Meta
          style={{ marginBottom: '2rem', marginTop: '1rem' }}
          description={
            <div>
              <Typography.Text strong>Status: </Typography.Text>
              <Badge
                status={data?.badgeType}
                text={
                  <Typography.Text type={handleTag(data?.status)}>{convertEnumToString(data?.status)}</Typography.Text>
                }
              />
            </div>
          }
        />
        <Card.Meta
          description={
            <div>
              <Typography.Text strong>Description: </Typography.Text>
              <Typography.Text>{data?.description}</Typography.Text>
            </div>
          }
        />
        <div style={{ marginTop: '2rem' }}>
          <Row>
            <Col span={8}>
              <Space direction='vertical'>
                <Typography.Text strong>
                  Interview date <CalendarOutlined />
                </Typography.Text>
                <Typography.Text>{convertToDateString(data?.timeStart)}</Typography.Text>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction='vertical'>
                <Typography.Text strong>
                  Start time <ClockCircleOutlined />
                </Typography.Text>
                <Typography.Text>{convertToUTCString(data?.timeStart).split('GMT')[0].split(' ')[4]}</Typography.Text>
              </Space>
            </Col>
            <Col span={8}>
              <Space direction='vertical'>
                <Typography.Text strong>
                  End time <ClockCircleOutlined />
                </Typography.Text>
                <Typography.Text>{convertToUTCString(data?.timeEnd).split('GMT')[0].split(' ')[4]}</Typography.Text>
              </Space>
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Row>
            <Col span={24}>
              <Space direction='horizontal'>
                <Typography.Text strong>Interview room</Typography.Text>
                {buttonAction(data)}
              </Space>
            </Col>
          </Row>
        </div>
        {data?.status !== INTERVIEW_SCHEDULE_STATUS.NOT_YET ? (
          data?.status === INTERVIEW_SCHEDULE_STATUS.REQUEST_CHANGE ? (
            <div style={{ marginTop: '2rem' }}>
              <Row>
                <Col span={24}>
                  <Space direction='horizontal'>
                    <Typography.Text italic>You already sent a request change </Typography.Text>
                  </Space>
                </Col>
              </Row>
            </div>
          ) : null
        ) : (
          <div style={{ marginTop: '2rem' }}>
            <Row>
              <Col span={24}>
                <Space direction='horizontal'>
                  <Typography.Text italic>Request to change interview schedule?</Typography.Text>
                  <Button type='primary' style={{ borderRadius: 8 }} onClick={() => handleRequestChange()}>
                    Send request
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        )}
      </Card>
    </Modal>
  );
};

export default InterviewScheduleModalDetailComponent;
