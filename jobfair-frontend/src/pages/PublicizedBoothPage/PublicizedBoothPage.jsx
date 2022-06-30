import { useParams } from 'react-router-dom';
import JobFairParkMapContainer from '../../containers/3D/JobFairParkMap/JobFairParkMap.container';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const PublicizedBoothPage = () => {
  const { jobFairId } = useParams();
  return (
    <PageLayoutWrapper className={'page fullscreen-page'}>
      <JobFairParkMapContainer jobFairId={jobFairId} />
    </PageLayoutWrapper>
  );
};

export default PublicizedBoothPage;
