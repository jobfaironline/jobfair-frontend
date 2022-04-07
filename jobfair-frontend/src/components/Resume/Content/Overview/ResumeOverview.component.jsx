import { Col, Row, Space, Typography } from 'antd';
import { ManOutlined, ProjectOutlined, ReadFilled, SmileOutlined } from '@ant-design/icons';
import React from 'react';

const OverviewComponent = (props) => {
  const { Title, Text } = Typography;
  const { data } = props;
  const styleOverviewText = {
    marginLeft: '1rem'
  };
  const styleText = {
    marginTop: '-10px',
    fontSize: '1.2rem'
  };
  return (
    <div
      style={{
        fontSize: '1.4rem',
        padding: '1rem',
        border: '2px solid #888888',
        borderRadius: '5px 5px 5px 5px',
        marginTop: '0.6rem'
      }}>
      <Space align='start' direction='vertical'>
        {data.experience ? (
          <Row>
            <Col>
              <ProjectOutlined />
            </Col>
            <Col style={styleOverviewText}>
              <Title level={4}>Experience</Title>
              <div style={styleText}>
                <Text type='secondary'>{data.experience}</Text>
              </div>
            </Col>
          </Row>
        ) : null}

        {data.age ? (
          <Row>
            <Col>
              <SmileOutlined />
            </Col>
            <Col style={styleOverviewText}>
              <Title level={4}>Age</Title>
              <div style={styleText}>
                <Text type='secondary'>{data.age}</Text>
              </div>
            </Col>
          </Row>
        ) : null}

        {data.gender ? (
          <Row>
            <Col>
              <ManOutlined />
            </Col>
            <Col style={styleOverviewText}>
              <Title level={4}>Gender</Title>
              <div style={styleText}>
                <Text type='secondary'>{data.gender}</Text>
              </div>
            </Col>
          </Row>
        ) : null}

        {data.educationLevel ? (
          <Row>
            <Col>
              <ReadFilled />
            </Col>
            <Col style={styleOverviewText}>
              <Title level={4}>Education Level</Title>
              <div style={styleText}>
                <Text type='secondary'>{data.educationLevel}</Text>
              </div>
            </Col>
          </Row>
        ) : null}
      </Space>
    </div>
  );
};
export default OverviewComponent;
