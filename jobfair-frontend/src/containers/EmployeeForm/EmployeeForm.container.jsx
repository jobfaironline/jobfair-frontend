import React from 'react'
import {createEmployeesAPI} from '../../services/company-employee-controller/CompanyEmployeeControllerService'
import {Form, notification} from 'antd'
import EmployeeFormComponent from '../../components/EmployeeForm/EmployeeForm.component'
import {useSelector} from 'react-redux'

const EmployeeForm = () => {
  const [form] = Form.useForm()
  const companyId = useSelector(state => state.authentication.user.companyId)

  const onFinish = values => {
    createEmployeesAPI({
      companyId: companyId,
      email: values.email,
      firstName: values.firstName,
      gender: values.gender,
      lastName: values.lastName,
      middleName: values.middleName,
      phone: values.phone
    })
      .then(data => {
        notification['success']({
          message: `Add employee successfully`,
          description: `Added employee ${values.email} successfully`
        })
        form.resetFields()
      })
      .catch(err => {
        notification['error']({
          message: `Add employee failed`,
          description: `There is problem while adding, try again later`
        })
      })
  }

  return (
    <>
      <EmployeeFormComponent form={form} onFinish={onFinish}/>
    </>
  )
}

export default EmployeeForm
