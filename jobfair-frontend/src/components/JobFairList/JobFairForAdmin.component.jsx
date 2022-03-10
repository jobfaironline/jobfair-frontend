import React, {useState} from 'react';
import {convertEnumToString} from "../../utils/common";
import {Button, Empty, Image, Input, Space, Spin, Table} from "antd";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import Highlighter from "react-highlight-words";
import JobPositionTableColumn from "../JobPositionTable/JobPositionTable.column";
import JobFairForAdminColumn from "./JobFairForAdmin.column";

const JobFairForAdminComponent = (props) => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')

    const {data, extra} = props


    if (data === undefined || data === null) {
        return <Spin size="large"/>
    }

    if (Object.keys(data).length === 0) {
        return <Empty/>
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
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters, confirm)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
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
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (text)
    })

    const defaultColumns = JobFairForAdminColumn(getColumnSearchProps)

    const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns]
    return (
        <>
            <Table columns={finalColumns}
                   dataSource={data}
                   pagination={false}
                   scroll={{ y: 240 }}
                   expandable={{
                       expandedRowRender: record =>
                           <Image
                               width={200}
                               src="https://d3polnwtp0nqe6.cloudfront.net/DecorateItems/898e23ec-0049-41b4-bd02-01a8c52ff703?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
                               preview={{
                                   src: 'https://d3polnwtp0nqe6.cloudfront.net/DecorateItems/898e23ec-0049-41b4-bd02-01a8c52ff703',
                               }}
                           />,
                       rowExpandable: record => record.thumbnail !== '',
                   }}
            />
        </>
    );
};

export default JobFairForAdminComponent;