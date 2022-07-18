import { Button, Card, Table, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import { generatePath } from 'react-router';
import React from 'react';

const { Title } = Typography;

const JobFairDashBoardBoothTableColumn = [
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
    title: 'Booth name',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Number of traffic',
    key: 'visitNum',
    dataIndex: 'visitNum',
    width: '15%',
    render: (num) => <div style={{ textAlign: 'right' }}>{num}</div>
  },
  {
    title: 'Number of applied CV',
    key: 'cvNum',
    dataIndex: 'cvNum',
    width: '15%',
    render: (num) => <div style={{ textAlign: 'right' }}>{num}</div>
  },
  {
    title: 'Number of approved CVs',
    key: 'approveCV',
    dataIndex: 'approveCV',
    width: '15%',
    sorter: (a, b) => a.approveCV - b.approveCV,
    render: (num) => <div style={{ textAlign: 'right' }}>{num}</div>
  },
  {
    title: 'Actions',
    key: 'action',
    width: '15%',
    render: (_, item) => (
      <Button
        style={{ display: 'flex', alignItems: 'center' }}
        type={'link'}
        onClick={() => {
          const url = generatePath(PATH_COMPANY_MANAGER.BOOTH_DASH_BOARD, { boothId: item.id });
          const src = `${window.location.origin}${url}`;
          window.open(src);
        }}>
        <EyeOutlined style={{ lineHeight: 0 }} /> Detail
      </Button>
    )
  }
];

export const JobFairDashBoardBoothTable = ({ data }) => (
  <Card style={{ borderRadius: '10px', height: '100%' }}>
    <Title level={3}>Booth statistic</Title>
    <Table dataSource={data} columns={JobFairDashBoardBoothTableColumn} />
  </Card>
);
