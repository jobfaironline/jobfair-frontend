import React from 'react';
import {Card, Col, Divider, Row, Space, Tag, Typography} from "antd";
import {convertEnumToString} from "../../utils/common";
import EvaluationFormComponent from "../EvaluationForm/EvaluationForm.component";

const {Text} = Typography

const CompanyRegistrationDetailComponent = (props) => {
  const {data, onFinish} = props
  return (
    <>
      <Card title="" bordered={true} headStyle={{textAlign: 'center'}}
            style={{width: 750, marginLeft: 300}}>
        <Space direction="vertical">
          <Space size="middle" direction="vertical">
            <Row>
              <Col span={24}>
                <Text strong>Registration description: </Text>
                <Text italic>{data.description}</Text>
              </Col>
              <Col span={24}>
                <Text strong>Status: </Text>
                <Text italic>
                  <Tag color="default">{convertEnumToString(data.status)}</Tag>
                </Text>
              </Col>
            </Row>
            <Divider style={{width: 700}}>
              <Text>Job positions: </Text>
            </Divider>
            {data.registrationJobPositions.map(item => (
              <div>
                <Row>
                  <Col span={24}>
                    <Text strong>Contact email: </Text>
                    <Text italic>{item.contactEmail}</Text>
                  </Col>
                  <Col span={24}>
                    <Text strong>Contact person name: </Text>
                    <Text italic>{item.contactPersonName}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Text strong>Job position description: </Text>
                    <Text italic>{item.description}</Text>
                  </Col>
                  <Col span={24}>
                    <Text strong>Job position requirement: </Text>
                    <Text italic>{item.requirements}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={16}>
                    <Text strong>Job title: </Text>
                    <Text italic>{item.title}</Text>
                  </Col>
                  <Col span={16}>
                    <Text strong>Job level: </Text>
                    <Text italic>{convertEnumToString(item.jobLevel)}</Text>
                  </Col>
                  <Col span={16}>
                    <Text strong>Job type: </Text>
                    <Text italic>{convertEnumToString(item.jobType)}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Text strong>Min salary: </Text>
                    <Text italic>${item.minSalary}</Text>
                  </Col>
                  <Col span={24}>
                    <Text strong>Max salary: </Text>
                    <Text italic>${item.maxSalary}</Text>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <Text strong>Preferred language: </Text>
                    <Text italic>{item.language}</Text>
                  </Col>
                  <Col span={24}>
                    <Text strong>Number of positions: </Text>
                    <Text italic>{item.numOfPosition} slot(s)</Text>
                  </Col>
                </Row>
                <Text strong>Skill required: </Text>
                {item.skillTagDTOS.map((skill, index) => (
                  <>
                    <Row>
                      <Col span={24}>
                        <Text italic>- </Text>
                        <Text italic>{skill.name}</Text>
                      </Col>
                    </Row>
                  </>
                ))}
                <Divider/>
              </div>
            ))}
            {data.status === 'PENDING' ? (
              <>
                <Text strong>Evaluate this registration</Text>
                <EvaluationFormComponent onFinish={onFinish} id={data.id} name="companyRegistrationId"/>
              </>
            ) : null}
          </Space>
        </Space>
      </Card>
    </>
  );
};

export default CompanyRegistrationDetailComponent;