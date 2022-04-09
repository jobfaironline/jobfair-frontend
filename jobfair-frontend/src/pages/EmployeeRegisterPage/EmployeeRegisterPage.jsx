import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { PageHeader } from 'antd';
import { useHistory } from 'react-router-dom';
import EmployeeForm from '../../containers/forms/EmployeeForm/EmployeeForm.container';

const RegisterPage = () => {
  const history = useHistory();

  return (
    <div className='page'>
      <PageHeader
        className='site-page-header'
        onBack={() => history.push(PATH_COMPANY_MANAGER.EMPLOYEE_MANAGEMENT_PAGE)}
        title='Create employee account'
        subTitle="Create your company's employee account in here!"
      />
      <EmployeeForm />
    </div>
  );
};

export default RegisterPage;
