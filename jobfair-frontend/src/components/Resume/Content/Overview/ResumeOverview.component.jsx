import React from 'react'
import { Typography, Space, Row, Col } from 'antd'
import {
  ProjectOutlined,
  SmileOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  ManOutlined,
  TranslationOutlined,
  ReadFilled
} from '@ant-design/icons'
const OverviewComponent = props => {
  const { Title, Text, Link } = Typography
  const { data } = props
  const styleOverviewText = {
    marginLeft: '1rem'
  }
  const styleText = {
    marginTop: '-10px',
    fontSize: '1.2rem'
  }
  return (
    <div
      style={{
        fontSize: '1.4rem',
        padding: '1rem',
        border: '2px solid #888888',
        borderRadius: '5px 5px 5px 5px',
        marginTop: '0.6rem'
      }}
    >
      <Space align="start" direction="vertical">
        {data.experience ? (
          <Row>
            <Col>
              <ProjectOutlined />
            </Col>
            <Col style={styleOverviewText}>
              <Title level={4}>Experience</Title>
              <div style={styleText}>
                <Text type="secondary">{data.experience}</Text>
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
                <Text type="secondary">{data.age}</Text>
              </div>
            </Col>
          </Row>
        ) : null}

        {data.currentSalary ? (
          <Row>
            <Col>
              <BarChartOutlined />
            </Col>
            <Col style={styleOverviewText}>
              <Title level={4}>Current Salary</Title>
              <div style={styleText}>
                <Text type="secondary">{data.currentSalary}</Text>
              </div>
            </Col>
          </Row>
        ) : null}

        {data.expectedSalary ? (
          <Row>
            <Col>
              <AreaChartOutlined />
            </Col>
            <Col style={styleOverviewText}>
              <Title level={4}>Expected Salary</Title>
              <div style={styleText}>
                <Text type="secondary">{data.expectedSalary}</Text>
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
                <Text type="secondary">{data.gender}</Text>
              </div>
            </Col>
          </Row>
        ) : null}

        {data.language ? (
          <Row>
            <Col>
              <TranslationOutlined />
            </Col>
            <Col style={styleOverviewText}>
              <Title level={4}>Language</Title>
              <div style={styleText}>
                <Text type="secondary">{data.language}</Text>
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
                <Text type="secondary">{data.educationLevel}</Text>
              </div>
            </Col>
          </Row>
        ) : null}
      </Space>
    </div>
  )
}
export default OverviewComponent
