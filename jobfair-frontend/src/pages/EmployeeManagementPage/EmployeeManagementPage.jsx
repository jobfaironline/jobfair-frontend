import { Menu, PageHeader, Dropdown, Avatar, Button, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import EmployeeTable from '../../containers/EmployeeTable/EmployeeTable.container'
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path'
const EmployeeManagementPage = () => {
  const history = useHistory()

  return (
    <div>
      <h1>Employee management</h1>
      <Space>
        <Button type="primary" onClick={() => history.push(PATH_COMPANY_MANAGER.EMPLOYEE_REGISTER_PAGE)}>
          Register employee
        </Button>
      </Space>
      <EmployeeTable />
    </div>
  )
}

export default EmployeeManagementPage
