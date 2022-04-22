import { Form } from 'antd';
import CreateQuestionFormComponent from '../../../components/forms/CreateQuestionForm/CreateQuestionForm.component';
import React from 'react';

const CreateQuestionFormContainer = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    //TODO: call API to save question
    console.log(values);
  };
  return <CreateQuestionFormComponent form={form} onFinish={onFinish} />;
};

export default CreateQuestionFormContainer;
