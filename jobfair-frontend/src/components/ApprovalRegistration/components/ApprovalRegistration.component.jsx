import React , {useState} from 'react';
import {Button, Empty, Input, Pagination, Space, Spin, Table} from "antd";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import Highlighter from "react-highlight-words";
import ApprovalRegistrationColumn from "../columns/ApprovalRegistration.column";
import {useHistory} from "react-router-dom";

const ApprovalRegistrationComponent = ({data, extra, jobFairId}) => {

    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')

    if (data === undefined || data === null ) {
        return <Spin size="large"/>
    }

    if (Object.keys(data).length === 0) {
        return (
            <>
                <h1>This job fair hasn't been registered yet!!!</h1>
                <Empty/>
            </>
        )
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
        ) : (text)
    })

    const defaultColumns = ApprovalRegistrationColumn(getColumnSearchProps, jobFairId)

    const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns]

    return (
        <>
            <Table columns={finalColumns} dataSource={data}
                   // pagination={{ pageSize: 5 }}
                   pagination={false}
            />
        </>
    )
};

export default ApprovalRegistrationComponent;