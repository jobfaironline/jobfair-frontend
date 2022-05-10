import { Col, Row, Tabs, Tag, Typography } from 'antd';
import { FileDoneOutlined, GiftOutlined, ReadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertEnumToString } from '../../../utils/common';
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Text } = Typography;
const { TabPane } = Tabs;

const JobPositionDetailModalComponent = ({ data }) => (
  <div style={{ height: 'max-content', fontSize: '1.2rem' }}>
    <div
      key='no'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
      }}>
      <Text strong style={{ fontSize: '1.8rem' }}>
        {data?.title}
      </Text>
    </div>
    <div>
      <Row>
        <Col span={8}>
          <Text strong>Prefer language: </Text>
        </Col>
        <Col span={8}>
          <Text>{data.language}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Text strong>Job level: </Text>
        </Col>
        <Col span={8}>
          <Text>{data.level !== undefined ? convertEnumToString(data.level) : convertEnumToString(data.jobLevel)}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Text strong>Job type: </Text>
        </Col>
        <Col span={8}>
          <Text>{convertEnumToString(data?.jobType)}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Text strong>Job location: </Text>
        </Col>
        <Col span={8}>
          <Text>chua co</Text>
        </Col>
      </Row>
      <Tabs defaultActiveKey='0' size='large'>
        <TabPane
          tab={
            <span>
              <Text strong>
                <ReadOutlined /> Description
              </Text>
            </span>
          }
          key='0'>
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: '1rem' }}>
                Job description:{' '}
              </Text>
              <Text style={{ fontSize: '1rem', display: 'inline-block', marginTop: '0.5rem' }}>{data.description}</Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: '1rem', display: 'flex', marginBottom: '0.5rem' }}>
                Job category:{'  '}
              </Text>
              {data.subCategoryDTOs.map((category) => (
                <Tag color='blue' style={{ fontSize: '1rem', padding: '0.15rem 0.6rem' }}>
                  {category.name}
                </Tag>
              ))}
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Text strong>
                <FileDoneOutlined />
                Requirements
              </Text>
            </span>
          }
          key='1'>
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: '1rem' }}>
                Job requirements:{' '}
              </Text>
              <Text style={{ fontSize: '1rem', display: 'inline-block', marginTop: '0.5rem' }}>
                {data?.requirements}
              </Text>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Text strong style={{ fontSize: '1rem', display: 'flex', marginBottom: '0.5rem' }}>
                Required skills:{' '}
              </Text>
              {data.skillTagDTOS.map((skill) => (
                <Tag color='blue' style={{ fontSize: '1rem', padding: '0.15rem 0.6rem' }}>
                  {skill.name}
                </Tag>
              ))}
            </Col>
          </Row>
        </TabPane>
        <TabPane
          tab={
            <span>
              <Text strong>
                <GiftOutlined />
                Benefits
              </Text>
            </span>
          }
          key='2'>
          Benefits
        </TabPane>
      </Tabs>
      <Row>
        <Col span={8} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text strong>Number of positions: </Text>
          <Text>{data?.numOfPosition}</Text>
        </Col>
        <Col span={8} style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '5rem' }}>
          <Text strong>Include entrance test: </Text>
          <Text>{data?.isHaveTest ? 'Yes' : 'No'}</Text>
        </Col>
      </Row>
      <Row>
        <Col span={8} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text strong>Contact person name: </Text>
          <Text>{data?.contactPersonName}</Text>
        </Col>
        <Col span={8} style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '5rem' }}>
          <Text strong>Contact email: </Text>
          <Text>{data?.contactEmail}</Text>
        </Col>
      </Row>
      <Text strong>Wage: </Text>
      <Row>
        <Col span={8}>
          <Text style={{ fontSize: '1rem' }}>From</Text>
          <div
            style={{
              border: '1px solid',
              borderRadius: '0.5rem',
              width: '15rem',
              height: '3rem',
              textAlign: 'center'
            }}>
            <div style={{ marginTop: '0.5rem' }}>
              <Text strong style={{ marginRight: '1rem' }}>
                {data?.minSalary}đ
              </Text>
              <FontAwesomeIcon icon={faMoneyCheckDollar} size={'lg'} color={'black'} />
            </div>
          </div>
        </Col>
        <Col span={8}>
          <Text style={{ fontSize: '1rem' }}>To</Text>
          <div
            style={{
              border: '1px solid',
              borderRadius: '0.5rem',
              width: '15rem',
              height: '3rem',
              textAlign: 'center'
            }}>
            <div style={{ marginTop: '0.5rem' }}>
              <Text strong style={{ marginRight: '1rem' }}>
                {data?.maxSalary}đ
              </Text>
              <FontAwesomeIcon icon={faMoneyCheckDollar} size={'lg'} color={'black'} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);

export default JobPositionDetailModalComponent;
