import React, { Fragment, useState } from 'react'
// import { defaultColumns, editableColumns } from './columns-type';
import PaginationComponent from '../PaginationComponent/Pagination.component'
import { Table, Space } from 'antd'
import getColumnSearchProps from '../TableSearchComponent/TableSearchComponent.component'

const DefaultTableComponent = ({ tableData, defaultColumns, extra, paginationObject }) => {
  const { handlePageChange, totalRecord } = paginationObject

  const finalColumns = extra ? [...defaultColumns, ...extra] : [...defaultColumns]

  return (
    <Fragment>
      <Table columns={finalColumns} dataSource={tableData} pagination={false} />
      <Space style={{ margin: '1rem', display: 'flex', justifyContent: 'end' }}>
        <PaginationComponent data={tableData} handlePageChange={handlePageChange} totalRecord={totalRecord} />
      </Space>
    </Fragment>
  )
}

export default DefaultTableComponent
