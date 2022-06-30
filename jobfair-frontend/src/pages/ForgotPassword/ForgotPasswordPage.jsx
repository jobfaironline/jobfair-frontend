import ForgotPasswordFormContainer from '../../containers/forms/ForgotPasswordForm/ForgotPasswordForm.container';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const ForgotPasswordPage = () => (
  <PageLayoutWrapper className='page'>
    <ForgotPasswordFormContainer />
  </PageLayoutWrapper>
);
export default ForgotPasswordPage;
