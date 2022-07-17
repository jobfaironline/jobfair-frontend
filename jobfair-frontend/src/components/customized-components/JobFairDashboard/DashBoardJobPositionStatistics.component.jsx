import { Card, Table, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const JobFairDashBoardJobPositionTableColumn = [
  {
    title: 'No',
    key: 'no',
    render(text, _, index) {
      return {
        props: {
          style: { textAlign: 'end', width: '5px' }
        },
        children: index + 1
      };
    }
  },
  {
    title: 'Name',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Goal',
    key: 'goal',
    dataIndex: 'goal'
  },
  {
    title: 'Current',
    key: 'current',
    dataIndex: 'current'
  }
];

export const DashBoardJobPositionStatistics = ({ data }) => (
  <Card style={{ borderRadius: '10px', height: '100%' }}>
    <Title level={3}>Job position statistics</Title>
    <Table dataSource={data} columns={JobFairDashBoardJobPositionTableColumn} />
  </Card>
);
