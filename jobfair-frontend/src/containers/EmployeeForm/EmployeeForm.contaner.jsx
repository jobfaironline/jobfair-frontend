import React, { useState } from "react";
import { createEmployeesAPI } from "../../services/companyEmployeeService";
import {
  Select,
  Button,
  Form,
  Input
} from 'antd';
import EmployeeFormComponent from '../../components/EmployeeForm/EmployeeForm.component';
import { useSelector } from "react-redux";

const EmployeeForm = () => {
  const [form] = Form.useForm();
  const companyId = useSelector((state) => state.authentication.user.companyId);


  const onFinish = (values) => {
    console.log('Received values of form: ', values);

    createEmployeesAPI({
      companyId: companyId,
      confirmPassword: values.confirm,
      email: values.email,
      firstName: values.firstName,
      gender: values.gender,
      lastName: values.lastName,
      middleName: values.middleName,
      password: values.password,
      phone: values.phone
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };;

  return (
    <>
        <EmployeeFormComponent form={form} onFinish={onFinish}/>
    </>
  );
};

export default EmployeeForm;