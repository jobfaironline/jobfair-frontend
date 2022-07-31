import { Avatar, Col, Input, Row, Space, Tag, Typography, notification } from 'antd';
import { getCompaniesAPI } from '../../services/jobhub-api/CompanyControllerService';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useEffect, useState } from 'react';

const { Search } = Input;

const CompanyTableColumn = () => [
  {
    title: 'No',
    dataIndex: 'no',
    key: 'no',
    render(_, __, index) {
      return {
        props: {
          style: { textAlign: 'end', width: '5px' }
        },
        children: index + 1
      };
    }
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    sorter: (a, b) => a.email.localeCompare(b.email),
    sortDirections: ['email']
  },
  {
    title: 'Logo',
    key: 'logo',
    render: (_, record) => <Avatar shape={'square'} src={record.companyLogoURL} size={50} />
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.localeCompare(b.name),
    sortDirections: ['descend']
  },
  {
    title: 'Phone number',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Status',
    key: 'status',
    dataIndex: 'status',
    filters: [
      {
        text: 'Verified',
        value: 'VERIFIED'
      },
      {
        text: 'Inactive',
        value: 'INACTIVE'
      },
      {
        text: 'Suspensed',
        value: 'SUSPENSED'
      },
      {
        text: 'Registered',
        value: 'REGISTERED'
      }
    ],
    onFilter: (value, record) => record.status === value,
    render: (status) => {
      let objStatus;
      switch (status) {
        case 'VERIFIED':
          objStatus = {
            color: 'success',
            message: 'Verified'
          };
          break;
        case 'REGISTERED':
          objStatus = {
            color: 'blue',
            message: 'Registered'
          };
          break;
        case 'SUSPENSED':
          objStatus = {
            color: 'warning',
            message: 'Suspensed'
          };
          break;
        default:
          objStatus = {
            color: 'error',
            message: 'Inactive'
          };
          break;
      }
      return (
        <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag> // prettier-ignore
      );
    }
  }
];

const CompanyManagementContainer = () => {
  //pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //
  const [companyData, setCompanyData] = useState([]);
  /* eslint-disable no-unused-vars */
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  /* eslint-disable no-unused-vars */
  const [neededCompany, setNeededCompany] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchValue]);

  const fetchData = async () => {
    try {
      const data = (await getCompaniesAPI({ searchValue, pageSize, offset: currentPage })).data;
      setTotalRecord(data.totalElements);
      setCompanyData(data.content);
    } catch (e) {
      notification['error']({
        message: `Get account data failed`,
        description: `There is problem while deleting, try again later`
      });
    }
  };

  const handleGetDetail = (accountId) => {
    setDrawerVisibility(true);
    setNeededCompany(accountId);
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onSearch = async (value) => {
    setSearchValue(value);
  };

  const companyTableProps = {
    tableData: companyData,
    tableColumns: CompanyTableColumn,
    extra: [
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <Space size='middle'>
            <a
              onClick={() => {
                handleGetDetail(record.id);
              }}>
              Detail
            </a>
          </Space>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };

  return (
    <>
      <div className={'account-management'}>
        <div className={'header'}>
          <Typography.Title level={2} style={{ marginLeft: '5rem' }}>
            Company management
          </Typography.Title>
        </div>
        <Row gutters={[16, 16]} style={{ marginBottom: '1rem' }}>
          <Col span={14}>
            <div className={'search-filter-container'}>
              <Search placeholder='Search company' className={'search-bar'} onSearch={onSearch} />
            </div>
          </Col>
        </Row>
        {/*{neededCompany != null ? (
          <AccountDrawer
            drawerVisibility={drawerVisibility}
            setDrawerVisibility={setDrawerVisibility}
            accountId={neededCompany}
          />
        ) : null}*/}
        <CommonTableContainer {...companyTableProps} />
      </div>
    </>
  );
};

export default CompanyManagementContainer;
