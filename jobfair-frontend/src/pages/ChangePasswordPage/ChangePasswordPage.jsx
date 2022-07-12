import { PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import ChangePasswordFormContainer from '../../containers/forms/ChangePasswordForm/ChangePasswordForm.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const ChangePasswordPage = () => {
  const history = useHistory();
  return (
    <PageLayoutWrapper className='page' style={{ marginTop: 80 }}>
      <PageHeader
        className='site-page-header'
        onBack={() => history.goBack()}
        title='Change your password'
        subTitle=''
      />
      <ChangePasswordFormContainer />
    </PageLayoutWrapper>
  );
};

export default ChangePasswordPage;
