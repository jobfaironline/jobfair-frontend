import { useParams } from 'react-router-dom';
import JobFairDashBoardContainer from '../../containers/JobFairDashboard/JobFairDashBoard.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const JobFairDashboardPage = () => {
  const { jobFairId } = useParams();
  return (
    <PageLayoutWrapper className='page'>
      <JobFairDashBoardContainer jobFairId={jobFairId} />
    </PageLayoutWrapper>
  );
};

export default JobFairDashboardPage;
