import { evaluateJobFairRegistrationAPI } from '../../services/jobhub-api/CompanyRegistrationControllerService';
import { notification } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import CompanyRegistrationDetailComponent from '../../components/customized-components/CompanyRegistrationDetail/CompanyRegistrationDetail.component';
import React from 'react';

const CompanyRegistrationDetailContainer = () => {
  const location = useLocation();
  const companyRegistration = location.state.companyRegistration;
  const history = useHistory();

  const onFinish = (values) => {
    evaluateJobFairRegistrationAPI(values)
      .then(() => {
        notification['success']({
          message: `Submit evaluation successfully`,
          description: `Your evaluation has been submitted`,
          duration: 2
        });
        history.goBack();
      })
      .catch(() => {
        notification['error']({
          message: `Submit evaluation failed`,
          description: `There is problem while submitting, try again later`,
          duration: 2
        });
      });
  };

  return (
    <>
      <CompanyRegistrationDetailComponent data={companyRegistration} onFinish={onFinish} />
    </>
  );
};

export default CompanyRegistrationDetailContainer;
