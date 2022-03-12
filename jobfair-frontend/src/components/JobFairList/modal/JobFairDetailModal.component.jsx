import React from 'react';
import {Col, Divider, Modal, Row, Space, Typography} from "antd";
import JobFairDetailComponent from "../../JobFairDetail/JobFairDetail.component";

const JobFairDetailModalComponent = (props) => {
    const {
        data,
        visible,
        onOk,
        onCancel,
        onFinish,
        totalRegistration,
        totalBooth,
        totalApproval
    } = props
    const {...result} = data ? data : {};
    const {Text} = Typography;
    return (
        <>
            <Modal title="Job Fair Detail"
                   visible={visible} onOk={onOk}
                   onCancel={onCancel}>
                <JobFairDetailComponent
                    data={data}
                    onFinish={onFinish}
                    totalRegistration={totalRegistration}
                    totalBooth={totalBooth}
                    totalApproval={totalApproval}
                    />
                <Col span={24}>
                    <Text strong>Creator Information: </Text>
                    <Text italic>{result.creatorInfo}</Text>
                </Col>
            </Modal>
        </>
    );
};

export default JobFairDetailModalComponent;