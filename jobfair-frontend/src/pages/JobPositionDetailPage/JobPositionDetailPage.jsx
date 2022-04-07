import { PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import JobPositionDetailFormContainer from '../../containers/forms/JobPositionDetailForm/JobPositionDetailForm.container';
import React from 'react';

const JobPositionDetailPage = () => {
  const history = useHistory();

  return (
    <div className='page'>
      <PageHeader
        style={{ borderBottom: '1px solid grey', width: '100vw' }}
        className='site-page-header'
        onBack={() => history.push('/company/job-position-management')}
        title="Job position's details"
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem 0'
        }}>
        <JobPositionDetailFormContainer />
      </div>
    </div>
  );
};

export default JobPositionDetailPage;