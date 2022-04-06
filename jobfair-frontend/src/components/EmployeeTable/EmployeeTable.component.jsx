import React, { Fragment, useState } from 'react'
// import { defaultColumns, editableColumns } from './columns-type';
import { Table } from 'antd'
import EmployeeTableColumn from './EmployeeTable.column'
import getColumnSearchProps from '../TableSearchComponent/TableSearchComponent.component'

const FormTable = ({ employeeData, extra }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const defaultColumns = EmployeeTableColumn(
    getColumnSearchProps(searchText, setSearchText, searchedColumn, setSearchedColumn)
  )

  const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns]

  return (
    <Fragment>
      <Table columns={finalColumns} dataSource={employeeData} pagination={{ pageSize: 8 }} />
    </Fragment>
  )
}

export default FormTable
