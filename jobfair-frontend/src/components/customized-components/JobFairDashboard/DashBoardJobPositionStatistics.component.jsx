import { Card, Table, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const JobFairDashBoardJobPositionTableColumn = [
  {
    title: 'No',
    key: 'no',
    width: '5%',
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
    title: 'Job position goal',
    key: 'goal',
    dataIndex: 'goal',
    width: '20%',
    render: (num) => <div style={{ textAlign: 'right' }}>{num}</div>
  },
  {
    title: 'Current applied CV',
    key: 'current',
    dataIndex: 'current',
    width: '20%',
    render: (num) => <div style={{ textAlign: 'right' }}>{num}</div>
  },
  {
    title: 'Number of approved CVs',
    key: 'approveCV',
    dataIndex: 'approveCV',
    width: '20%',
    sorter: (a, b) => a.approveCV - b.approveCV,
    render: (num) => <div style={{ textAlign: 'right' }}>{num}</div>
  }
];

export const DashBoardJobPositionStatistics = ({ data }) => (
  <Card style={{ borderRadius: '10px', height: '100%' }}>
    <Title level={3}>Job position statistics</Title>
    <Table dataSource={data} columns={JobFairDashBoardJobPositionTableColumn} />
  </Card>
);
