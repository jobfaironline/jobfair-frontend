import { Button, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useState } from 'react';
import SubscriptionHistoryTableColumn from './SubscriptionHistoryTable.column';

const { Title } = Typography;

const fakeData = [
  {
    no: 1,
    id: 'ID001',
    price: '500'
  }
];

const SubscriptionHistoryContainer = () => {
  const [data, setData] = useState();

  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  //

  const handleViewDetail = (id) => {
    console.log(id);
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };

  const tableProps = {
    tableData: fakeData,
    tableColumns: SubscriptionHistoryTableColumn,
    extra: [
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <Button type='link' onClick={() => handleViewDetail(record.id)}>
            <FontAwesomeIcon icon={faEye} />
          </Button>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };
  return (
    <div style={{ marginTop: '5rem' }}>
      <Title level={3}>My subscription history</Title>
      <CommonTableContainer {...tableProps} />
    </div>
  );
};

export default SubscriptionHistoryContainer;
