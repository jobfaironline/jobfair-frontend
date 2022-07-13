import { useSelector } from 'react-redux';
import JobFairGridPublicContainer from '../../containers/JobFairList/public/JobFairGridPublicContainer';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const JobFairListPage = () => {
  const role = useSelector((state) => state.authentication.user.roles);

  return (
    <PageLayoutWrapper className='page'>
      <JobFairGridPublicContainer role={role} />
    </PageLayoutWrapper>
  );
};

export default JobFairListPage;
