import React, { useState } from 'react'
import { Spin, Table } from 'antd'
import getColumnSearchProps from '../TableSearchComponent/TableSearchComponent.component'
import JobFairListColumn from '../JobFairList/JobFairList.column'

const JobFairPlanComponent = ({ data, extra }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  if (data === undefined || data === null || Object.keys(data).length === 0) {
    return <Spin size="large" />
  }

  const defaultColumns = JobFairListColumn(
    getColumnSearchProps(searchText, setSearchText, searchedColumn, setSearchedColumn)
  )

  const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns]
  return (
    <>
      <Table columns={finalColumns} dataSource={data} pagination={false} scroll={{ y: 240 }} bordered={true} />
    </>
  )
}

export default JobFairPlanComponent
