import { Button, Form, notification } from 'antd';
import { createJobPositionsAPI } from '../../../services/jobhub-api/JobControllerService';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JobPositionFormComponent from '../../../components/forms/JobPositionForm/JobPositionForm.component';
import React from 'react';

const fakeLocationId = 'ca597973-8f39-48c0-ab91-e6a3e1ff63df';
const CreateJobPositionFormContainer = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const companyId = useSelector((state) => state?.authentication?.user?.companyId);

  const onFinish = (values) => {
    createJobPositionsAPI({
      ...values,
      companyId,
      //TODO: remove later
      locationId: fakeLocationId
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
  const componentProps = {
    form,
    onFinish,
    formItemButtons: [
      <Button type='primary' htmlType='submit' style={{ margin: '0 3rem', width: '7rem' }}>
        Create
      </Button>
    ]
  };

  return <JobPositionFormComponent {...componentProps} />;
};

export default CreateJobPositionFormContainer;
