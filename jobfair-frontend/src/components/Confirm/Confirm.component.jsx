import React from 'react'
import {Anchor, Card, Col, Divider, Row, Space, Tag, Typography} from 'antd'
import {convertEnumToString} from '../../utils/common'
import './Confirm.styles.scss'

const {Link} = Anchor

const ConfirmComponent = props => {
  const {data, companyInfo} = props

  const {Title, Paragraph, Text} = Typography

  return (
    <>
      <div style={{position: 'fixed', left: '0.8rem', top: '200px'}}>
        <Typography style={{fontSize: '1rem', paddingBottom: '0.3rem'}}>Registration</Typography>
        <Anchor targetOffset={300} onClick={e => e.preventDefault()}>
          <Link href={`#company-information`} title="Company info"/>
          {data.jobPositions.map((jobPosition, index) => {
            return <Link href={`#${index}-job-position`} title={`${index + 1}: ${jobPosition.title}`}/>
          })}
        </Anchor>
      </div>
      <div className="confirm-form-container">
        <div className="site-card-wrapper">
          <Col>
            <div id="company-information">
              <Card
                title="Company Information"
                bordered={false}
                headStyle={{fontSize: '2rem'}}
                className="company-info-card"
              >
                <Typography>
                  <Paragraph>
                    <Row gutter={[300, 0]}>
                      <Col>
                        <div key="company-name">
                          <Space>
                            <Text strong>Company name: </Text>
                            <Text>{companyInfo.name}</Text>
                          </Space>
                        </div>
                        <div key="company-phone">
                          <Space>
                            <Text strong>Company phone: </Text>
                            <Text>{companyInfo.phone}</Text>
                          </Space>
                        </div>
                      </Col>
                      <Col>
                        <div key="company-address">
                          <Space>
                            <Text strong>Company address: </Text>
                            <Text>{companyInfo.address}</Text>
                          </Space>
                        </div>
                        <div key="company-email">
                          <Space>
                            <Text strong>Company email: </Text>
                            <Text>{companyInfo.email}</Text>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                    <div key="company-website">
                      <Space>
                        <Text strong>Company website: </Text>
                        <Text>{companyInfo.websiteUrl}</Text>
                      </Space>
                    </div>
                    <div key="company-reg-des">
                      <Space>
                        <Text strong>Registration description: </Text>
                        <Text>{data.description}</Text>
                      </Space>
                    </div>
                  </Paragraph>
                </Typography>
              </Card>
            </div>
            <Row>
              <Card
                title="Job positions"
                bordered={false}
                headStyle={{fontSize: '2rem'}}
                className="job-positions-info-card"
              >
                <Typography>
                  <Paragraph>
                    {data.jobPositions.map((item, index) => (
                      <div id={`${index}-job-position`}>
                        <div key="no" style={{marginBottom: '0.8rem'}}>
                          <Text strong style={{fontSize: '1.6rem'}}>{`Job position ${index + 1}`}</Text>
                        </div>
                        <div style={{marginLeft: '1rem'}}>
                          <div className="sub-title" style={{marginBottom: '0.2rem'}}>
                            <Text strong style={{fontSize: '1.4rem'}}>
                              General information
                            </Text>
                          </div>
                          <Col style={{marginLeft: '1rem'}}>
                            <Row>
                              <div key="title">
                                <Space>
                                  <Text strong>Job title: </Text>
                                  <Text>{item.title}</Text>
                                </Space>
                              </div>
                            </Row>
                            <div key="language">
                              <Space>
                                <Text strong>Prefer language: </Text>
                                <Text>{item.language}</Text>
                              </Space>
                            </div>
                            <div key="skills">
                              <Space>
                                <Text strong>Required skills: </Text>
                                {item.skillTagDTOS.map(skill => {
                                  return (
                                    <Tag color="blue" style={{fontSize: '0.9rem', padding: '0.1rem 0.3rem'}}>
                                      {skill.name}
                                    </Tag>
                                  )
                                })}
                              </Space>
                            </div>
                            <div key="category">
                              <Space>
                                <Text strong>Category: </Text>
                                {item.subCategoryDTOs.map(category => {
                                  return (
                                    <Tag color="blue" style={{fontSize: '0.9rem', padding: '0.1rem 0.3rem'}}>
                                      {category.name}
                                    </Tag>
                                  )
                                })}
                              </Space>
                            </div>
                            <Row gutter={[100, 0]}>
                              <Col span={8} key="level">
                                <Space>
                                  <Text strong>Job level: </Text>
                                  <Text>{convertEnumToString(item.level)}</Text>
                                </Space>
                              </Col>
                              <Col span={12} key="type">
                                <Space>
                                  <Text strong>Job type: </Text>
                                  <Text>{convertEnumToString(item.jobType)}</Text>
                                </Space>
                              </Col>
                            </Row>
                            <Row gutter={[100, 0]}>
                              <Col span={8}>
                                <div key="contact-name">
                                  <Space>
                                    <Text strong>Contact:</Text>
                                    <Text>{item.contactPersonName}</Text>
                                  </Space>
                                </div>
                              </Col>
                              <Col span={12}>
                                <div key="contact-email">
                                  <Space>
                                    <Text strong>Contact:</Text>
                                    <Text>{item.contactEmail}</Text>
                                  </Space>
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        </div>
                        <div style={{marginLeft: '1rem'}}>
                          <div className="sub-title" style={{marginBottom: '0.2rem'}}>
                            <Text strong style={{fontSize: '1.4rem'}}>
                              Specific jobfair's information
                            </Text>
                          </div>
                          <div style={{marginLeft: '1rem'}}>
                            <div key="description">
                              <Space>
                                <Text strong>Job description: </Text>
                                <Text>{item.description}</Text>
                              </Space>
                            </div>
                            <div key="requirement">
                              <Space>
                                <Text strong>Job requirement: </Text>
                                <Text>{item.requirement}</Text>
                              </Space>
                            </div>
                            <Row gutter={[100, 0]}>
                              <Col span={8} key="salary-range">
                                <Space>
                                  <Text strong>Min salary: </Text>
                                  <Text>{item.minSalary}</Text>
                                  {item.maxSalary ? (
                                    <>
                                      <Text>~</Text>
                                      <Text strong>Max salary: </Text>
                                      <Text>{item.maxSalary}</Text>
                                    </>
                                  ) : null}
                                </Space>
                              </Col>
                              <Col span={12} key="numOfPosition">
                                <Space>
                                  <Text strong>Available position:</Text>
                                  <Text>{item.numberOfPosition} slot(s)</Text>
                                </Space>
                              </Col>
                            </Row>
                          </div>
                        </div>

                        <Divider/>
                      </div>
                    ))}
                  </Paragraph>
                </Typography>
              </Card>
            </Row>
          </Col>
        </div>
      </div>
    </>
  )
}

export default ConfirmComponent
