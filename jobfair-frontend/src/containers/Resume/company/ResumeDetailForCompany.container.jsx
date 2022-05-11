import { Form, Spin, notification } from 'antd';
import { convertToDateValue } from '../../../utils/common';
import {
  evaluateApplication,
  getApplicationForCompany
} from '../../../services/jobhub-api/ApplicationControllerService';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ResumeDetailComponent from '../../../components/customized-components/Resume/ResumeDetail.component';

const ResumeDetailForCompanyContainer = ({ resumeId }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [data, setData] = useState(undefined);

  const onFinish = (values) => {
    //mapping
    const body = {
      applicationId: values['applicationId'],
      evaluateMessage: values['message'],
      status: values['status']
    };

    evaluateApplication(body)
      .then(() => {
        notification['success']({
          message: `Submit evaluation successfully`,
          description: `Your evaluation has been submitted`,
          duration: 2
        });
        history.goBack();
      })
      .catch(() => {
        notification['error']({
          message: `Submit evaluation failed`,
          description: `There is problem while submitting, try again later`,
          duration: 2
        });
      });
  };

  const fetchData = async () => {
    getApplicationForCompany(resumeId)
      .then((res) => {
        setData(res.data);
      })
      // eslint-disable-next-line no-empty-function
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChangeDob = (dateString) => convertToDateValue(dateString);

  if (data === undefined) return <Spin />;

  return (
    <>
      <ResumeDetailComponent form={form} onFinish={onFinish} data={data} handleOnChangeDob={handleOnChangeDob} />
    </>
  );
};

export default ResumeDetailForCompanyContainer;
