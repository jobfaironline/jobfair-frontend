import { Divider, Typography } from 'antd';
import JobFairTemplateContainer from '../../containers/JobFairTemplate/JobFairTemplate.container';
import React from 'react';

const { Title } = Typography;
const JobFairTemplatePage = () => {
  const a = 0;
  return (
    <div className='page'>
      <Divider size='small' plain>
        <Title>My job fair template</Title>
      </Divider>
      <JobFairTemplateContainer />
    </div>
  );
};

export default JobFairTemplatePage;
