import { Col, Row, Switch, Typography } from 'antd';
import React from 'react';

const BoothControlSettingComponent = () => (
  <div>
    <Typography.Title level={4}>Setting</Typography.Title>
    <Row>
      <Col span={12}>
        <Typography.Text>Host management: </Typography.Text>
      </Col>
      <Col span={12}>
        <Switch defaultChecked key='host-switch' />
      </Col>
    </Row>
    <Typography.Title level={5}>Let everyone: </Typography.Title>
    <Row>
      <Col span={12}>
        <Typography.Text>Share their screen: </Typography.Text>
      </Col>
      <Col span={12}>
        <Switch size='small' defaultChecked key='share-screen-switch' />
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Typography.Text>Send chat messages: </Typography.Text>
      </Col>
      <Col span={12}>
        <Switch size='small' defaultChecked key='send-chat-switch' />
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Typography.Text>Turn on their microphone: </Typography.Text>
      </Col>
      <Col span={12}>
        <Switch size='small' defaultChecked key='turn-on-mic-switch' />
      </Col>
    </Row>
    <Row>
      <Col span={12}>
        <Typography.Text>Turn on their video: </Typography.Text>
      </Col>
      <Col span={12}>
        <Switch size='small' defaultChecked key='turn-on-video-switch' />
      </Col>
    </Row>
    <Typography.Title level={5}>Meeting access: </Typography.Title>
    <Row>
      <Col span={12}>
        <Typography.Text>Quick access: </Typography.Text>
      </Col>
      <Col span={12}>
        <Switch defaultChecked key='quick-access-switch' />
      </Col>
    </Row>
  </div>
);

export default BoothControlSettingComponent;
