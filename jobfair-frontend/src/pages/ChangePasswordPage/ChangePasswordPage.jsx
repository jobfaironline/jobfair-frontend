import { PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import ChangePasswordFormContainer from '../../containers/forms/ChangePasswordForm/ChangePasswordForm.container';
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
      <ChangePasswordFormContainer />
    </div>
  );
};

export default ChangePasswordPage;
