import { AdminDashBoardAccountStatistics } from './AdminDashBoardAccountStatistics.component';
import { AdminDashBoardJobFairStatistics } from './AdminDashboardJobFairStatistics.component';
import { Col, PageHeader, Row, Typography, notification } from 'antd';
import { ENDPOINT_ADMIN_STATISTICS } from '../../constants/Endpoints/jobhub-api/StatisticsControllerEndpoint';
import { GenericDonutChart } from '../../components/commons/Chart/GenericDonutChart.component';
import { GenericPieChart } from '../../components/commons/Chart/GenericPieChart.component';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { useSWRFetch } from '../../hooks/useSWRFetch';
import AnchorComponent from '../../components/commons/Anchor/Achor.component';
import React from 'react';
import UserAccessTimelineChartContainer from './UserAccessTimelineChart.container';

const { Title } = Typography;

const formTitles = [
  { title: 'Job fair statistic', href: '#jobfair-statistics' },
  { title: 'Account and company statistic', href: '#account-company-statistic' }
];

const AdminDashBoardContainer = () => {
  //TODO: fetch api later

  const { response, isLoading, isError } = useSWRFetch(`${ENDPOINT_ADMIN_STATISTICS}`, 'GET');

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

  const jobfairStatusChartData = [
    {
      type: 'Finished',
      value: data.jobFairStatistics.pastNum,
      color: 'green'
    },
    {
      type: 'In progress',
      value: data.jobFairStatistics.inProgressNum,
      color: 'gold'
    },
    {
      type: 'Incoming',
      value: data.jobFairStatistics.incomingNum,
      color: 'gray'
    }
  ];

  const jobfairStatusColorMapping = ({ type }) =>
    jobfairStatusChartData.find((category) => category.type === type).color;

  const jobfairChartConfig = {
    defaultTitle: 'Total',
    defaultValue: `${
      data.jobFairStatistics.pastNum + data.jobFairStatistics.inProgressNum + data.jobFairStatistics.incomingNum
    } Job fair(s)`,
    contentSuffix: ' Job fair(s)',
    color: jobfairStatusColorMapping,
    width: 450,
    height: 450
  };

  const accountStatusChartData = [
    {
      type: 'Verified',
      value: data.accountStatistics.verifiedNum,
      color: 'green'
    },
    {
      type: 'Registered',
      value: data.accountStatistics.registeredNum,
      color: 'yellow'
    },
    {
      type: 'Inactive',
      value: data.accountStatistics.inactiveNum,
      color: 'blue'
    },
    {
      type: 'Suspended',
      value: data.accountStatistics.suspendedNum,
      color: 'red'
    }
  ];
  const accountStatusChartColorMapping = ({ type }) =>
    accountStatusChartData.find((category) => category.type === type).color;

  const accountRatioChartData = [
    {
      type: 'Attendant',
      value: data.accountStatistics.attendantNum,
      color: 'green'
    },
    {
      type: 'Company manager',
      value: data.accountStatistics.companyManagerNum,
      color: 'yellow'
    },
    {
      type: 'Employee',
      value: data.accountStatistics.companyEmployeeNum,
      color: 'red'
    }
  ];
  const accountRatioChartColorMapping = ({ type }) =>
    accountRatioChartData.find((category) => category.type === type).color;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <PageHeader
        title={
          <div
            id={'admin-dashboard'}
            style={{ width: '20vw', paddingBottom: '0.5rem', borderBottom: '1.5px solid #00000026' }}>
            <span style={{ fontWeight: 400 }}>Admin dashboard</span>
          </div>
        }
      />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ position: 'fixed', left: '2%' }}>
          <AnchorComponent listData={formTitles} href={'#admin-dashboard'} title={'Admin dashboard'} />
        </div>
        <div style={{ flex: 1, marginLeft: '13%' }}>
          <Title level={3} id={'jobfair-statistics'}>
            Job fair statistics
          </Title>
          <Row gutter={[16, 16]}>
            <AdminDashBoardJobFairStatistics data={data.jobFairStatistics} />
          </Row>
          <Row gutter={[16, 16]} style={{ padding: '3rem 0rem' }} align='middle'>
            <Col span={14}>
              <UserAccessTimelineChartContainer />
            </Col>
            <Col span={10}>
              <GenericDonutChart
                data={jobfairStatusChartData}
                config={jobfairChartConfig}
                title={'Jobfair statistics'}
              />
            </Col>
          </Row>
          <Title level={3} id={'account-company-statistic'}>
            Account and company statistic
          </Title>
          <AdminDashBoardAccountStatistics
            data={{
              attendantNum: data.accountStatistics.attendantNum,
              companyNum: data.generalStatistics.companyNum,
              accountNum:
                data.accountStatistics.inactiveNum +
                data.accountStatistics.registeredNum +
                data.accountStatistics.suspendedNum +
                data.accountStatistics.verifiedNum
            }}
          />
          <Row gutter={16} align={'middle'}>
            <Col span={12}>
              <GenericPieChart
                data={accountStatusChartData}
                config={{ color: accountStatusChartColorMapping }}
                title={'Account status'}
              />
            </Col>
            <Col span={12}>
              <GenericPieChart
                data={accountRatioChartData}
                config={{ color: accountRatioChartColorMapping }}
                title={'Role ratio'}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoardContainer;
