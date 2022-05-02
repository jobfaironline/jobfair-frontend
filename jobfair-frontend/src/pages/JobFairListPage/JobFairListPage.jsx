import { useSelector } from 'react-redux';
import JobFairGridPublicContainer from '../../containers/JobFairList/public/JobFairGridPublicContainer';
import React from 'react';

const JobFairListPage = () => {
  const role = useSelector((state) => state.authentication.user.roles);

  return (
    <div className='page'>
      <JobFairGridPublicContainer role={role} />
    </div>
  );
};

export default JobFairListPage;
