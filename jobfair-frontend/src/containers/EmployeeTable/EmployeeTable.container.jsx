import React, { useEffect, useState } from 'react'
import EmployeeTableComponent from '../../components/EmployeeTable/EmployeeTable.component'
import { deleteEmployeeAPI, getEmployeesAPI } from '../../services/companyEmployeeService'
import { Space, notification } from 'antd'
import { useSelector } from 'react-redux'

const EmployeeTable = ({ extra }) => {
  const [employeeData, setemployeeData] = useState([])
  const companyId = useSelector(state => state.authentication.user.companyId)

  const fetchData = async () => {
    getEmployeesAPI(companyId)
      .then(res => {
        console.log(res)
        const { data } = res

        const newValues = data.map(employee => {
          return {
            id: employee.account.id,
            email: employee.account.email,
            phone: employee.account.phone,
            status: employee.account.status
          }
        })

        setemployeeData(newValues)
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
  }, [])

  const handleDelete = employeeId => {
    deleteEmployeeAPI(employeeId)
      .then(res => {
        notification['success']({
          message: `Delete employee successfully`,
          description: `Deleted employee ${employeeId} successfully`
        })
        fetchData()
      })
      .catch(e => {
        notification['error']({
          message: `Delete employee failed`,
          description: `There is problem while deleting, try again later`
        })
      })
  }

  const handleGetDetail = employeeId => {
    console.log(employeeId)
  }

  return (
    <div>
      <EmployeeTableComponent
        employeeData={employeeData}
        editable
        extra={{
          title: 'Actions',
          key: 'action',
          render: (text, record) => {
            return (
              <Space size="middle">
                <a
                  onClick={() => {
                    handleGetDetail(record.id)
                  }}
                >
                  Detail
                </a>
                <a
                  onClick={() => {
                    handleDelete(record.id)
                  }}
                >
                  Delete
                </a>
              </Space>
            )
          }
        }}
      />
    </div>
  )
}

export default EmployeeTable
