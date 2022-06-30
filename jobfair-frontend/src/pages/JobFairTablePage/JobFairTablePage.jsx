/* eslint-disable no-unused-vars */
import './JobFairTablePage.styles.scss';
import { Divider, Tabs, Typography } from 'antd';
import { useSelector } from 'react-redux';
import JobFairHappeningContainer from '../../containers/JobFairList/admin/JobFairHappening.container';
import JobFairIncomingContainer from '../../containers/JobFairList/admin/JobFairIncoming.container';
import JobFairOccurredContainer from '../../containers/JobFairList/admin/JobFairOccurred.container';
import React from 'react';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const { TabPane } = Tabs;
const JobFairTablePage = () => {
  const role = useSelector((state) => state.authentication?.user?.roles);

  return (
    <PageLayoutWrapper className='page jobfair-list-page'>
      <div style={{ padding: '2rem 0' }}>
        <Divider>
          <Typography.Title level={2}>Job fair list</Typography.Title>
        </Divider>
        <Tabs defaultActiveKey='2' centered>
          <TabPane tab='Taken place' key='1'>
            <JobFairOccurredContainer />
          </TabPane>
          <TabPane tab='Happening' key='2'>
            <JobFairHappeningContainer />
          </TabPane>
          <TabPane tab='Coming soon' key='3'>
            <JobFairIncomingContainer />
          </TabPane>
        </Tabs>
      </div>
    </PageLayoutWrapper>
  );
};

export default JobFairTablePage;
