import './AccountManagement.styles.scss';
import { Input, Space, Typography, notification, Row, Col } from 'antd';
import { deleteAccountAPI, getAccountsAPI } from '../../services/jobhub-api/AccountControllerService';
import { useSelector } from 'react-redux';
import AccountDrawer from './AccountDrawer.container';
import AccountTableColumn from '../CommonTableComponent/columns/AccountTable.column';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useEffect, useState } from 'react';

const { Search } = Input;

const AccountManagementContainer = (props) => {
  const companyId = useSelector((state) => state.authentication.user.companyId);
  const { isAccountManagement = true } = props;

  //pagination
  /* eslint-disable no-unused-vars */
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //
  const [accountData, setAccountData] = useState([]);
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [neededAccount, setNeededAccount] = useState(null);
  const [reRender, setReRender] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchData();
  }, [reRender, currentPage, pageSize, searchValue]);

  const fetchData = async () => {
    try {
      const data = (await getAccountsAPI({ companyId, searchContent: searchValue, pageSize, offset: currentPage }))
        .data;
      const newValues = data.content.map((account, index) => {
        const { firstname, middlename, lastname } = account;
        const fullName = `${firstname} ${middlename ? `${middlename} ` : ''}${lastname}`;
        return {
          id: account.id,
          no: index + 1,
          fullName,
          email: account.email,
          status: account.status,
          accountId: account.id,
          phone: account.phone
        };
      });
      setTotalRecord(data.totalElements);
      setAccountData(newValues);
    } catch (e) {
      notification['error']({
        message: `Get account data failed`,
        description: `There is problem while deleting, try again later`
      });
    }
  };

  const handleDelete = (accountId) => {
    deleteAccountAPI(accountId)
      .then(() => {
        notification['success']({
          message: `Delete account successfully`,
          description: `Deleted account ${accountId} successfully`
        });
        fetchData();
      })
      .catch(() => {
        notification['error']({
          message: `Delete account failed`,
          description: `There is problem while deleting, try again later`
        });
      });
  };

  const handleGetDetail = (accountId) => {
    setDrawerVisibility(true);
    setNeededAccount(accountId);
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };

  const onSearch = async (value) => {
    setSearchValue(value);
  };

  const accountTableProps = {
    tableData: accountData,
    tableColumns: AccountTableColumn,
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
            {/* TODO: will open when api is ready */}
            {/* <Popconfirm
              title='Are you sure？'
              okText='Yes'
              cancelText='No'
              onConfirm={() => {
                handleDelete(record.id);
              }}>
              <Button type='link' disabled={record.status === 'INACTIVE'}>
                Deactivate
              </Button>
            </Popconfirm> */}
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
          {isAccountManagement ? (
            <>
              <Typography.Title level={2} style={{ marginRight: '2rem' }}>
                Account management
              </Typography.Title>
            </>
          ) : null}
        </div>
        <Row gutters={[16, 16]} style={{ marginBottom: '1rem' }}>
          <Col span={14}>
            <div className={'search-filter-container'}>
              <Search placeholder='Search account' className={'search-bar'} onSearch={onSearch} />
            </div>
          </Col>
        </Row>

        {neededAccount != null ? (
          <AccountDrawer
            drawerVisibility={drawerVisibility}
            setDrawerVisibility={setDrawerVisibility}
            accountId={neededAccount}
          />
        ) : null}
        <CommonTableContainer {...accountTableProps} />
      </div>
    </>
  );
};

export default AccountManagementContainer;
