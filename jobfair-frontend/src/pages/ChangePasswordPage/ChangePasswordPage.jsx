import ChangePasswordFormContainer from '../../containers/forms/ChangePasswordForm/ChangePasswordForm.container';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const ChangePasswordPage = () => (
  <PageLayoutWrapper className='page'>
    <ChangePasswordFormContainer />
  </PageLayoutWrapper>
);

export default ChangePasswordPage;
