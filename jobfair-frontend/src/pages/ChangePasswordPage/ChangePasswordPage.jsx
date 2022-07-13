import ChangePasswordFormContainer from '../../containers/forms/ChangePasswordForm/ChangePasswordForm.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const ChangePasswordPage = () => (
  <PageLayoutWrapper className='page'>
    <ChangePasswordFormContainer />
  </PageLayoutWrapper>
);

export default ChangePasswordPage;
