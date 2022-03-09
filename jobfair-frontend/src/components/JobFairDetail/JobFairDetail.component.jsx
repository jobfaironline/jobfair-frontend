import React from 'react';
import {Button, Card, Col, Divider, Row, Space, Tag, Typography} from "antd";
import EvaluationFormComponent from "../EvaluationForm/EvaluationForm.component";
import {Link, useHistory} from "react-router-dom";
import {JOB_FAIR_PLAN_STATUS} from "../../constants/JobFairConst";
import {convertEnumToString} from "../../utils/common";

const {Text} = Typography


const JobFairDetailComponent = (props) => {

    const {data, onFinish, totalRegistration, totalBooth, totalApproval} = props

    const handleButton = (status) => {
        if (status === undefined) {
            return;
        }
        switch (status) {
            case JOB_FAIR_PLAN_STATUS.PENDING:
                return (
                    <>
                        <EvaluationFormComponent onFinish={onFinish} id={data.id} name="jobFairId"/>
                    </>
                )
            case JOB_FAIR_PLAN_STATUS.APPROVE:
                return (
                    <Link to={`/approval-registration/${data.id}`}>Evaluate registrations</Link>
                )
        }
    }

    const handleStatusTag = (status) => {
        if (status === undefined) {
            return;
        }
        switch (status) {
            case JOB_FAIR_PLAN_STATUS.PENDING:
                return (
                    <Tag color="blue">{convertEnumToString(status)}</Tag>
                )
            case JOB_FAIR_PLAN_STATUS.APPROVE:
                return (
                    <Tag color="green">{convertEnumToString(status)}</Tag>
                )
            case JOB_FAIR_PLAN_STATUS.DRAFT:
                return (
                    <Tag color="gold">{convertEnumToString(status)}</Tag>
                )
            case JOB_FAIR_PLAN_STATUS.REJECT:
                return (
                    <Tag color="red">{convertEnumToString(status)}</Tag>
                )
            case JOB_FAIR_PLAN_STATUS.DELETED:
                return (
                    <Tag color="volcano">{convertEnumToString(status)}</Tag>
                )
            default:
                return (
                    <Tag color="orange">{convertEnumToString(status)}</Tag>
                )
        }
    }


    const history = useHistory();
    return (
        <>
            <Card title="Job fair detail" bordered={true} headStyle={{textAlign: 'center'}}
                  style={{width: 750, marginLeft: 300, marginTop: 80}}>
                <Space direction="vertical">
                    <Space size="middle" direction="vertical">
                        <Row>
                            <Col span={24}>
                                <Text strong>Job fair name: </Text>
                                <Text italic>{data.name}</Text>
                            </Col>
                            <Col span={24}>
                                <Text strong>Description: </Text>
                                <Text italic>{data.description}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text strong>Job fair start time: </Text>
                                <Text italic>{data.startTime}</Text>
                            </Col>
                            <Col span={24}>
                                <Text strong>Job fair end time: </Text>
                                <Text italic>{data.endTime}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text strong>Attendant register start time: </Text>
                                <Text italic>{data.attendantRegisterStartTime}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text strong>Company register start time: </Text>
                                <Text italic>{data.companyRegisterStartTime}</Text>
                            </Col>
                            <Col span={24}>
                                <Text strong>Company register end time: </Text>
                                <Text italic>{data.companyRegisterEndTime}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text strong>Company buy booth start time: </Text>
                                <Text italic>{data.companyBuyBoothStartTime}</Text>
                            </Col>
                            <Col span={24}>
                                <Text strong>Company buy booth end time: </Text>
                                <Text italic>{data.companyBuyBoothEndTime}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text strong>Estimated number of participants: </Text>
                                <Text italic>{data.estimateParticipant}</Text>
                            </Col>
                            <Col span={24}>
                                <Text strong>Target company: </Text>
                                <Text italic>{data.targetCompany}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={16}>
                                <Text strong>Target attendant: </Text>
                                <Text italic>{data.targetAttendant}</Text>
                            </Col>
                            <Col span={16}>
                                <Text strong>Total approval company registrations: </Text>
                                <Text italic>{totalApproval}</Text>
                            </Col>
                            <Col span={16}>
                                <Text strong>Total company registrations: </Text>
                                <Text italic>{totalRegistration}</Text>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Text strong>Total booths: </Text>
                                <Text italic>{totalBooth} slot(s)</Text>
                            </Col>
                            <Col span={24}>
                                <Text strong>Status: </Text>
                                {handleStatusTag(data.status)}
                            </Col>
                        </Row>
                    </Space>

                    <Space>
                        {handleButton(data.status)}
                    </Space>
                </Space>
            </Card>
        </>
    );
};

export default JobFairDetailComponent;