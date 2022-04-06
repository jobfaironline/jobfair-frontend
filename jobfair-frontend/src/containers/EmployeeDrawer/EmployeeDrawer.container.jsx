/* eslint-disable no-unused-vars */
import React, { useLayoutEffect, useState } from 'react'
import { getEmployeeByIdAPI } from '../../services/company-employee-controller/CompanyEmployeeControllerService'
import { useSelector } from 'react-redux'
import { notification, Spin } from 'antd'
import EmployeeDrawerComponent from '../../components/EmployeeDrawer/EmployeeDrawer.component'

const EmployeeDrawer = ({
  employeeId,
  drawerVisibility,
  setDrawerVisibility
}) => {
  const [employeeData, setEmployeeData] = useState({})
  const [loading, setLoading] = useState(false)

  const fetchData = async () => {
    getEmployeeByIdAPI(employeeId)
      .then(res => {
        const { data } = res

        setEmployeeData(data)
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
      <EmployeeDrawerComponent
        onClose={onClose}
        visible={drawerVisibility}
        data={employeeData}
      />
    </>
  )
}

export default EmployeeDrawer
