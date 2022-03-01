import React from 'react';
import {Card, Col, Divider, Row, Space, Typography} from "antd";
import {convertEnumToString} from "../../utils/common";

const ConfirmComponent = props => {
    const {data, companyInfo} = props;

    const {Title, Paragraph, Text} = Typography;
    console.log(data)
    console.log(companyInfo)
    return (
        <>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={12}>
                        <Card title="Company Information" bordered={false} headStyle={{textAlign: 'center'}}>
                            <Typography>
                                <Paragraph>
                                    <div key="company-name" style={{display: 'flex', flexDirection: 'row'}}>
                                        <Space>
                                            <Text strong>Company name: </Text>
                                            <Text>{companyInfo.name}</Text>
                                        </Space>
                                    </div>
                                    <div key="company-email" style={{display: 'flex', flexDirection: 'row'}}>
                                        <Space>
                                            <Text strong>Company email: </Text>
                                            <Text>{companyInfo.email}</Text>
                                        </Space>
                                    </div>
                                    <div key="company-phone" style={{display: 'flex', flexDirection: 'row'}}>
                                        <Space>
                                            <Text strong>Company phone: </Text>
                                            <Text>{companyInfo.phone}</Text>
                                        </Space>
                                    </div>
                                    <div key="company-address" style={{display: 'flex', flexDirection: 'row'}}>
                                        <Space>
                                            <Text strong>Company address: </Text>
                                            <Text>{companyInfo.address}</Text>
                                        </Space>
                                    </div>
                                    <div key="company-reg-des" style={{display: 'flex', flexDirection: 'row'}}>
                                        <Space>
                                            <Text strong>Company registration description: </Text>
                                            <Text>{data.description}</Text>
                                        </Space>
                                    </div>
                                    <div key="company-website" style={{display: 'flex', flexDirection: 'row'}}>
                                        <Space>
                                            <Text strong>Company website: </Text>
                                            <Text>{companyInfo.websiteUrl}</Text>
                                        </Space>
                                    </div>
                                </Paragraph>
                            </Typography>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title="Job positions" bordered={false} headStyle={{textAlign: 'center'}}>
                            <Typography>
                                <Paragraph>
                                    {data.jobPositions.map((item, index) => (
                                        <>
                                            <div key="no" style={{display: 'flex', flexDirection: 'row'}}>
                                                <Text strong>No.{index}</Text>
                                            </div>
                                            <div key="title" style={{display: 'flex', flexDirection: 'row'}}>
                                                <Space>
                                                    <Text strong>Job title: </Text>
                                                    <Text>{item.title}</Text>
                                                </Space>
                                            </div>
                                            <div key="description" style={{display: 'flex', flexDirection: 'row'}}>
                                                <Space>
                                                    <Text strong>Job description: </Text>
                                                    <Text>{item.description}</Text>
                                                </Space>
                                            </div>
                                            <div key="requirement" style={{display: 'flex', flexDirection: 'row'}}>
                                                <Space>
                                                    <Text strong>Job requirement: </Text>
                                                    <Text>{item.requirement}</Text>
                                                </Space>
                                            </div>
                                            <div key="level" style={{display: 'flex', flexDirection: 'row'}}>
                                                <Space>
                                                    <Text strong>Job level: </Text>
                                                    <Text>{convertEnumToString(item.level)}</Text>
                                                </Space>
                                            </div>
                                            <div key="type" style={{display: 'flex', flexDirection: 'row'}}>
                                                <Space>
                                                    <Text strong>Job type: </Text>
                                                    <Text>{convertEnumToString(item.jobType)}</Text>
                                                </Space>
                                            </div>
                                            <div key="salary-range" style={{display: 'flex', flexDirection: 'row'}}>
                                                <Space>
                                                    <Text strong>Min salary: </Text>
                                                    <Text>{item.minSalary}</Text>
                                                    <Text>~</Text>
                                                    <Text strong>Max salary: </Text>
                                                    <Text>{item.maxSalary}</Text>
                                                </Space>
                                            </div>
                                            <div key="language" style={{display: 'flex', flexDirection: 'row'}}>
                                                <Space>
                                                    <Text strong>Prefer language: </Text>
                                                    <Text>{item.language}</Text>
                                                </Space>
                                            </div>
                                            <div key="contact" style={{display: 'flex', flexDirection: 'row'}}>
                                                <Space>
                                                    <Text strong>Contact:</Text>
                                                    <Text>{item.contactPersonName} / {item.contactEmail}</Text>
                                                </Space>
                                            </div>
                                            <div key="numOfPosition" style={{display: 'flex', flexDirection: 'row'}}>
                                                <Space>
                                                    <Text strong>Available position:</Text>
                                                    <Text>{item.numberOfPosition} slot(s)</Text>
                                                </Space>
                                            </div>
                                            <Divider/>
                                        </>

                                    ))}
                                </Paragraph>
                            </Typography>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};


export default ConfirmComponent;