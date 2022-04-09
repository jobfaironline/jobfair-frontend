import { PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import CreateJobPositionFormContainer from '../../containers/forms/CreateJobPositionForm/CreateJobPositionForm.container';
import React from 'react';

const CreateJobPositionPage = () => {
  const history = useHistory();

  return (
    <div className='page'>
      <PageHeader
        style={{ borderBottom: '1px solid grey', width: '100vw' }}
        className='site-page-header'
        onBack={() => history.push('/company/job-position-management')}
        title="Job position's details"
      />
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
        <CreateJobPositionFormContainer />
      </div>
    </div>
  );
};

export default CreateJobPositionPage;
