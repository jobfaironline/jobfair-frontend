import React from 'react';
import ApprovalRegistrationContainer from "../../containers/ApprovalRegistration/ApprovalRegistration.container";
import {Breadcrumb, Divider} from 'antd';
import {HomeOutlined, UnorderedListOutlined} from "@ant-design/icons";


const ApprovalRegistrationPage = props => {
    return (
        <>
            <Divider orientation="center" plain>
                Evaluate company registration
            </Divider>
            <Breadcrumb>
                <Breadcrumb.Item href="/">
                    <HomeOutlined/>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/job-fair">
                    <UnorderedListOutlined/>
                    <span>Job fair list</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span>Evaluate company registration</span>
                </Breadcrumb.Item>
            </Breadcrumb>,
            <ApprovalRegistrationContainer/>
        </>
    );
};

export default ApprovalRegistrationPage;