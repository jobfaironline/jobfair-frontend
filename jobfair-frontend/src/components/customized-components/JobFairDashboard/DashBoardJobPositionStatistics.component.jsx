import { Card, Divider, Table, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const JobFairDashBoardJobPositionTableColumn = [
  {
    title: 'No',
    key: 'no',
    width: '5%',
    align: 'center',
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
    dataIndex: 'name',
    align: 'center'
  },
  {
    title: 'Job position goal',
    key: 'goal',
    dataIndex: 'goal',
    align: 'center',
    width: '20%',
    render: (num) => <div style={{ textAlign: 'right', marginRight: '1rem' }}>{num}</div>
  },
  {
    title: 'Current applied CV',
    key: 'current',
    dataIndex: 'current',
    align: 'center',
    width: '20%',
    render: (num) => <div style={{ textAlign: 'right', marginRight: '1rem' }}>{num}</div>
  },
  {
    title: 'Number of approved CVs',
    key: 'approveCV',
    dataIndex: 'approveCV',
    align: 'center',
    width: '20%',
    sorter: (a, b) => a.approveCV - b.approveCV,
    render: (num) => <div style={{ textAlign: 'right', marginRight: '1rem' }}>{num}</div>
  }
];

export const DashBoardJobPositionStatistics = ({ data }) => (
  <Card style={{ borderRadius: '10px', height: '100%' }} bodyStyle={{ paddingTop: '12px' }}>
    <Title level={3} style={{ fontWeight: 700 }}>
      Job position statistics
    </Title>
    <Divider style={{ margin: '12px 0' }} />

    <Table dataSource={data} columns={JobFairDashBoardJobPositionTableColumn} />
  </Card>
);
