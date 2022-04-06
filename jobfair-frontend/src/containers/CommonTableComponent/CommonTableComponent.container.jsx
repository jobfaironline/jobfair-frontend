import React, { Fragment, useEffect, useState } from 'react'
// import { defaultColumns, editableColumns } from './columns-type';
import getColumnSearchProps from '../../components/TableSearchComponent/TableSearchComponent.component'
import DefaultTableComponent from '../../components/CommonTableComponent/DefaultTableComponent.component'

const CommonTableContainer = ({ onSearch, tableColumns, ...otherTableProps }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const searchFunction = getColumnSearchProps(searchText, setSearchText, searchedColumn, setSearchedColumn)

  const defaultColumns = onSearch ? tableColumns(searchFunction) : tableColumns()

  useEffect(() => {
    const searchObject = {}
    searchObject[searchedColumn] = searchText
    onSearch(searchObject)
  }, [searchText, searchedColumn, onSearch])

  return (
    <Fragment>
      <DefaultTableComponent defaultColumns={defaultColumns} {...otherTableProps} />
    </Fragment>
  )
}

export default CommonTableContainer
