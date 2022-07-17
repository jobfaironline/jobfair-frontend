import { Card, Table, Tag, Typography } from 'antd';
import { getMatchingPointColor } from '../../../utils/common';
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
    width: '15%',
    render: (num) => <div style={{ textAlign: 'right' }}>{num}</div>
  },
  {
    title: 'Current applied CV',
    key: 'current',
    dataIndex: 'current',
    width: '15%',
    render: (num) => <div style={{ textAlign: 'right' }}>{num}</div>
  },
  {
    title: 'Average matching point',
    key: 'matchingPointAverage',
    dataIndex: 'matchingPointAverage',
    width: '20%',
    sorter: (a, b) => a.matchingPoint * 100 - b.matchingPoint * 100,
    render: (num) => {
      const tagColor = getMatchingPointColor(num);
      return (
        <div style={{ display: 'flex' }}>
          <Tag color={tagColor} style={{ marginLeft: 'auto' }}>
            {Math.round(num * 100)} %
          </Tag>
        </div>
      );
    }
  }
];

export const DashBoardJobPositionStatistics = ({ data }) => (
  <Card style={{ borderRadius: '10px', height: '100%' }}>
    <Title level={3}>Job position statistics</Title>
    <Table dataSource={data} columns={JobFairDashBoardJobPositionTableColumn} />
  </Card>
);
