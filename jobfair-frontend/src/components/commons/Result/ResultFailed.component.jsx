import { CloseCircleOutlined } from '@ant-design/icons';
import { Result, Space, Typography } from 'antd';
import React from 'react';

const ResultFailedComponent = () => {
  const { Paragraph, Text } = Typography;
  // const history = useHistory();

  return (
    <>
      <Result
        status='error'
        title='Failed to checkout'
        subTitle='Please check and modify the following information before resubmitting.'
        extra={
          [
            // <Button type='primary' key='console' onClick={() => history.push(PATH.INDEX)}>
            //   Back to home page
            // </Button>
          ]
        }>
        <div className='desc'>
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16
              }}>
              There is an error occurred when we process your transaction
            </Text>
          </Paragraph>
          <Paragraph>
            <Space>
              <CloseCircleOutlined className='site-result-demo-error-icon' />
              Sorry! The card you provided is invalid. Please check your card carefully and try again!
            </Space>
          </Paragraph>
        </div>
      </Result>
      ,
    </>
  );
};

export default ResultFailedComponent;
