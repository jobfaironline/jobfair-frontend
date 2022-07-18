import { Col, PageHeader, Row, notification } from 'antd';
import { DashBoardJobPositionStatistics } from '../../components/customized-components/JobFairDashboard/DashBoardJobPositionStatistics.component';
import { DashboardCVStatistics } from '../../components/customized-components/JobFairDashboard/DashboardCVStatistics.component';
import { ENDPOINT_BOOTH_STATISTICS } from '../../constants/Endpoints/jobhub-api/StatisticsControllerEndpoint';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { useSWRFetch } from '../../hooks/useSWRFetch';
import React from 'react';

const BoothDashBoardContainer = ({ boothId }) => {
  const { response, isLoading, isError } = useSWRFetch(`${ENDPOINT_BOOTH_STATISTICS}/${boothId}`);
  if (isLoading) return <LoadingComponent isWholePage={true} />;
  if (isError) {
    notification['error']({
      message: `Something went wrong! Try again latter!`,
      description: `There is problem while fetching data, try again later`,
      duration: 2
    });
    return null;
  }
  const data = response.data;

  if (data === undefined) return <LoadingComponent isWholePage={true} />;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <PageHeader
        title={
          <div style={{ width: '20vw', paddingBottom: '0.5rem', borderBottom: '1.5px solid #00000026' }}>
            Booth's name: <span style={{ fontWeight: 400 }}>{data.booth.name}</span>
          </div>
        }
      />
      <Row gutter={20} style={{ marginTop: '1rem' }}>
        <Col xs={24} xxl={12}>
          <DashboardCVStatistics data={data.cvStatistics} />
        </Col>
        <Col xs={24} xxl={12}>
          <DashBoardJobPositionStatistics data={data.jobPositions} />
        </Col>
      </Row>
    </div>
  );
};

export default BoothDashBoardContainer;
