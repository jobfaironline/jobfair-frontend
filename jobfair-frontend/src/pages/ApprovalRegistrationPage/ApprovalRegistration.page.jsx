import React from 'react';
import ApprovalRegistrationContainer from "../../containers/ApprovalRegistration/ApprovalRegistration.container";
import {Breadcrumb, Divider} from 'antd';
import {HomeOutlined, UnorderedListOutlined} from "@ant-design/icons";


const ApprovalRegistrationPage = props => {
    return (
        <div className="page">
            <Divider orientation="center" plain>
                Evaluate company registration
            </Divider>
            <ApprovalRegistrationContainer />
        </div>
    );
};

export default ApprovalRegistrationPage;