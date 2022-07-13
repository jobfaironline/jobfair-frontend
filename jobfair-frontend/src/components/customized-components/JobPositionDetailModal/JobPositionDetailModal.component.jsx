import { Col, Row, Space, Tag, Typography } from 'antd';
import { convertEnumToString } from '../../../utils/common';
import React from 'react';

const { Text } = Typography;

const JobPositionDetailModalComponent = ({ data }) => (
  <div className={'job-position-detail-modal'} style={{ height: 'max-content', fontSize: '1rem' }}>
    <div
      key='no'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Text strong style={{ fontSize: '1.4rem' }}>{`${data.title}`}</Text>
    </div>
    <div>
      <div className='sub-title' style={{}}>
        <Text strong style={{ fontSize: '1.2rem' }}>
          Job information
        </Text>
      </div>
      <Col style={{ marginLeft: '1rem' }}>
        <Col gutter={[0, 48]}>
          <Row key='language' style={{}}>
            <Space>
              <Text strong style={{ fontSize: '1rem' }}>
                Prefer language:{' '}
              </Text>
              <Text>{data.language}</Text>
            </Space>
          </Row>
          <Row>
            <Col span={12} key='level'>
              <Space>
                <Text strong>Job level: </Text>
                <Tag color='purple' style={{ fontSize: '0.9rem', padding: '1px 5px' }}>
                  {data.level !== undefined ? convertEnumToString(data.level) : convertEnumToString(data.jobLevel)}
                </Tag>
              </Space>
            </Col>
            <Col span={12} key='type'>
              <Space>
                <Text strong>Job type: </Text>
                <Text>{convertEnumToString(data?.jobType)}</Text>
              </Space>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <div key='contact-name'>
                <Space>
                  <Text strong>Contact:</Text>
                  <Text>{data.contactPersonName}</Text>
                </Space>
              </div>
            </Col>
            <Col span={12}>
              <div key='contact-email'>
                <Space>
                  <Text strong>Contact:</Text>
                  <Text>{data.contactEmail}</Text>
                </Space>
              </div>
            </Col>
          </Row>
          <Row key='skills'>
            <Col span={12}>
              <Space wrap size='4' direction='vertical'>
                <Text strong>Required skills: </Text>
                <Space wrap size='4'>
                  {data.skillTagDTOS.map((skill) => (
                    <Tag color='green' style={{ fontSize: '0.9rem', padding: '1px 5px' }}>
                      {skill.name}
                    </Tag>
                  ))}
                </Space>
              </Space>
            </Col>
            <Col span={12}>
              <Space wrap size='4' direction='vertical'>
                <Text strong>Category: </Text>
                <Space wrap size='4'>
                  {data.subCategoryDTOs.map((category) => (
                    <Tag color='blue' style={{ fontSize: '0.9rem', padding: '1px 5px' }}>
                      {category.name}
                    </Tag>
                  ))}
                </Space>
              </Space>
            </Col>
          </Row>
        </Col>
      </Col>
      <Col style={{ marginLeft: '1rem' }}>
        <div>
          <div key='description'>
            <Space align='start' direction='vertical' size={'0.3rem'}>
              <Text strong>Job description: </Text>
              <Text>{data.description}</Text>
            </Space>
          </div>
          <div key='requirement'>
            <Space align='start' direction='vertical' size={'0.3rem'}>
              <Text strong>Job requirements: </Text>
              <Text>{data.requirements}</Text>
            </Space>
          </div>
        </div>
      </Col>
    </div>
  </div>
);

export default JobPositionDetailModalComponent;
