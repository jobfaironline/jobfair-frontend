import { Col, PageHeader, Row, notification } from 'antd';
import { DashBoardJobPositionStatistics } from '../../components/customized-components/JobFairDashboard/DashBoardJobPositionStatistics.component';
import { DashboardCVStatistics } from '../../components/customized-components/JobFairDashboard/DashboardCVStatistics.component';
import { ENDPOINT_JOB_FAIR_STATISTICS } from '../../constants/Endpoints/jobhub-api/StatisticsControllerEndpoint';
import { JobFairDashBoardBoothTable } from '../../components/customized-components/JobFairDashboard/JobFairDashboardBoothTable.component';
import { JobFairDashBoardGeneralInformation } from '../../components/customized-components/JobFairDashboard/JobFairDashboardGeneralInformation.component';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { generatePath } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useSWRFetch } from '../../hooks/useSWRFetch';
import React from 'react';

const JobFairDashBoardContainer = ({ jobFairId }) => {
  const history = useHistory();

  const { response, isLoading, isError } = useSWRFetch(`${ENDPOINT_JOB_FAIR_STATISTICS}/${jobFairId}`, 'GET');

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

  return (
    <div style={{ marginBottom: '2rem' }}>
      <PageHeader
        onBack={() => {
          const url = generatePath(PATH_COMPANY_MANAGER.CHECKLIST, { jobFairId });
          history.push(url);
        }}
        title={
          <div style={{ width: '20vw', paddingBottom: '0.5rem', borderBottom: '1.5px solid #00000026' }}>
            Job fair's name: <span style={{ fontWeight: 400 }}>{data.jobFair.name}</span>
          </div>
        }
      />
      <JobFairDashBoardGeneralInformation data={data.generalStatistics} />
      <Row gutter={20} style={{ marginTop: '1rem' }}>
        <Col xs={24} xxl={12}>
          <DashboardCVStatistics data={data.cvStatistics} />
        </Col>
        <Col xs={24} xxl={12}>
          <DashBoardJobPositionStatistics data={data.jobPositions} />
        </Col>
      </Row>
      <div style={{ marginTop: '1rem' }}>
        <JobFairDashBoardBoothTable data={data.booths} />
      </div>
    </div>
  );
};

export default JobFairDashBoardContainer;
