import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Col, Divider, Empty, Modal, Row, Space, Typography} from "antd";

const CompanyRegistrationDetailModalComponent = ({...componentProps}) => {

    console.log(componentProps)
    const {...result} = componentProps.data ? componentProps.data : {};
    const {Text} = Typography;

    return (
        <>
            <Modal title="Registration Detail" visible={componentProps.visible} onOk={componentProps.onOk}
                   onCancel={componentProps.onCancel}>
                <Space size="middle" direction="vertical">
                    <Row>
                        <Col span={24}>
                            <Text strong>ID: </Text>
                            <Text italic>{result.id}</Text>
                        </Col>
                        <Col span={24}>
                            <Text strong>Create date: </Text>
                            <Text italic>{result.createDate}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Text strong>Description: </Text>
                            <Text italic>{result.description}</Text>
                        </Col>
                        <Col span={24}>
                            <Text strong>Company name: </Text>
                            <Text italic>{result.companyName}</Text>
                        </Col>
                    </Row>
                    <Divider plain orientation="center">
                        <Text>Job position registered </Text>
                    </Divider>
                    {/*{result.registrationJobPositions?.map((item, index) => (*/}
                    {/*    <div key={index}>*/}
                    {/*        <Text strong>{`Job position No.${index}`}</Text>*/}
                    {/*        <Row>*/}
                    {/*            <Col span={24}>*/}
                    {/*                <Text strong>Description: </Text>*/}
                    {/*                <Text italic>{item.description}</Text>*/}
                    {/*            </Col>*/}
                    {/*        </Row>*/}
                    {/*        <Row>*/}
                    {/*            <Col span={24}>*/}
                    {/*                <Text strong>Requirements: </Text>*/}
                    {/*                <Text italic>{item.requirements}</Text>*/}
                    {/*            </Col>*/}
                    {/*        </Row>*/}
                    {/*        <Row>*/}
                    {/*            <Col span={24}>*/}
                    {/*                <Text strong>Person contact information (full name/email): </Text>*/}
                    {/*                <Text italic>{`${item.contactPersonName}/${item.contactEmail}`}</Text>*/}
                    {/*            </Col>*/}
                    {/*        </Row>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </Space>
            </Modal>
        </>
    );
};


export default CompanyRegistrationDetailModalComponent;