import { Form, notification } from 'antd';
import { createEmployeesAPI } from '../../services/company-employee-controller/CompanyEmployeeControllerService';
import { useSelector } from 'react-redux';
import EmployeeFormComponent from '../../components/forms/EmployeeForm/EmployeeForm.component';
import React from 'react';

const EmployeeForm = () => {
  const [form] = Form.useForm();
  const companyId = useSelector((state) => state.authentication.user.companyId);

  const onFinish = (values) => {
    createEmployeesAPI({
      companyId,
      email: values.email,
      firstName: values.firstName,
      gender: values.gender,
      lastName: values.lastName,
      middleName: values.middleName,
      phone: values.phone
    })
      .then(() => {
        notification['success']({
          message: `Add employee successfully`,
          description: `Added employee ${values.email} successfully`
        });
        form.resetFields();
      })
      .catch(() => {
        notification['error']({
          message: `Add employee failed`,
          description: `There is problem while adding, try again later`
        });
      });
  };

  return (
    <>
      <EmployeeFormComponent form={form} onFinish={onFinish} />
    </>
  );
};

export default EmployeeForm;
