import React, { useEffect, useState } from 'react'
import EmployeeDrawer from '../../containers/EmployeeDrawer/EmployeeDrawer.container'
import {
  deleteEmployeeAPI,
  getEmployeesAPI
} from '../../services/company-employee-controller/CompanyEmployeeControllerService'
import { Button, notification, Popconfirm, Space } from 'antd'
import { useSelector } from 'react-redux'
import EmployeeTableColumn from '../../components/EmployeeTable/EmployeeTable.column'
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container'

const EmployeeTable = () => {
  //pagination
  /* eslint-disable no-unused-vars */

  const [totalRecord, setTotalRecord] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  //
  const [employeeData, setEmployeeData] = useState([])
  const [drawerVisibility, setDrawerVisibility] = useState(false)
  const [neededEmployee, setNeededEmployee] = useState(null)
  const companyId = useSelector(state => state.authentication.user.companyId)

  const fetchData = async () => {
    getEmployeesAPI(companyId)
      .then(res => {
        const { data } = res

        const newValues = data.map((employee, index) => {
          const { firstname, middlename, lastname } = employee.account
          const fullName = firstname + ' ' + (middlename ? middlename + ' ' : '') + lastname

          return {
            id: employee.account.id,
            no: index + 1,
            fullName: fullName,
            email: employee.account.email,
            phone: employee.account.phone,
            status: employee.account.status
          }
        })

        setEmployeeData(newValues)
      })
      .catch(() => {
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
      .then(() => {
        notification['success']({
          message: `Delete employee successfully`,
          description: `Deleted employee ${employeeId} successfully`
        })
        fetchData()
      })
      .catch(() => {
        notification['error']({
          message: `Delete employee failed`,
          description: `There is problem while deleting, try again later`
        })
      })
  }

  const handleGetDetail = employeeId => {
    setDrawerVisibility(true)
    setNeededEmployee(employeeId)
  }

  const handlePageChange = (page, pageSize) => {
    if (page > 0) {
      setCurrentPage(page - 1)
    } else {
      setCurrentPage(page)
    }
    setPageSize(pageSize)
  }

  const employeeTableProps = {
    tableData: employeeData,
    tableColumns: EmployeeTableColumn,
    onSearch: () => {
      //TODO: fetch data for search
    },
    extra: [
      {
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
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                cancelText="No"
                onConfirm={() => {
                  handleDelete(record.id)
                }}
              >
                <Button type="link" disabled={record.status === 'INACTIVE'}>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          )
        }
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  }

  return (
    <div>
      {neededEmployee != null ? (
        <EmployeeDrawer
          drawerVisibility={drawerVisibility}
          setDrawerVisibility={setDrawerVisibility}
          employeeId={neededEmployee}
        />
      ) : null}
      {/*<EmployeeTableComponent
        employeeData={employeeData}
        editable
        extra={}
      />*/}
      <CommonTableContainer {...employeeTableProps} />
    </div>
  )
}

export default EmployeeTable
