import { Button, Form, notification } from 'antd';
import { deleteJobPositionAPI, updateJobPositionAPI } from '../../../services/jobhub-api/JobControllerService';
import { useHistory, useLocation } from 'react-router-dom';
import JobPositionFormComponent from '../../../components/forms/JobPositionForm/JobPositionForm.component';
import React, { useEffect } from 'react';

const JobPositionDetailFormContainer = () => {
  const location = useLocation();
  const jobPosition = location.state.jobPosition;

  const [form] = Form.useForm();
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault();
    deleteJobPositionAPI(jobPosition.id)
      .then(() => {
        notification['success']({
          message: `Delete job position successfully`
        });
        //after delete success, push back to list page
        history.goBack();
      })
      .catch((err) => {
        notification['error']({
          message: `Update job position failed`,
          description: `Error detail: ${err}`
        });
      });
  };

  const onFinish = (values) => {
    // eslint-disable-next-line no-console
    updateJobPositionAPI(values, jobPosition.id)
      .then(() => {
        notification['success']({
          message: `Update job position successfully`
        });
        //after update success, go back
        history.goBack();
      })
      .catch((err) => {
        notification['error']({
          message: `Update job position failed`,
          description: `Error detail: ${err}`
        });
      });
  };

  const init = () => {
    jobPosition['skillTagIds'] = jobPosition['skillTagDTOS']?.map((item) => item.id);
    jobPosition['subCategoryIds'] = jobPosition['subCategoryDTOs']?.map((item) => item.id);
    jobPosition['preferredLanguage'] = jobPosition['language'];
    form.setFieldsValue({ ...jobPosition });
  };

  useEffect(() => {
    init();
  }, [jobPosition]);

  const componentProps = {
    form,
    onFinish,
    formItemButtons: [
      <Button type='primary' htmlType='submit' style={{ margin: '0 3rem', width: '7rem' }}>
        Update
      </Button>,
      <Button
        type='primary'
        htmlType='submit'
        style={{ margin: '0 3rem', width: '7rem' }}
        onClick={(e) => handleDelete(e)}>
        Delete
      </Button>
    ]
  };

  return (
    <>
      <JobPositionFormComponent {...componentProps} />
    </>
  );
};

export default JobPositionDetailFormContainer;
