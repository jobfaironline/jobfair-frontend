import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import EmployeeManagementContainer from '../../containers/EmployeeManagement/EmployeeManagement.container';

const EmployeeManagementPage = () => (
  <PageLayoutWrapper className='page'>
    <EmployeeManagementContainer />
  </PageLayoutWrapper>
);

export default EmployeeManagementPage;
