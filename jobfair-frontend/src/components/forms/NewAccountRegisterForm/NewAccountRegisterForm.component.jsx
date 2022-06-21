/* eslint-disable no-unused-vars,no-empty-function */
import './NewAccountRegisterForm.styles.scss';
import { Divider, Tabs, Typography } from 'antd';
import AttendantRegisterFormContainer from '../../../containers/AttendantRegisterForm/AttendantRegisterForm.container';
import CompanyRegisterFormContainer from '../../../containers/CompanyRegisterForm/CompanyRegisterForm.container';
import React from 'react';

const { TabPane } = Tabs;

const NewAccountRegisterFormComponent = () => (
  <div className='register-container'>
    <Divider orientation='center' plain>
      <Typography.Title level={4}>Job Fair Online - Register</Typography.Title>
    </Divider>
    <Tabs defaultActiveKey='ATTENDANT' centered>
      <TabPane tab='ATTENDANT' key='ATTENDANT'>
        <AttendantRegisterFormContainer />
      </TabPane>
      {/*<TabPane tab='COMPANY' key='COMPANY'>
        <CompanyRegisterFormContainer />
      </TabPane>*/}
    </Tabs>
  </div>
);

export default NewAccountRegisterFormComponent;
