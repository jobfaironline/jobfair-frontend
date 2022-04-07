import { PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import ChangePasswordContainer from '../../containers/ChangePassword/ChangePassword.container';
import React from 'react';

const ChangePasswordPage = () => {
  const history = useHistory();
  return (
    <div className='page' style={{ marginTop: 80 }}>
      <PageHeader
        className='site-page-header'
        onBack={() => history.goBack()}
        title='Change your password'
        subTitle=''
      />
      <ChangePasswordContainer />
    </div>
  );
};

export default ChangePasswordPage;
