import { Menu, PageHeader, Dropdown, Avatar, Button, Space } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import EmployeeTable from '../../containers/EmployeeTable/EmployeeTable.container'

const EmployeeManagementPage = () => {
  const history = useHistory()

  return (
    <div>
      <h1>Employee management</h1>
      <Space>
        <Button
          type="primary"
          onClick={() => history.push('/employee-register')}
        >
          Register employee
        </Button>
      </Space>
      <EmployeeTable />
    </div>
  )
}

export default EmployeeManagementPage
