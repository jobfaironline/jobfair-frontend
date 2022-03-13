import { Button, PageHeader } from 'antd'
import { useHistory } from 'react-router-dom'
import EmployeeForm from '../../containers/EmployeeForm/EmployeeForm.container'
import { PATH, PATH_COMPANY_MANAGER } from '../../constants/Paths/Path'
const RegisterPage = () => {
  const history = useHistory()

  return (
    <div className="page">
      <PageHeader
        className="site-page-header"
        onBack={() => history.push(PATH_COMPANY_MANAGER.EMPLOYEE_MANAGEMENT_PAGE)}
        title="Create employee account"
        subTitle="Create your company's employee account in here!"
      />
      <EmployeeForm />
    </div>
  )
}

export default RegisterPage
