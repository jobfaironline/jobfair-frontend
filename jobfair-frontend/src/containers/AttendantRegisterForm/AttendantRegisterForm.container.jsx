import { Card, Form, Modal, Typography } from 'antd';
import { PATH } from '../../constants/Paths/Path';
import { genderType } from '../../constants/GenderConst';
import { registerAttendantAPI } from '../../services/jobhub-api/AttendantControllerService';
import { useHistory } from 'react-router-dom';
import AttendantRegisterFormComponent from '../../components/forms/AttendantRegisterForm/AttendantRegisterForm.component';
import React from 'react';
import RegisterSuccessContentComponent from '../../components/commons/RegisterSuccessContent/RegisterSuccessContent.component';

const AttendantRegisterFormContainer = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const handleRegisterAttendant = async (values) => {
    const body = {
      ...values
    };
    try {
      const res = await registerAttendantAPI(body);
      if (res.status === 201) {
        Modal.success({
          title: 'Register attendant account successfully !',
          width: '30rem',
          closable: true,
          keyboard: false,
          maskClosable: true,
          onOk: () => history.push(PATH.LOGIN_PAGE),
          content: <RegisterSuccessContentComponent email={values.email} />
        });
      }
    } catch (err) {
      Modal.error({
        title: 'Register attendant account failed !',
        width: '30rem',
        height: '40rem',
        closable: true,
        maskClosable: true,
        content: (
          <>
            <Typography.Text strong>{err.response.data.message}</Typography.Text>
          </>
        )
      });
    }
  };
  return (
    <Card
      style={{
        boxShadow: '5px 8px 24px 5px rgba(208, 216, 243, 0.6)',
        marginBottom: '2rem'
      }}
      headStyle={{ backgroundColor: 'white', border: 0 }}
      bodyStyle={{ backgroundColor: 'white', border: 0 }}>
      <AttendantRegisterFormComponent
        form={form}
        handleRegisterAttendant={handleRegisterAttendant}
        genderType={genderType}
      />
    </Card>
  );
};

export default AttendantRegisterFormContainer;
