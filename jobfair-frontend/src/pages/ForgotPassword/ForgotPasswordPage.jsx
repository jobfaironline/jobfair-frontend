import ForgotPasswordFormContainer from '../../containers/forms/ForgotPasswordForm/ForgotPasswordForm.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const ForgotPasswordPage = () => (
  <PageLayoutWrapper className='page'>
    <ForgotPasswordFormContainer />
  </PageLayoutWrapper>
);
export default ForgotPasswordPage;
