import React, { Fragment, useState } from 'react'
// import { defaultColumns, editableColumns } from './columns-type';
import getColumnSearchProps from '../TableSearchComponent/TableSearchComponent.component'
import { Table } from 'antd'
import ApplicationTableColumn from './ApplicationTable.column'

const ApplicationTable = ({ applicationData, extra }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const defaultColumns = ApplicationTableColumn(
    getColumnSearchProps(searchText, setSearchText, searchedColumn, setSearchedColumn)
  )

  const finalColumns = extra ? [...defaultColumns, ...extra] : [...defaultColumns]

  return (
    <Fragment>
      <Table columns={finalColumns} dataSource={applicationData} pagination={false} />
    </Fragment>
  )
}

export default ApplicationTable
