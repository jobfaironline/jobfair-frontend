import { Divider, Tabs, Typography } from 'antd';
import ApplicationViewContainer from '../../containers/ApplicationView/ApplicationView.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const { TabPane } = Tabs;

const ApplicationManagementPage = () => (
  <PageLayoutWrapper className='page'>
    <div>
      <Divider>
        <Typography.Title level={2}>Application management</Typography.Title>
      </Divider>
      <Tabs defaultActiveKey='1' centered destroyInactiveTabPane>
        <TabPane tab='Reviewing applications' key='1'>
          <ApplicationViewContainer tabStatus='1' />
        </TabPane>
        <TabPane tab='Rejected Applications' key='2'>
          <ApplicationViewContainer tabStatus='2' />
        </TabPane>
        <TabPane tab='Approved Applications' key='3'>
          <ApplicationViewContainer tabStatus='3' />
        </TabPane>
      </Tabs>
    </div>
  </PageLayoutWrapper>
);

export default ApplicationManagementPage;
