import { useParams } from 'react-router-dom';
import { useQuery } from '../../hooks/useQuery';
import JobFairLandingContainer from '../../containers/JobFairLandingPage/JobFairLanding.container';
import React from 'react';

const JobFairLandingPage = () => {
  const { jobFairId } = useParams();
  const query = useQuery();
  return (
    <div className='page fullscreen-page'>
      <JobFairLandingContainer jobFairId={jobFairId} isReview={query.has('review')} />
    </div>
  );
};

export default JobFairLandingPage;
