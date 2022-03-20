import React from 'react';
import {Col, Row, Space, Tag, Typography} from "antd";
import {convertEnumToString} from "../../utils/common";

const {Text} = Typography

const JobPositionSubmodalDetailComponent = ({data}) => {
  return (
    <div style={{ height: 'max-content', marginLeft: '-38px', fontSize: '1.2rem' }}>
      <div
        key="no"
        style={{ marginBottom: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Text strong style={{ fontSize: '1.8rem' }}>{`- Job position -`}</Text>
        <Text strong style={{ fontSize: '1.8rem' }}>{`${data.title}`}</Text>
      </div>
      <div style={{  }}>
        <div className="sub-title" style={{ marginBottom: '0.2rem' }}>
          <Text strong style={{ fontSize: '1.5rem' }}>
            General information
          </Text>
        </div>
        <Col style={{ marginLeft: '1rem' }}>
          <Col gutter={[0, 48]}>
            <Row key="language" style={{ marginBottom: '0.3rem' }}>
              <Space>
                <Text strong>Prefer language: </Text>
                <Text>{data.language}</Text>
              </Space>
            </Row>
            <Row gutter={[100, 0]}>
              <Col span={8} key="level">
                <Space>
                  <Text strong>Job level: </Text>
                  <Text>{data.level !== undefined ? convertEnumToString(data.level) : convertEnumToString(data.jobLevel)}</Text>
                </Space>
              </Col>
              <Col span={12} key="type">
                <Space>
                  <Text strong>Job type: </Text>
                  <Text>{convertEnumToString(data?.jobType)}</Text>
                </Space>
              </Col>
            </Row>
            <Row gutter={[100, 0]}>
              <Col span={8}>
                <div key="contact-name">
                  <Space>
                    <Text strong>Contact:</Text>
                    <Text>{data.contactPersonName}</Text>
                  </Space>
                </div>
              </Col>
              <Col span={12}>
                <div key="contact-email">
                  <Space>
                    <Text strong>Contact:</Text>
                    <Text>{data.contactEmail}</Text>
                  </Space>
                </div>
              </Col>
            </Row>
            <Row key="skills">
              <Space wrap size="4" direction="vertical">
                <Text strong>Required skills: </Text>
                <Space wrap size="4">
                  {data.skillTagDTOS.map(skill => {
                    return (
                      <Tag color="blue" style={{ fontSize: '1rem', padding: '0.15rem 0.6rem' }}>
                        {skill.name}
                      </Tag>
                    )
                  })}
                </Space>
              </Space>
            </Row>
            <Row key="category">
              <Space wrap size="4" direction="vertical">
                <Text strong>Category: </Text>
                <Space wrap size="4">
                  {data.subCategoryDTOs.map(category => {
                    return (
                      <Tag color="blue" style={{ fontSize: '1rem', padding: '0.15rem 0.6rem' }}>
                        {category.name}
                      </Tag>
                    )
                  })}
                </Space>
              </Space>
            </Row>
          </Col>
        </Col>
        <div className="sub-title" style={{ margin: '1.5rem 0 0.2rem 0' }}>
          <Text strong style={{ fontSize: '1.5rem' }}>
            Specific information
          </Text>
        </div>
        <Col style={{ marginLeft: '1rem' }}>
          <div>
            <div key="description">
              <Space align="start" direction="vertical">
                <Text strong>Job description: </Text>
                <Text>{data.description}</Text>
              </Space>
            </div>
            <div key="requirement">
              <Space align="start" direction="vertical">
                <Text strong>Job requirements: </Text>
                <Text>{data.requirements}</Text>
              </Space>
            </div>
          </div>
        </Col>
      </div>
    </div>
  );
};

export default JobPositionSubmodalDetailComponent;