import React, { Fragment, useState } from 'react'
// import { defaultColumns, editableColumns } from './columns-type';
import { Space, Table, Input, Button } from 'antd'
import Highlighter from 'react-highlight-words'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import JobPositionTableColumn from './JobPositionTable.column'
import {
  setFormBody,
  setJobPositions
} from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const FormTable = ({ jobPositionsInForm, extra, data }) => {
  //search function
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters, confirm) => {
    clearFilters()
    setSearchText('')
    setSearchedColumn('full_name')
    confirm()
  }

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        // setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )
  })
  ///////////////////////////

  const dispatch = useDispatch()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const modalVisible = useSelector(state => state.registrationJobfairForm?.jobPositionModalVisibility)

  useEffect(() => {
    const mappedRows = jobPositionsInForm.map(item => item.key)
    if (modalVisible) setSelectedRowKeys(mappedRows)

  //handle pick button
  const start = () => {
    const mappedData = []
    for (const item of data) {
      if (selectedRowKeys.includes(item.key)) {
        mappedData.push(item)
      }
    }
    dispatch(setJobPositions(mappedData))
  }

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name
    })
  }
  //

  const defaultColumns = JobPositionTableColumn(getColumnSearchProps)

  const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns]

  return (
    <Fragment>
      <Button type="primary" onClick={start}>
        Pick
      </Button>
      <Table rowSelection={{ ...rowSelection }} columns={finalColumns} dataSource={data} pagination={{ pageSize: 8 }} />
    </Fragment>
  )
}

export default FormTable
