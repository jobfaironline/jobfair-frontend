import React, { useState } from 'react'
import { Button, Empty, Input, Space, Spin, Table } from 'antd'
import SearchOutlined from '@ant-design/icons/SearchOutlined'
import Highlighter from 'react-highlight-words'
import JobFairForAdminColumn from './JobFairForAdmin.column'
import { handleGetStatus } from '../../utils/common'

const JobFairForAdminComponent = props => {
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')

  const { data, extra } = props
  const result = handleGetStatus(data)
  let key = ''
  if (result !== undefined) {
    key = result.key
  }

  if (data === undefined || data === null) {
    return <Spin size="large" />
  }

  if (Object.keys(data).length === 0) {
    return <Empty />
  }

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

  const defaultColumns = JobFairForAdminColumn(getColumnSearchProps, key)

  const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns]
  return (
    <div style={{ margin: '1rem 0', borderBottom: '1px solid #e2e2e2' }}>
      <Table
        className="jobfair-table"
        rowClassName={'jobfair-table-row'}
        columns={finalColumns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 500 }}
        bordered={true}
      />
    </div>
  )
}

export default JobFairForAdminComponent
