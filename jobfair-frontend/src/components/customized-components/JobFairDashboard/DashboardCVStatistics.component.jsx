import { Button, Card, Col, Divider, Row, Typography } from 'antd';
import { GenericDonutChart } from '../../commons/Chart/GenericDonutChart.component';
import { GenericPieChart } from '../../commons/Chart/GenericPieChart.component';
import React from 'react';

const { Title } = Typography;

export const DashboardCVStatistics = ({ data, isBooth = true, openModal }) => {
  const {
    pendingNum = 0,
    approvedNum = 0,
    rejectNum = 0,
    matchingRange = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    matchingAverage = 0
  } = data;

  const cvStatusChartData = [
    {
      type: 'Pending',
      value: pendingNum,
      color: '#6395f9'
    },
    {
      type: 'Approve',
      value: approvedNum,
      color: '#62daab'
    },
    {
      type: 'Reject',
      value: rejectNum,
      color: '#f34b49'
    }
  ];
  const cvChartColorMapping = ({ type }) => cvStatusChartData.find((category) => category.type === type).color;

  const cvMatchingChartData = [
    {
      type: 'High (>70%)',
      value: matchingRange[7] + matchingRange[8] + matchingRange[9],
      color: '#62daab'
    },
    {
      type: 'Medium (>50%)',
      value: matchingRange[5] + matchingRange[6],
      color: 'rgba(253,216,14,0.87)'
    },
    {
      type: 'Low (<50%)',
      value: matchingRange[0] + matchingRange[1] + matchingRange[2] + matchingRange[3] + matchingRange[4],
      color: '#f34b49'
    }
  ];
  const matchingPointColorMapping = ({ type }) => cvMatchingChartData.find((category) => category.type === type).color;

  const cvMatchingChartConfig = {
    defaultTitle: 'Average point',
    defaultValue: `${(matchingAverage * 100).toFixed(0)}%`,
    contentSuffix: ' CV(s)',
    color: matchingPointColorMapping
  };

  return (
    <>
      <Card style={{ borderRadius: '10px' }} bodyStyle={{ paddingTop: '12px' }}>
        <div style={{ display: 'flex', marginBottom: '1.2rem' }}>
          <Title level={3} style={{ fontWeight: 700, margin: 0 }}>
            Number of submitted CV:{' '}
            <span style={{ fontWeight: '400', marginLeft: '1rem' }}>{pendingNum + approvedNum + rejectNum}</span>
          </Title>
          <Button
            type={'primary'}
            className={'button'}
            style={{ marginLeft: 'auto', display: isBooth ? 'none' : 'block' }}
            onClick={openModal}>
            View CV lists
          </Button>
        </div>

        <Divider style={{ margin: '12px 0' }} />
        <Row gutter={10}>
          <Col span={12}>
            <GenericPieChart data={cvStatusChartData} config={{ color: cvChartColorMapping }} title={'CV STATUS'} />
          </Col>
          <Col span={12}>
            <GenericDonutChart data={cvMatchingChartData} config={cvMatchingChartConfig} title={'CV MATCHING RATIO'} />
          </Col>
        </Row>
      </Card>
    </>
  );
};
