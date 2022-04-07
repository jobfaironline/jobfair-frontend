import { Form, notification } from 'antd';
import { createJobPositionsAPI } from '../../../services/jobhub-api/JobControllerService';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateJobPositionFormComponent from '../../../components/forms/CreateJobPositionForm/CreateJobPositionForm.component';
import React from 'react';

const CreateJobPositionFormContainer = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const companyId = useSelector((state) => state?.authentication?.user?.companyId);

  const onFinish = (values) => {
    createJobPositionsAPI({
      ...values,
      companyId
    })
      .then(() => {
        notification['success']({
          message: `Create job position data successfully`
        });
        form.resetFields();
        history.goBack();
      })
      .catch((e) => {
        notification['error']({
          message: `Create job position data failed`,
          description: `Error detail: ${e}`
        });
      });
  };
  return <CreateJobPositionFormComponent form={form} onFinish={onFinish} />;
};

export default CreateJobPositionFormContainer;
