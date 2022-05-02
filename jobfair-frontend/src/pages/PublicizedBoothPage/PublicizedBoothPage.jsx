import { useParams } from 'react-router-dom';
import JobFairParkMapContainer from '../../containers/3D/JobFairParkMap/JobFairParkMap.container';
import React from 'react';

const PublicizedBoothPage = () => {
  const { jobFairId } = useParams();
  return (
    <div className={'page fullscreen-page'}>
      <JobFairParkMapContainer jobFairId={jobFairId} />
    </div>
  );
};

export default PublicizedBoothPage;
