import { Result, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React, { useEffect, useState } from 'react';

const { Text, Paragraph } = Typography;
const ResultSuccessPage = () => {
  const location = useLocation();
  const [url, setUrl] = useState();
  useEffect(() => {
    const urlDestination = location.state.invoiceURL;
    setUrl(urlDestination);
  }, [location]);
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
              Thank you for choosing JobHub!
            </Text>
          </Paragraph>
          <Paragraph>
            {' '}
            Your purchase is completed. You can click{' '}
            <a>
              <Text strong onClick={() => window.open(url)}>
                here
              </Text>
            </a>{' '}
            to view your receipt
          </Paragraph>
        </div>
      </Result>
    </PageLayoutWrapper>
  );
};

export default ResultSuccessPage;
