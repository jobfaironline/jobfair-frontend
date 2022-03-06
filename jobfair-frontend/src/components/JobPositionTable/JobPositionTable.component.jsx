import React, { Fragment, useState } from 'react'
// import { defaultColumns, editableColumns } from './columns-type';
import { Space, Table, Input, Button } from 'antd'
import Highlighter from 'react-highlight-words'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import JobPositionTableColumn from './JobPositionTable.column'

const FormTable = ({ extra, data, ...otherTableProps }) => {
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

  const defaultColumns = JobPositionTableColumn(getColumnSearchProps)

  const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns]

  return (
    <Fragment>
      <Table columns={finalColumns} dataSource={data} pagination={{ pageSize: 8 }} {...otherTableProps} />
    </Fragment>
  )
}

export default FormTable
