import React from 'react';
import ApprovalRegistrationContainer from "../../containers/ApprovalRegistration/ApprovalRegistration.container";
import {PageHeader, Typography} from 'antd';
import {useHistory} from "react-router-dom";

const {Text} = Typography

const ApprovalRegistrationPage = props => {
  const history = useHistory()
  return (
    <div className="page" style={{marginTop: 80}}>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Company registration page"
        subTitle="For admin to evaluate company registration"
      />
      <ApprovalRegistrationContainer/>
    </div>
  );
};

export default ApprovalRegistrationPage;