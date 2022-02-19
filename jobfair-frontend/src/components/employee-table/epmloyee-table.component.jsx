import { Fragment, useState } from 'react';
// import { defaultColumns, editableColumns } from './columns-type';
import { Space, Table, Input, Button, Tag } from "antd";
import Highlighter from 'react-highlight-words';
import SearchOutlined from '@ant-design/icons/SearchOutlined';

const FormTable = ({employeeData, extra}) => {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      const handleReset = (clearFilters, confirm) => {
        clearFilters();
        setSearchText('');
        setSearchedColumn('full_name');
        confirm();
      };

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
            //   ref={node => {
            //     this.searchInput = node;
            //   }}
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
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
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
          ),
      });

      const defaultColumns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          ...getColumnSearchProps('id'),
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone',
          key: 'phone',
          ...getColumnSearchProps('phone'),
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
          ...getColumnSearchProps('email'),
        },
        {
          title: 'Trạng thái',
          key: 'status',
          dataIndex: 'status',
          filters: [
            {
              text: 'Verified',
              value: "VERIFIED",
            },
            {
              text: 'Inactive',
              value: "INACTIVE"
            }
          ],
          onFilter: (value, record) => {
              return record.status === value;
          },
          render: (status) => {
                let objStatus;
                switch(status) {
                  case "VERIFIED": objStatus = {
                    color: 'processing',
                    message: "Verified"
                  }; break;
                  default: objStatus = {
                    color: 'warning',
                    message: "Inactive"
                  };
                } 
                return (
                  <Tag color={objStatus.color}>
                    {objStatus.message.toUpperCase()}
                  </Tag>
                );
          }
        },
    ];

    const finalColumns = extra ? [...defaultColumns, extra] : [...defaultColumns]

    return (
        <Fragment>
            <Table 
                columns={finalColumns} 
                dataSource={employeeData} 
            />
        </Fragment>
    );
}

export default FormTable;

