import React, { Fragment, useEffect, useState } from 'react'
// import { defaultColumns, editableColumns } from './columns-type';
import getColumnSearchProps from '../TableSearchComponent/TableSearchComponent.component'
import DefaultTableComponent from '../../components/CommonTableComponent/DefaultTableComponent.component'

const CommonTableContainer = ({ onSearch, tableColumns, ...otherTableProps }) => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const defaultColumns = onSearch
    ? tableColumns(getColumnSearchProps(searchText, setSearchText, searchedColumn, setSearchedColumn))
    : tableColumns()

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
