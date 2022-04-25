import { Form, notification } from 'antd';
import { getQuestionByCriteria } from '../../../services/jobhub-api/QuestionControllerService';
import QuestionFormComponent from '../../../components/forms/CreateQuestionForm/QuestionForm.component';
import React, { useEffect, useState } from 'react';

const CreateQuestionFormContainer = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState({});
  const [arrKey, setArrKey] = useState([]);
  const onFinish = (values) => {
    //TODO: call API to save question
    const body = {
      choicesList: [
        {
          content: '',
          correct: false
        }
      ],
      content: '',
      jobPositionId: ''
    };
    console.log(values);
  };
  useEffect(async () => {
    try {
      const res = await getQuestionByCriteria();
      setData({
        questions: res.data.content
      });
    } catch (e) {
      notification['error']({
        message: 'Error while fetching data'
      });
    }
  }, []);
  form.setFieldsValue({ ...data });

  const handleEdit = (e, id) => {
    if (e.target.checked) setArrKey((prevState) => [id, ...prevState]);
    else {
      const newData = arrKey.filter((item) => item !== id);
      setArrKey(newData);
    }
  };

  return (
    <QuestionFormComponent form={form} onFinish={onFinish} data={data} handleEdit={handleEdit} arrKey={arrKey} />
  );
};

export default CreateQuestionFormContainer;
