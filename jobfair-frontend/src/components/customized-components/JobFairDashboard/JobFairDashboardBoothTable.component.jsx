import { Button, Card, Table, Tag, Typography } from 'antd';
import { PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import { generatePath } from 'react-router';
import { getMatchingPointColor } from '../../../utils/common';
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
    title: 'Average matching point',
    key: 'matchingPointAverage',
    dataIndex: 'matchingPointAverage',
    width: '15%',
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
  },
  {
    title: 'Actions',
    key: 'action',
    width: '15%',
    render: (_, item) => (
      <Button
        type={'link'}
        onClick={() => {
          const url = generatePath(PATH_COMPANY_MANAGER.BOOTH_DASH_BOARD, { boothId: item.id });
          const src = `${window.location.origin}${url}`;
          window.open(src);
        }}>
        Detail
      </Button>
    )
  }
];

export const JobFairDashBoardBoothTable = ({ data }) => {
  const tableProps = {
    tableData: data,
    tableColumns: JobFairDashBoardBoothTableColumn,
    //TODO: add paging
    paginationObject: {}
  };
  return (
    <Card style={{ borderRadius: '10px', height: '100%' }}>
      <Title level={3}>Booth statistic</Title>
      <Table dataSource={tableProps.tableData} columns={tableProps.tableColumns} />
    </Card>
  );
};
