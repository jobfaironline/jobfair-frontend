import { Space, Table } from 'antd';
import PaginationComponent from '../PaginationComponent/Pagination.component';
import React, { Fragment } from 'react';

const DefaultTableComponent = ({ tableData, defaultColumns, extra, paginationObject, ...otherTableProps }) => {
  const { handlePageChange, totalRecord } = paginationObject;

  const finalColumns = extra ? [...defaultColumns, ...extra] : [...defaultColumns];

  return (
    <Fragment>
      <Table columns={finalColumns} dataSource={tableData} pagination={false} />
      <Space style={{ margin: '1rem', display: 'flex', justifyContent: 'end' }}>
        <PaginationComponent
          data={tableData}
          handlePageChange={handlePageChange}
          totalRecord={totalRecord}
          {...otherTableProps}
        />
      </Space>
    </Fragment>
  );
};

export default DefaultTableComponent;
