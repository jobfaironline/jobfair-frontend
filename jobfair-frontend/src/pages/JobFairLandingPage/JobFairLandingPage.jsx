import { useParams } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import JobFairLandingContainer from '../../containers/JobFairLandingPage/JobFairLanding.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const JobFairLandingPage = () => {
  const { jobFairId } = useParams();
  const query = useQuery();
  return (
    <PageLayoutWrapper className='page fullscreen-page'>
      <JobFairLandingContainer jobFairId={jobFairId} isReview={query.has('review')} />
    </PageLayoutWrapper>
  );
};

export default JobFairLandingPage;
