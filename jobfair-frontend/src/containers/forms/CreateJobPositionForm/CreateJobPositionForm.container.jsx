import { Button, Form, notification } from 'antd';
import { createJobPositionsAPI } from '../../../services/jobhub-api/JobControllerService';
import { useSelector } from 'react-redux';
import JobPositionFormComponent from '../../../components/forms/JobPositionForm/JobPositionForm.component';
import React from 'react';

//TODO: remove later
const fakeLocationId = 'ca597973-8f39-48c0-ab91-e6a3e1ff63df';
const CreateJobPositionFormContainer = (props) => {
  const { onCancel } = props;
  const [form] = Form.useForm();
  const companyId = useSelector((state) => state?.authentication?.user?.companyId);

  const onFinish = async (values) => {
    try {
      await createJobPositionsAPI({
        ...values,
        companyId,
        //TODO: remove later
        locationId: fakeLocationId
      });
      notification['success']({
        message: `Create job position data successfully`
      });
      form.resetFields();
      onCancel();
    } catch (e) {
      notification['error']({
        message: `Create job position data failed`,
        description: `Error detail: ${e}`
      });
    }
  };
  const componentProps = {
    form,
    onFinish,
    formItemButtons: [
      <Button type='primary' className={'button'} onClick={() => onCancel()}>
        Cancel
      </Button>,
      <Button type='primary' htmlType='submit' className={'button'}>
        Create
      </Button>
    ],
    onCancel
  };

  return <JobPositionFormComponent {...componentProps} />;
};

export default CreateJobPositionFormContainer;
