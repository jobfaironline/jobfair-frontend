import { Divider, Popover, Result, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InvoiceComponent from '../../components/forms/CheckoutForm/Invoice.component';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import React, { useEffect, useState } from 'react';

const { Text, Paragraph } = Typography;
const ResultSuccessPage = () => {
  const location = useLocation();
  const [url, setUrl] = useState();
  const [data, setData] = useState();
  const history = useHistory();
  const urlDestination = location.state.invoiceURL;
  const invoiceData = location.state.invoiceData;
  const jobFairId = useSelector((state) => state?.chooseSubscription?.jobFairId);

  useEffect(async () => {
    setUrl(urlDestination);
    setData(invoiceData);
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            <Popover
              placement={'top'}
              trigger={'hover'}
              content={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <a onClick={() => history.push(PATH_COMPANY_MANAGER.SUBSCRIPTION_HISTORY)}>Go to my subscription</a>
                  <Divider />
                  {jobFairId !== '' && (
                    <a
                      onClick={() => {
                        const url = generatePath(PATH_COMPANY_MANAGER.CHECKLIST, {
                          jobFairId
                        });
                        history.push(url);
                      }}>
                      Use this subscription now!
                    </a>
                  )}
                </div>
              }>
              <FontAwesomeIcon icon={faInfoCircle} />
            </Popover>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <InvoiceComponent item={data} />
          </div>
        </div>
      </Result>
    </PageLayoutWrapper>
  );
};

export default ResultSuccessPage;
