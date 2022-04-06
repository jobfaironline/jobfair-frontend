import { Button, Typography } from 'antd'
import { useHistory } from 'react-router-dom'
import EmployeeTable from '../../containers/EmployeeTable/EmployeeTable.container'
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path'

const EmployeeManagementPage = () => {
  const history = useHistory()

  return (
    <div className="page">
      <div style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography.Title level={2}>Employee management</Typography.Title>
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center'
            }}
          >
            <Button
              type="primary"
              onClick={() =>
                history.push(PATH_COMPANY_MANAGER.EMPLOYEE_REGISTER_PAGE)
              }
            >
              Create employee account
            </Button>
          </div>
        </div>
        <EmployeeTable />
      </div>
    </div>
  )
}

export default EmployeeManagementPage
