import { Card, Col, Divider, Row, Typography } from 'antd';
import { GenericPieChart } from '../../../commons/Chart/GenericPieChart.component';
import React from 'react';

const { Title } = Typography;

export const CompanyCVStatistics = ({ data }) => {
  const {
    pendingCvNum = 0,
    approvedCvNum = 0,
    rejectedCvNum = 0,
    cvNum = 0,
    interviewNum = 0,
    doneInterviewNum = 0
  } = data;

  const cvStatusChartData = [
    {
      type: 'Pending',
      value: pendingCvNum,
      color: '#6395f9'
    },
    {
      type: 'Approve',
      value: approvedCvNum,
      color: '#62daab'
    },
    {
      type: 'Reject',
      value: rejectedCvNum,
      color: '#f34b49'
    }
  ];
  const cvChartColorMapping = ({ type }) => cvStatusChartData.find((category) => category.type === type).color;

  const interviewStatusChartData = [
    {
      type: 'Interviewing',
      value: interviewNum - doneInterviewNum,
      color: '#6395f9'
    },
    {
      type: 'Interviewed',
      value: doneInterviewNum,
      color: '#62daab'
    }
  ];

  const interviewStatusChartMapping = ({ type }) =>
    interviewStatusChartData.find((category) => category.type === type).color;

  return (
    <>
      <Card style={{ borderRadius: '10px' }} bodyStyle={{ paddingTop: '12px' }}>
        <Row>
          <Col span={12}>
            <Title level={3} style={{ fontWeight: 700 }}>
              Number of submitted CV: <span style={{ fontWeight: '400' }}>{cvNum}</span>
            </Title>
          </Col>
          <Col span={12}>
            <Title level={3} style={{ fontWeight: 700 }}>
              Interview ratio:{' '}
              <span style={{ fontWeight: '400' }}>{cvNum === 0 ? '0%' : `${(interviewNum / cvNum).toFixed(2)}%`}</span>
            </Title>
          </Col>
        </Row>
        <Divider style={{ margin: '12px 0' }} />
        <Row gutter={10}>
          <Col span={12}>
            <GenericPieChart data={cvStatusChartData} config={{ color: cvChartColorMapping }} title={'CV status'} />
          </Col>
          <Col span={12}>
            <GenericPieChart
              data={interviewStatusChartData}
              config={{ color: interviewStatusChartMapping }}
              title={'Interview status'}
            />
          </Col>
        </Row>
      </Card>
    </>
  );
};
