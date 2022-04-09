import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import JobFairParkMapContainer from '../../containers/3D/JobFairParkMap/JobFairParkMap.container';
import React from 'react';

const PublicizedBoothPage = () => {
  const { jobFairId } = useParams();
  return (
    <div className={'page'}>
      <JobFairParkMapContainer jobFairId={jobFairId} />
      <ToastContainer />
    </div>
  );
};

export default PublicizedBoothPage;
