import { Button, Card, Table, Typography } from 'antd';
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
    title: 'Name',
    key: 'name',
    dataIndex: 'name'
  },
  {
    title: 'Visitor traffic',
    key: 'visitNum',
    dataIndex: 'visitNum'
  },
  {
    title: 'Number of applied CV',
    key: 'cvNum',
    dataIndex: 'cvNum'
  },
  {
    title: 'Actions',
    key: 'action',
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
