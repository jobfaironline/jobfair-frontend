import { AccountProfile } from '../../../../components/forms/ProfileForm/AccountProfile.component';
import { Card, Form, notification } from 'antd';
import { LoadingComponent } from '../../../../components/commons/Loading/Loading.component';
import { ProfileFormContainer } from '../ProfileForm.container';
import {
  getEmployeeByIdAPI,
  updateEmployeeAPI
} from '../../../../services/jobhub-api/CompanyEmployeeControllerService';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

const formTitles = [{ title: 'Profile', href: '#profile' }];

export const CompanyEmployeeProfileFormContainer = () => {
  const [form] = Form.useForm();
  const userId = useSelector((state) => state.authentication.user.userId);

  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await getEmployeeByIdAPI(userId);
      setData(data);
    } catch (e) {
      notification['error']({
        message: `Fetch attendant profile failed`
      });
    }
  };

  const onFinish = async (values) => {
    const accountRequest = values.account;
    accountRequest.email = values.email;
    const body = {
      accountRequest
    };

    try {
      await updateEmployeeAPI(body);
      fetchData();
      notification['success']({
        message: `Update account profile successfully`
      });
    } catch (e) {
      notification['error']({
        message: `Update profile failed`,
        description: `There is problem while updating, try again later`
      });
    }
  };

  if (data === undefined || data === null || Object.keys(data).length === 0)
    return <LoadingComponent isWholePage={true} />;

  return (
    <ProfileFormContainer form={form} onFinish={onFinish} data={data} formTitle={formTitles} canDeactivate={false}>
      <Card className={'list anchor'} id={'profile'}>
        <AccountProfile />
      </Card>
    </ProfileFormContainer>
  );
};
