import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import EmployeeForm from '../../containers/EmployeeForm/EmployeeForm.container'

const RegisterPage = () => {
  const history = useHistory()

  return (
    <>
      <>
        <Button type="primary" onClick={() => history.push('/employee-management')}>
          Back to Employee table
        </Button>
      </>
      <EmployeeForm />
    </>
  )
}

export default RegisterPage
