import React from 'react';
import {Col, Divider, Modal, Row, Space, Typography} from "antd";

const JobFairDetailModalComponent = ({data, visible, onOk, onCancel}) => {
    const {...result} = data ? data : {};
    const {Text} = Typography;
    return (
        <>
            <Modal title="Job Fair Detail" visible={visible} onOk={onOk}
                   onCancel={onCancel}>
                <Space size="middle" direction="vertical">
                    <Row>
                        <Col span={24}>
                            <Text strong>ID: </Text>
                            <Text italic>{result.id}</Text>
                        </Col>
                        <Col span={24}>
                            <Text strong>Description: </Text>
                            <Text italic>{result.description}</Text>
                        </Col>

                    </Row>
                    <Row>
                        <Col span={24}>
                            <Text strong>Attendant register start time: </Text>
                            <Text italic>{result.attendantRegisterStartTime}</Text>
                        </Col>
                        <Col span={24}>
                            <Text strong>Attendant register end time: </Text>
                            <Text italic>{result.attendantRegisterEndTime}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Text strong>Company register start time: </Text>
                            <Text italic>{result.companyRegisterStartTime}</Text>
                        </Col>
                        <Col span={24}>
                            <Text strong>Company register end time: </Text>
                            <Text italic>{result.companyRegisterEndTime}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Text strong>Company buy booth start time: </Text>
                            <Text italic>{result.companyBuyBoothStartTime}</Text>
                        </Col>
                        <Col span={24}>
                            <Text strong>Company buy booth end time: </Text>
                            <Text italic>{result.companyBuyBoothEndTime}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Text strong>Creator Information: </Text>
                            <Text italic>{result.creatorInfo}</Text>
                        </Col>
                    </Row>
                </Space>
            </Modal>
        </>
    );
};

export default JobFairDetailModalComponent;