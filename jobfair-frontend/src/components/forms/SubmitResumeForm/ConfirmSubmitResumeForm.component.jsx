import { Button, Form, Space, Typography } from 'antd';
import { PATH_ATTENDANT } from '../../../constants/Paths/Path';
import { TestStatus } from '../../../constants/ApplicationConst';
import { generatePath, useHistory } from 'react-router-dom';
import React from 'react';

const ConfirmSubmitResumeFormComponent = (props) => {
  const { onFinish, applicationData, quizId } = props;
  const history = useHistory();

  const messageGenerate = () => {
    if (applicationData === undefined) return;
    switch (applicationData.testStatus) {
      case TestStatus.PASS:
        return (
          <Typography.Text type='success'>Congratulations! You have passed the entry test. Apply now ?</Typography.Text>
        );
      case TestStatus.FAIL:
        return <Typography.Text type='danger'>Sorry! You have failed the entry test.</Typography.Text>;
      case TestStatus.IN_PROGRESS:
        return (
          <Button
            onClick={() => {
              const url = generatePath(PATH_ATTENDANT.ATTEMPT_TEST_PAGE, {
                quizId
              });
              history.push(url, { from: window.location.pathname });
            }}>
            Resume test
          </Button>
        );
      default:
        return null;
    }
  };

  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      onFinish={onFinish}
      requiredMark='required'
      autoComplete='off'
      labelAlign={'left'}
      scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Form.Item>
          {messageGenerate()}
          <Button
            type='primary'
            htmlType='submit'
            style={{ position: 'absolute', right: '0' }}
            className={'button'}
            disabled={applicationData?.testStatus === TestStatus.FAIL}>
            Apply
          </Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default ConfirmSubmitResumeFormComponent;
