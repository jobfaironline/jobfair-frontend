import { Divider, Typography } from 'antd';
import { useSelector } from 'react-redux';
import JobFairGridAttendantContainer from '../../containers/JobFairList/attendant/JobFairGridAttendant.container';
import JobFairListEmployeeContainer from '../../containers/JobFairList/employee/JobFairListEmployee.container';
import JobFairListManagerContainer from '../../containers/JobFairList/manager/JobFairListManager.container';
import React from 'react';

const { Title } = Typography;
const JobFairListPage = () => {
  const role = useSelector((state) => state.authentication.user.roles);
  const ViewComponent = ({ role }) => {
    switch (role) {
      case 'COMPANY_EMPLOYEE':
        return <JobFairListEmployeeContainer />;
      case 'COMPANY_MANAGER':
        return <JobFairListManagerContainer />;
      case 'ATTENDANT':
        return <JobFairGridAttendantContainer />;
      default:
        return null;
    }
  };
  return (
    <div className='page'>
      <Divider size='small' plain>
        <Title>Job Fair Park</Title>
      </Divider>
      <ViewComponent role={role} />
    </div>
  );
};

export default JobFairListPage;
