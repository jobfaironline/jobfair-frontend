import { Typography } from 'antd';
import EmployeeManagementContainer from '../../containers/EmployeeManagement/EmployeeManagement.container';

const EmployeeManagementPage = () => (
  <div className='page'>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Typography.Title level={2}>Employee management</Typography.Title>
    </div>
    <EmployeeManagementContainer />
  </div>
);

export default EmployeeManagementPage;
