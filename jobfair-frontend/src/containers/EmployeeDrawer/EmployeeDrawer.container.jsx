import React, { useEffect, useLayoutEffect, useState } from 'react'
import { getEmployeesAPI } from '../../services/companyEmployeeService'
import { useSelector } from 'react-redux'
import { notification, Spin } from 'antd'
import EmployeeDrawerComponent from '../../components/EmployeeDrawer/EmployeeDrawer.component'

const EmployeeDrawer = ({ employeeId, drawerVisibility, setDrawerVisibility }) => {
  const [employeeData, setEmployeeData] = useState({})
  const companyId = useSelector(state => state.authentication.user.companyId)
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    getEmployeesAPI(companyId)
      .then(res => {
        const { data } = res

        const employee = data.filter(item => item.account.id === employeeId)[0]

        setEmployeeData(employee)
      })
      .catch(e => {
        notification['error']({
          message: `Get employee data failed`,
          description: `There is problem while deleting, try again later`
        })
      })
  }

  useLayoutEffect(() => {
    fetchData()
  }, [employeeId])

  const onClose = async () => {
    setDrawerVisibility(false)
  }

  if (loading) return <Spin size="large"></Spin>

  return (
    <>
      <EmployeeDrawerComponent onClose={onClose} visible={drawerVisibility} data={employeeData} />
    </>
  )
}

export default EmployeeDrawer
