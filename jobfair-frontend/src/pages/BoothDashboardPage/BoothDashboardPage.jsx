import { useParams } from 'react-router-dom';
import BoothDashBoardContainer from '../../containers/JobFairDashboard/BoothDashBoard.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const BoothDashboardPage = () => {
  const { boothId } = useParams();
  return (
    <PageLayoutWrapper className='page'>
      <BoothDashBoardContainer boothId={boothId} />
    </PageLayoutWrapper>
  );
};

export default BoothDashboardPage;
