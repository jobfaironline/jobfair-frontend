import React, { useEffect, useState } from 'react'
import { getEmployeesAPI } from '../../services/companyEmployeeService'
import { useSelector } from 'react-redux'
import EmployeeDrawerComponent from '../../components/EmployeeDrawer/EmployeeDrawer.component'

const EmployeeDrawer = ({ employeeId, drawerVisibility, setDrawerVisibility }) => {
  const [employeeData, setEmployeeData] = useState({})
  const companyId = useSelector(state => state.authentication.user.companyId)

  const fetchData = async () => {
    getEmployeesAPI(companyId)
      .then(res => {
        const { data } = res

        const employee = data.filter(item => item.account.id === employeeId)[0]

        console.log(employee)

        setEmployeeData(employee)
      })
      .catch(e => {
        notification['error']({
          message: `Get employee data failed`,
          description: `There is problem while deleting, try again later`
        })
      })
  }

  useEffect(() => {
    fetchData()
  }, [employeeId])

  return (
    <>
      <EmployeeDrawerComponent
        drawerVisibility={drawerVisibility}
        setDrawerVisibility={setDrawerVisibility}
        data={employeeData}
      />
    </>
  )
}

export default EmployeeDrawer
