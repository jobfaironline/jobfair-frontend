import { Col, Collapse, Row, Space, Tag, Typography } from 'antd';
import { convertEnumToString } from '../../../utils/common';
import React from 'react';

const { Text } = Typography;
const { Panel } = Collapse;
const JobPositionDetailCollapseComponent = ({ jobPosition }) => (
  <Collapse bordered={false} defaultActiveKey={['1']} style={{ marginBottom: '1rem' }}>
    <Panel
      key={jobPosition?.id}
      header={
        <Text strong style={{ fontSize: '1rem' }}>
          General information
        </Text>
      }>
      <Col style={{ marginLeft: '1rem' }}>
        <Row>
          <div key='title'>
            <Space>
              <Text strong>Job title: </Text>
              <Text>{jobPosition?.title}</Text>
            </Space>
          </div>
        </Row>
        <div key='language'>
          <Space>
            <Text strong>Prefer language: </Text>
            <Text>{jobPosition?.language}</Text>
          </Space>
        </div>
        <Row gutter={[100, 0]}>
          <Col span={8} key='level'>
            <Space>
              <Text strong>Job level: </Text>
              <Text>{convertEnumToString(jobPosition?.level)}</Text>
            </Space>
          </Col>
          <Col span={12} key='type'>
            <Space>
              <Text strong>Job type: </Text>
              <Text>{convertEnumToString(jobPosition?.jobType)}</Text>
            </Space>
          </Col>
        </Row>
        <Row gutter={[100, 0]}>
          <Col span={8}>
            <div key='contact-name'>
              <Space>
                <Text strong>Contact Person:</Text>
                <Text>{jobPosition?.contactPersonName}</Text>
              </Space>
            </div>
          </Col>
          <Col span={12}>
            <div key='contact-email'>
              <Space>
                <Text strong>Contact Email:</Text>
                <Text>{jobPosition?.contactEmail}</Text>
              </Space>
            </div>
          </Col>
          <Col>
            <div key='skills'>
              <Space>
                <Text strong>Required skills: </Text>
                {jobPosition?.skillTagDTOS.map((skill) => (
                  <Tag
                    color='blue'
                    style={{
                      fontSize: '0.9rem',
                      padding: '0.1rem 0.3rem'
                    }}>
                    {skill.name}
                  </Tag>
                ))}
              </Space>
            </div>
            <div key='category'>
              <Space>
                <Text strong>Category: </Text>
                {jobPosition?.subCategoryDTOs.map((category) => (
                  <Tag
                    color='blue'
                    style={{
                      fontSize: '0.9rem',
                      padding: '0.1rem 0.3rem'
                    }}>
                    {category.name}
                  </Tag>
                ))}
              </Space>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              <div key='description'>
                <Space align='start' direction='vertical' size={0}>
                  <Text strong>Job description: </Text>
                  <Text>{jobPosition?.description}</Text>
                </Space>
              </div>
              <div key='requirement'>
                <Space align='start' direction='vertical' size={0}>
                  <Text strong>Job requirements: </Text>
                  <Text>{jobPosition?.requirements}</Text>
                </Space>
              </div>
            </div>
          </Col>
        </Row>
      </Col>
    </Panel>
  </Collapse>
);

export default JobPositionDetailCollapseComponent;
