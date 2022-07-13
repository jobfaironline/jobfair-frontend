import { Avatar, Card, Col, Row, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

export const ResumeOverview = ({ userOverview }) => (
  <Card style={{ marginBottom: '1rem', padding: '0.5rem 1rem', borderRadius: '8px' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar size={200} src={userOverview?.profileImage} alt='avatar' style={{ maxHeight: '200px' }} />
      <div style={{ width: '100%', fontSize: '1rem', marginTop: '1rem' }}>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={8}>
            <Text strong>Name</Text>
          </Col>
          <Col>
            <Text>{userOverview?.fullName}</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={8}>
            <Text strong>Email</Text>
          </Col>
          <Col>
            <Text>{userOverview?.email}</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={8}>
            <Text strong>Phone</Text>
          </Col>
          <Col>
            <Text>{userOverview?.phoneNumber}</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={8}>
            <Text strong>Location</Text>
          </Col>
          <Col>
            <Text>{userOverview?.location}</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={8}>
            <Text strong>Education</Text>
          </Col>
          <Col>
            <Text>{userOverview?.educationLevel}</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={8}>
            <Text strong>Job title</Text>
          </Col>
          <Col>
            <Text>{userOverview?.jobTitle}</Text>
          </Col>
        </Row>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={8}>
            <Text strong>Experience</Text>
          </Col>
          <Col>
            <Text>{userOverview?.yearOfExperience}</Text>
          </Col>
        </Row>
      </div>

      <Text strong style={{ marginTop: '1rem', fontSize: '1rem', marginBottom: '1rem' }}>
        {userOverview?.email}
      </Text>
    </div>
  </Card>
);
