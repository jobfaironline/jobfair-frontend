import { Button, Card, Table, Tag, Typography } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { PATH_COMPANY_MANAGER } from '../../../../constants/Paths/Path';
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
    title: 'Job fair name',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Number of booths',
    key: 'boothNum',
    dataIndex: 'boothNum',
    render: (num) => <div style={{ textAlign: 'right' }}>{num}</div>
  },
  {
    title: 'Number of visitors',
    key: 'participationNum',
    dataIndex: 'participationNum',
    width: '15%',
    render: (num) => <div style={{ textAlign: 'right' }}>{num}</div>
  },
  {
    title: 'Status',
    key: 'status',
    render: (_, item) => {
      const { decorateStartTime, publicEndTime } = item;
      const now = new Date().getTime();
      let status = 'Happened';
      let color = 'green';
      if (decorateStartTime < now && publicEndTime > now) {
        status = 'In progress';
        color = 'gold';
      }
      if (decorateStartTime >= now) {
        status = 'Up coming';
        color = 'gray';
      }
      return <Tag color={color}>{status}</Tag>;
    }
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
          const url = generatePath(PATH_COMPANY_MANAGER.JOB_FAIR_DASH_BOARD, { jobFairId: item.id });
          const src = `${window.location.origin}${url}`;
          window.open(src);
        }}>
        <EyeOutlined style={{ lineHeight: 0 }} /> Detail
      </Button>
    )
  }
];

export const CompanyDashBoardJobFairTable = ({ data }) => (
  <Card style={{ borderRadius: '10px', height: '100%' }}>
    <Title level={3}>Job fair statistic</Title>
    <Table dataSource={data} columns={JobFairDashBoardBoothTableColumn} />
  </Card>
);