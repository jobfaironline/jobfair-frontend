import { Badge, Button, Card, Col, Modal, Row, Space, Typography } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, LinkOutlined } from '@ant-design/icons';
import {
  convertEnumToString,
  convertToDateString,
  convertToUTCString,
  handleTag,
  handleType
} from '../../../utils/common';
import React from 'react';

const InterviewScheduleModalDetailComponent = (props) => {
  const { data, visible, onCancel, handleRequestChange } = props;
  return (
    <Modal visible={visible} onCancel={onCancel} footer={null} centered={true}>
      <Card title={data?.title} bordered={false}>
        <Card.Meta
          style={{ marginBottom: '2rem', marginTop: '1rem' }}
          description={
            <div>
              <Typography.Text strong>Status: </Typography.Text>
              <Badge
                status={handleType(data?.status)}
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
                <Typography.Text>{convertToDateString(data?.interviewDate)}</Typography.Text>
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
              <Space direction='vertical'>
                <Typography.Text strong>
                  Interview link <LinkOutlined />
                </Typography.Text>
                <a href={data?.interviewLink}>{data?.interviewLink}</a>
              </Space>
            </Col>
          </Row>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <Row>
            <Col span={24}>
              <Space direction='horizontal'>
                <Typography.Text italic>Request to change interview schedule?</Typography.Text>
                <Button type='primary' onClick={() => handleRequestChange()}>
                  Send request
                </Button>
              </Space>
            </Col>
          </Row>
        </div>
      </Card>
    </Modal>
  );
};

export default InterviewScheduleModalDetailComponent;
