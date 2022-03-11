import React from 'react';
import ApprovalRegistrationContainer from "../../containers/ApprovalRegistration/ApprovalRegistration.container";
import {Breadcrumb, Divider, PageHeader, Typography} from 'antd';
import {HomeOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useHistory} from "react-router-dom";

const {Text, Title} = Typography

const ApprovalRegistrationPage = props => {
    const history = useHistory()
    return (
        <div className="page" style={{marginTop: 80}}>
            <PageHeader
                className="site-page-header"
                onBack={() => history.goBack()}
                title="Company registrations"
                subTitle=""
            />
            <ApprovalRegistrationContainer />
        </div>
    );
};

export default ApprovalRegistrationPage;