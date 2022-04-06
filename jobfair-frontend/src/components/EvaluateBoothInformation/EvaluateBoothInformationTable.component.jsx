import React, { useState } from 'react'
import { Button, Empty, Input, Space, Spin, Table } from 'antd'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import Highlighter from 'react-highlight-words'
import EvaluateBoothInformationTableColumn from './EvaluateBoothInformationTable.column'

const EvaluateBoothInformationTableComponent = ({ data, extra, jobFairId }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  if (data === undefined || data === null) {
    return <Spin size="large" />
  }

  if (Object.keys(data).length === 0) {
    return (
      <>
        <h1>This job fair hasn't been registered yet!!!</h1>
        <Empty />
      </>
    )
  }

  const defaultColumns = EvaluateBoothInformationTableColumn(
    getColumnSearchProps(searchText, setSearchText, searchedColumn, setSearchedColumn),
    jobFairId
  )

  const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns]

  return (
    <>
      <Table
        columns={finalColumns}
        dataSource={data}
        // pagination={{ pageSize: 5 }}
        pagination={false}
      />
    </>
  )
}

export default EvaluateBoothInformationTableComponent
