import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import EmployeeForm from '../../containers/EmployeeForm/EmployeeForm.container'
import { PATH } from '../../constants/Paths/Path'
const RegisterPage = () => {
  const history = useHistory()

  return (
    <>
      <>
        <Button type="primary" onClick={() => history.push(PATH.EMPLOYEE_MANAGEMENT)}>
          Back to Employee table
        </Button>
      </>
      <EmployeeForm />
    </>
  )
}

export default RegisterPage
