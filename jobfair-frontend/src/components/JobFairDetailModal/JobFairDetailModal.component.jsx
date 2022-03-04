import React from 'react';
import {Modal, Typography} from "antd";

const JobFairDetailModalComponent = props => {
    const {isModalVisible, handleOk, handleCancel, item} = props;
    const { Title, Paragraph, Text, Link } = Typography;
    return (
        <>
            <Modal title="Job fair detail" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Text strong>Job fair Id:</Text>
                    <Text>{item?.id}</Text>
                    <Text strong>Description:</Text>
                    <Text>{item?.description}</Text>
                    <Text strong>Status:</Text>
                    <Text>{item?.status}</Text>
                </div>
            </Modal>
        </>
    );
};

export default JobFairDetailModalComponent;