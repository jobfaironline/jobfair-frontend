import './JobFairTablePage.styles.scss';
import { Input, Tabs, Typography } from 'antd';
import JobFairHappeningContainer from '../../containers/JobFairList/admin/JobFairHappening.container';
import JobFairIncomingContainer from '../../containers/JobFairList/admin/JobFairIncoming.container';
import JobFairOccurredContainer from '../../containers/JobFairList/admin/JobFairOccurred.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React, { useState } from 'react';

const { TabPane } = Tabs;
const JobFairTablePage = () => {
  const [searchValue, setSearchValue] = useState();
  return (
    <PageLayoutWrapper className='page jobfair-list-page'>
      <div style={{ padding: '1rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography.Title level={2} style={{ marginBottom: '0' }}>
            Job fair list
          </Typography.Title>
          <Input.Search
            style={{ marginLeft: '1.4rem', width: '500px' }}
            placeholder={'Search by job fair name'}
            onSearch={(value) => {
              setSearchValue(value);
            }}
          />
        </div>
        <Tabs defaultActiveKey='2' centered>
          <TabPane tab='Taken place' key='1'>
            <JobFairOccurredContainer searchValue={searchValue} />
          </TabPane>
          <TabPane tab='In progress' key='2'>
            <JobFairHappeningContainer searchValue={searchValue} />
          </TabPane>
          <TabPane tab='Coming soon' key='3'>
            <JobFairIncomingContainer searchValue={searchValue} />
          </TabPane>
        </Tabs>
      </div>
    </PageLayoutWrapper>
  );
};

export default JobFairTablePage;
