import CompanyManagementContainer from '../../containers/CompanyManagement/CompanyManagement.container';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';

const CompanyManagementPage = () => (
  <PageLayoutWrapper className='page'>
    <CompanyManagementContainer />
  </PageLayoutWrapper>
);

export default CompanyManagementPage;
