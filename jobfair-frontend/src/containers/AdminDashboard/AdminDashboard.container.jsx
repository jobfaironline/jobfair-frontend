import './AdminDashboard.container.scss';
import { AdminDashBoardAccountStatistics } from './AdminDashBoardAccountStatistics.component';
import { AdminDashBoardJobFairStatistics } from './AdminDashboardJobFairStatistics.component';
import { Col, PageHeader, Row, Typography, notification } from 'antd';
import { ENDPOINT_ADMIN_STATISTICS } from '../../constants/Endpoints/jobhub-api/StatisticsControllerEndpoint';
import { GenericDonutChart } from '../../components/commons/Chart/GenericDonutChart.component';
import { GenericPieChart } from '../../components/commons/Chart/GenericPieChart.component';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { ProjectFilled } from '@ant-design/icons';
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
      color: '#62daab'
    },
    {
      type: 'In progress',
      value: data.jobFairStatistics.inProgressNum,
      color: '#f6cf32'
    },
    {
      type: 'Incoming',
      value: data.jobFairStatistics.incomingNum,
      color: '#6395f9'
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
      color: '#62daab'
    },
    {
      type: 'Registered',
      value: data.accountStatistics.registeredNum,
      color: '#f6cf32'
    },
    {
      type: 'Inactive',
      value: data.accountStatistics.inactiveNum,
      color: '#6395f9'
    },
    {
      type: 'Suspended',
      value: data.accountStatistics.suspendedNum,
      color: '#f34b49'
    }
  ];
  const accountStatusChartColorMapping = ({ type }) =>
    accountStatusChartData.find((category) => category.type === type).color;

  const accountRatioChartData = [
    {
      type: 'Attendant',
      value: data.accountStatistics.attendantNum,
      color: '#6395f9'
    },
    {
      type: 'Company manager',
      value: data.accountStatistics.companyManagerNum,
      color: '#62daab'
    },
    {
      type: 'Employee',
      value: data.accountStatistics.companyEmployeeNum,
      color: '#f34b49'
    }
  ];
  const accountRatioChartColorMapping = ({ type }) =>
    accountRatioChartData.find((category) => category.type === type).color;

  return (
    <div style={{ marginBottom: '2rem' }} className={'admin-dashboard-container'}>
      <PageHeader
        title={
          <div
            style={{
              width: '30vw',
              paddingBottom: '0.5rem',
              borderBottom: '1.5px solid #00000026',
              fontWeight: 500,
              fontSize: '2rem'
            }}>
            <ProjectFilled style={{ marginRight: '5px' }} />
            Admin dashboard
          </div>
        }
      />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ position: 'fixed', left: '2%', top: '100px' }}>
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
                title={'Job fair statistics'}
              />
            </Col>
          </Row>
          <Title level={3} id={'account-company-statistic'}>
            Account and company statistic
          </Title>
          <AdminDashBoardAccountStatistics
            data={{
              attendantNum: 195,
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
