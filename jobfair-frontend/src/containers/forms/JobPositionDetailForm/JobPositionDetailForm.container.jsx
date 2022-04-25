import { Button, Form, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { updateJobPositionAPI } from '../../../services/jobhub-api/JobControllerService';
import JobPositionFormComponent from '../../../components/forms/JobPositionForm/JobPositionForm.component';
import React, { useEffect } from 'react';

const JobPositionDetailFormContainer = (props) => {
  const { jobPosition, onCancel, isDisplayDetail = false, onClickUpdate } = props;

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await updateJobPositionAPI(values, jobPosition.id);
      notification['success']({
        message: `Update job position successfully`
      });
      onCancel();
    } catch (e) {
      notification['error']({
        message: `Update job position failed`,
        description: `Error detail: ${e}`
      });
    }
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
      <Button type='primary' className={'button'} onClick={onCancel}>
        Cancel
      </Button>,
      <Button type='primary' htmlType='submit' className={'button'}>
        Update
      </Button>
    ],
    onCancel,
    isDisplayDetail,
    extra: isDisplayDetail
      ? [
          <a href={'#'} onClick={onClickUpdate}>
            <FontAwesomeIcon icon={faPen} size={'2x'} color={'black'} />
          </a>
        ]
      : undefined
  };

  return (
    <>
      <JobPositionFormComponent {...componentProps} />
    </>
  );
};

export default JobPositionDetailFormContainer;
