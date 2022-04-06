import React from 'react'
import { Avatar, Button, Col, Row, Space, Typography } from 'antd'
import {
  DownloadOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  FieldTimeOutlined,
  GoogleOutlined,
  LinkOutlined,
  MailOutlined,
  TwitterOutlined
} from '@ant-design/icons'
import styles from './ResumeHeader.module.scss'

const ResumeHeader = props => {
  const { Text, Link, Title } = Typography
  const { data } = props
  return (
    <>
      <div className={styles.container}>
        <img
          src="/miku.jpg"
          alt="123"
          style={{ width: '100%', height: '20rem' }}
        />
        <div className={styles.content}>
          <Row>
            <Col span={16} offset={4}>
              <Row>
                <Col span={8}>
                  <div className={styles.singleCandidateHeadeRight}>
                    <Space direction="vertical" size={100}>
                      <div className={styles.categories}>
                        <Button ghost type={styles.dashed}>
                          {data?.jobPosition}
                        </Button>
                      </div>
                      <div className={styles.socialNetwordPages}>
                        <Space>
                          <FacebookOutlined />
                          <TwitterOutlined />
                          <GoogleOutlined />
                        </Space>
                      </div>
                    </Space>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.candidateDetail}>
                    <Space align="center" direction="vertical">
                      <div className={styles.candidateImage}>
                        <Avatar
                          src={
                            data.profileImageUrl
                              ? data.profileImageUrl
                              : 'https://joeschmoe.io/api/v1/random'
                          }
                          size={{
                            xs: 24,
                            sm: 32,
                            md: 40,
                            lg: 64,
                            xl: 80,
                            xxl: 145
                          }}
                        />
                      </div>

                      <Title level={2}>{data?.name}</Title>
                      <Link href={data.email} target="_blank">
                        {data?.jobTitle}
                      </Link>
                      <div style={{ color: '#888888' }}>
                        <MailOutlined />
                        <Link
                          href={data.email}
                          target="_blank"
                          style={{ color: '#888888' }}
                        >
                          {data.email}
                        </Link>
                      </div>
                      <div style={{ color: '#888888' }}>
                        <LinkOutlined />
                        <Link
                          href={data.website}
                          target="_blank"
                          style={{ color: '#888888' }}
                        >
                          website
                        </Link>
                      </div>
                    </Space>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.singleCandidateHeadeLeft}>
                    <Space
                      direction="vertical"
                      size={100}
                      style={{ width: '100%' }}
                    >
                      <div className={styles.locationPublished}>
                        <Row justify="space-between">
                          <Col>
                            <EnvironmentOutlined />
                            <Text strong style={{ color: 'white' }}>
                              {data.location}
                            </Text>
                          </Col>
                          <Col>
                            <FieldTimeOutlined />
                            <Text strong style={{ color: 'white' }}>
                              Member Since {data.startYear}
                            </Text>
                          </Col>
                        </Row>
                      </div>
                      <div className={styles.candidateResume}>
                        <Button size="large" type="dashed">
                          Download CV {<DownloadOutlined />}
                        </Button>
                      </div>
                    </Space>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}
export default ResumeHeader
