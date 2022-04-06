import React, { Fragment, useState } from 'react'
// import { defaultColumns, editableColumns } from './columns-type';
import { Empty, Spin, Table } from 'antd'
import JobPositionTableColumn from './JobPositionTable.column'
import getColumnSearchProps from '../TableSearchComponent/TableSearchComponent.component'
import { convertEnumToString } from '../../utils/common'

const FormTable = ({ extra, data, ...otherTableProps }) => {
  //search function
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const defaultData = data.map(item => {
    return {
      ...item,
      jobType: convertEnumToString(item?.jobType),
      level: convertEnumToString(item?.level)
    }
  })

  if (data === undefined) {
    return <Spin size="large" />
  }

  if (Object.keys(data).length === 0) {
    return <Empty />
  }

  const defaultColumns = JobPositionTableColumn(
    getColumnSearchProps(searchText, setSearchText, searchedColumn, setSearchedColumn)
  )

  const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns]

  return (
    <Fragment>
      <Table columns={finalColumns} dataSource={defaultData} pagination={false} {...otherTableProps} />
    </Fragment>
  )
}

export default FormTable
