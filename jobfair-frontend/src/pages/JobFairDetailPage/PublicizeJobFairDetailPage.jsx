import { PageHeader } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicizedJobFairDetailContainer from '../../containers/JobFairDetail/PublicizedJobFairDetail.container';
import React from 'react';

const PublicizeJobFairDetailPage = () => {
  const location = useLocation();
  const jobFairId = location.state.jobFairId;
  const history = useHistory();
  const role = useSelector((state) => state.authentication.user.roles);

  return (
    <div className='page' style={{ marginTop: 50 }}>
      <PageHeader className='site-page-header' onBack={() => history.goBack()} title='Job fair detail' subTitle='' />
      <PublicizedJobFairDetailContainer id={jobFairId} role={role} />
    </div>
  );
};

export default PublicizeJobFairDetailPage;
