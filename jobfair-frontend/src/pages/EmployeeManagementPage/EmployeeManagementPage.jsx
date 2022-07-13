import EmployeeManagementContainer from '../../containers/EmployeeManagement/EmployeeManagement.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const EmployeeManagementPage = () => (
  <PageLayoutWrapper className='page'>
    <EmployeeManagementContainer />
  </PageLayoutWrapper>
);

export default EmployeeManagementPage;
