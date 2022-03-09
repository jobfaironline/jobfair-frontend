import React from 'react';
import ApprovalRegistrationContainer from "../../containers/ApprovalRegistration/ApprovalRegistration.container";
import {Breadcrumb, Divider, Typography} from 'antd';
import {HomeOutlined, UnorderedListOutlined} from "@ant-design/icons";

const {Text} = Typography

const ApprovalRegistrationPage = props => {
    return (
        <div className="page" style={{marginTop: 80}}>
            <Divider orientation="center" plain>
                <Text strong>Evaluate company registration</Text>
            </Divider>
            <ApprovalRegistrationContainer />
        </div>
    );
};

export default ApprovalRegistrationPage;