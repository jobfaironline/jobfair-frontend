import { Divider, Typography } from 'antd';
import JobFairGridManagerContainer from '../../containers/JobFairList/manager/JobFairGridManager.container';
import React from 'react';

const { Title } = Typography;
const JobFairGridManagerPage = () => (
  <div className='page'>
    <Divider size='small' plain>
      <Title>My job fair</Title>
    </Divider>
    <JobFairGridManagerContainer />
  </div>
);

export default JobFairGridManagerPage;
