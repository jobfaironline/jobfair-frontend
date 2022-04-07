import { Button, Result, Space, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import { PATH } from '../../constants/Paths/Path';
import React from 'react';

const ResultFailedComponent = () => {
  const { Paragraph, Text } = Typography;
  const history = useHistory();

  return (
    <>
      <Result
        status='error'
        title='Submission Failed'
        subTitle='Please check and modify the following information before resubmitting.'
        extra={[
          <Button type='primary' key='console' onClick={() => history.push(PATH.INDEX)}>
            Back to home page
          </Button>
        ]}>
        <div className='desc'>
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16
              }}>
              The content you submitted has the following error:
            </Text>
          </Paragraph>
          <Paragraph>
            <Space>
              <CloseCircleOutlined className='site-result-demo-error-icon' />
              There is a registration still in evaluating process. Please wait at least 12 hours to resubmit another
              registration
              <Link to='/contacts'>Contact with admin &gt;&gt;</Link>
            </Space>
          </Paragraph>
        </div>
      </Result>
      ,
    </>
  );
};

export default ResultFailedComponent;
