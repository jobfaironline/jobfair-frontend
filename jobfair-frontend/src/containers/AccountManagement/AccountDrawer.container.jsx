/* eslint-disable no-unused-vars */
import { Spin, notification } from 'antd';
import { getAccountByIdAPI } from '../../services/jobhub-api/AccountControllerService';
import AccountDrawerComponent from '../../components/customized-components/AccountDetailDrawer/AccountDetailDrawer.component';
import React, { useLayoutEffect, useState } from 'react';

const AccountDrawer = ({ accountId, drawerVisibility, setDrawerVisibility }) => {
  const [accountData, setAccountData] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    getAccountByIdAPI(accountId)
      .then((res) => {
        const { data } = res;

        setAccountData(data);
      })
      .catch((e) => {
        notification['error']({
          message: `Get account data failed`,
          description: `There is problem while deleting, try again later`
        });
      });
  };

  useLayoutEffect(() => {
    fetchData();
  }, [accountId]);

  const onClose = async () => {
    setDrawerVisibility(false);
  };

  if (loading) return <Spin size='large'></Spin>;

  return (
    <>
      <AccountDrawerComponent onClose={onClose} visible={drawerVisibility} data={accountData} />
    </>
  );
};

export default AccountDrawer;
