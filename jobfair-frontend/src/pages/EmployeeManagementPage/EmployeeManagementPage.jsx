import { Menu, PageHeader, Dropdown, Avatar, Button, Space, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import EmployeeTable from '../../containers/EmployeeTable/EmployeeTable.container'
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path'
const EmployeeManagementPage = () => {
  const history = useHistory()

  return (
    <div className="page">
      <div style={{ padding: '3rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
              Employees table
            </Typography.Title>
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'end' }}>
            <Button type="primary" onClick={() => history.push(PATH_COMPANY_MANAGER.EMPLOYEE_REGISTER_PAGE)}>
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
