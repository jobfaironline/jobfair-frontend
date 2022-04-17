import { PageHeader } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import PublishJobFairContainer from '../../containers/PublishJobFairContainer/PublishJobFair.container';
import React from 'react';

const PublicizeJobFairDetailPage = () => {
  const location = useLocation();
  const jobFairId = location.state.jobFairId;
  const history = useHistory();
  //TODO: temporary disable
  /*const role = useSelector((state) => state.authentication.user.roles);*/
  return (
    <div className='page' style={{ marginTop: 50 }}>
      <PageHeader className='site-page-header' onBack={() => history.goBack()} title='Job fair detail' subTitle='' />
      <PublishJobFairContainer jobFairId={jobFairId} />
      {/*<PublicizedJobFairDetailContainer id={jobFairId} role={role} />*/}
    </div>
  );
};

export default PublicizeJobFairDetailPage;
