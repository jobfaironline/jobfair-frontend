import React from 'react';
import ChangePasswordContainer from "../../containers/ChangePassword/ChangePassword.container";
import {PageHeader} from "antd";
import {useHistory} from "react-router-dom";

const ChangePasswordPage = () => {
  const history = useHistory()
  return (
    <div className="page" style={{marginTop: 80}}>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Change your password"
        subTitle=""
      />
      <ChangePasswordContainer/>
    </div>
  );
};

export default ChangePasswordPage;