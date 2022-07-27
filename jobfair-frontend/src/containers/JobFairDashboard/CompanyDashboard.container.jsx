import { Col, PageHeader, Row, notification } from 'antd';
import { CompanyCVStatistics } from '../../components/customized-components/JobFairDashboard/company/CompanyCVStatistics.component';
import { CompanyDashBoardGeneralInformation } from '../../components/customized-components/JobFairDashboard/company/CompanyDashBoardGeneralInformation.component';
import { CompanyDashBoardJobFairTable } from '../../components/customized-components/JobFairDashboard/company/CompanyDashBoardJobFairTable.component';
import { DashBoardJobPositionStatistics } from '../../components/customized-components/JobFairDashboard/DashBoardJobPositionStatistics.component';
import { ENDPOINT_COMPANY_STATISTICS } from '../../constants/Endpoints/jobhub-api/StatisticsControllerEndpoint';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { useSWRFetch } from '../../hooks/useSWRFetch';
import React from 'react';

export const CompanyDashboardContainer = () => {
  const { response, isLoading, isError } = useSWRFetch(ENDPOINT_COMPANY_STATISTICS, 'GET');

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
        title={
          <div style={{ width: '20vw', paddingBottom: '0.5rem', borderBottom: '1.5px solid #00000026' }}>
            Job fairs statistics for <span style={{ fontWeight: 400 }}>{data.generalStatistics.companyName}</span>
          </div>
        }
      />
      <CompanyDashBoardGeneralInformation data={data.generalStatistics} />
      <Row gutter={20} style={{ marginTop: '1rem' }}>
        <Col xs={24} xxl={12}>
          <CompanyCVStatistics data={data.cvStatistics} />
        </Col>
        <Col xs={24} xxl={12}>
          <DashBoardJobPositionStatistics data={data.jobPositions} />
        </Col>
      </Row>
      <div style={{ marginTop: '1rem' }}>
        <CompanyDashBoardJobFairTable data={data.jobFairs} />
      </div>
    </div>
  );
};
