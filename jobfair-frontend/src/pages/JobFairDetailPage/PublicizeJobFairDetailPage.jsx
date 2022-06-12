import { PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import React from 'react';

const PublicizeJobFairDetailPage = () => {
  const history = useHistory();
  //TODO: temporary disable
  /*const role = useSelector((state) => state.authentication.user.roles);*/
  return (
    <div className='page' style={{ marginTop: 50 }}>
      <PageHeader className='site-page-header' onBack={() => history.goBack()} title='Job fair detail' subTitle='' />
      {/*<PublicizedJobFairDetailContainer id={jobFairId} role={role} />*/}
    </div>
  );
};

export default PublicizeJobFairDetailPage;
