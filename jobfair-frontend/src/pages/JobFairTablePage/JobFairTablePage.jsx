import './JobFairTablePage.styles.scss';
import { Tabs, Typography } from 'antd';
import JobFairHappeningContainer from '../../containers/JobFairList/admin/JobFairHappening.container';
import JobFairIncomingContainer from '../../containers/JobFairList/admin/JobFairIncoming.container';
import JobFairOccurredContainer from '../../containers/JobFairList/admin/JobFairOccurred.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const { TabPane } = Tabs;
const JobFairTablePage = () => (
  <PageLayoutWrapper className='page jobfair-list-page'>
    <div style={{ padding: '1rem 0' }}>
      <Typography.Title level={2} style={{ marginLeft: '5rem' }}>
        Job fair list
      </Typography.Title>
      <Tabs defaultActiveKey='2' centered>
        <TabPane tab='Taken place' key='1'>
          <JobFairOccurredContainer />
        </TabPane>
        <TabPane tab='In progress' key='2'>
          <JobFairHappeningContainer />
        </TabPane>
        <TabPane tab='Coming soon' key='3'>
          <JobFairIncomingContainer />
        </TabPane>
      </Tabs>
    </div>
  </PageLayoutWrapper>
);

export default JobFairTablePage;
