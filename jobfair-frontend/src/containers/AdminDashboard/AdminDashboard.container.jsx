import { AdminDashBoardGeneralInformation } from './AdminDashboardGeneralInformation.component';
import { Col, PageHeader, Row } from 'antd';
import { GenericDonutChart } from '../../components/commons/Chart/GenericDonutChart.component';
import React from 'react';
import UserAccessTimelineChartContainer from './UserAccessTimelineChart.container';

const AdminDashBoardContainer = () => {
  //TODO: fetch api later

  const jobfairStatusChartData = [
    {
      type: 'Canceled',
      value: 30,
      color: '#62daab'
    },
    {
      type: 'Finished',
      value: 20,
      color: 'rgba(253,216,14,0.87)'
    },
    {
      type: 'In progress',
      value: 40,
      color: '#f34b49'
    },
    {
      type: 'Incoming',
      value: 10,
      color: '#096dd9'
    }
  ];

  const jobfairStatusColorMapping = ({ type }) =>
    jobfairStatusChartData.find((category) => category.type === type).color;

  const jobfairChartConfig = {
    defaultTitle: 'Total',
    defaultValue: `${(1 * 100).toFixed(0)}%`,
    contentSuffix: ' Jobfair(s)',
    color: jobfairStatusColorMapping,
    width: 450,
    height: 450
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <PageHeader
        style={{ padding: '0.5rem 0' }}
        title={
          <div style={{ width: '20vw', paddingBottom: '0.5rem', borderBottom: '1.5px solid #00000026' }}>
            <span style={{ fontWeight: 400 }}>Admin dashboard</span>
          </div>
        }
      />
      <Row gutter={[16, 16]}>
        <AdminDashBoardGeneralInformation data={{ companyNum: 1000, userNum: 1000 }} />
      </Row>
      <Row gutter={[16, 16]} style={{ padding: '3rem 0rem' }} align='middle'>
        <Col span={14}>
          <UserAccessTimelineChartContainer />
        </Col>
        <Col span={10}>
          <GenericDonutChart data={jobfairStatusChartData} config={jobfairChartConfig} title={'Jobfair statistics'} />
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashBoardContainer;
