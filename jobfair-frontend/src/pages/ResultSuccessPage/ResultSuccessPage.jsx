import { Button, Result, Typography } from 'antd';
import { PATH } from '../../constants/Paths/Path';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React from 'react';

const { Paragraph, Text } = Typography;

export const ResultSuccessPage = () => {
  const history = useHistory();
  // const {title, subTitle} = location.state;
  const email = useSelector((state) => state.authentication?.user?.email);

  return (
    <PageLayoutWrapper className='page'>
      <Result status='success' title='Payment successfully'>
        <div className='desc'>
          <Paragraph>
            <Text
              strong
              style={{
                fontSize: 16,
                color: 'green'
              }}>
              You're Premium now.
            </Text>
          </Paragraph>
          <Paragraph>
            Your purchase is completed. A receipt for order will be sent to your email:{' '}
            <a href={`mailto:${email}`}>{email}</a>.
          </Paragraph>
          <Button type='primary' key='console' onClick={() => history.push(PATH.INDEX)}>
            Back to home page
          </Button>
        </div>
      </Result>
    </PageLayoutWrapper>
  );
};
