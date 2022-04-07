import { Empty, Spin, Table } from 'antd';
import { handleGetStatus } from '../../utils/common';
import JobFairForAdminColumn from '../../containers/CommonTableComponent/columns/JobFairForAdmin.column';
import React, { useState } from 'react';
import getColumnSearchProps from '../commons/CommonTableComponent/TableHelper/TableSearchComponent/TableSearchComponent.component';

const JobFairTableForAdminComponentRefactor = (props) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const { data, extra } = props;
  const result = handleGetStatus(data);
  let key = '';
  if (result !== undefined) key = result.key;

  if (data === undefined || data === null) return <Spin size='large' />;

  if (Object.keys(data).length === 0) return <Empty />;

  const defaultColumns = JobFairForAdminColumn(
    getColumnSearchProps(searchText, setSearchText, searchedColumn, setSearchedColumn),
    key
  );

  const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns];
  return (
    <div style={{ margin: '1rem 0', borderBottom: '1px solid #e2e2e2' }}>
      <Table
        className='jobfair-table'
        rowClassName={'jobfair-table-row'}
        columns={finalColumns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 500 }}
        bordered={true}
      />
    </div>
  );
};

export default JobFairTableForAdminComponentRefactor;
