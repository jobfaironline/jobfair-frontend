import { Button, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import React from 'react';

const SubscriptionDetailContainer = (props) => {
  const { type } = props;

  return <SubscriptionDetailComponent type={type} />;
};

const { Title, Paragraph } = Typography;

const SubscriptionDetailComponent = ({ type }) => {
  const history = useHistory();
  const renderHeaderBaseOnType = () => {
    switch (type) {
      case 'FREE':
        return (
          <div style={{ backgroundColor: '#1D75DE', height: '20rem' }}>
            <Typography>
              <Title>You chose: FREE PACK</Title>
              <Paragraph>Complete checkout form below to continue...</Paragraph>
            </Typography>
            <Button
              type={'link'}
              onClick={() => {
                history.push(PATH_COMPANY_MANAGER.SUBSCRIPTION_DASH_BOARD);
              }}
              style={{ fontSize: '1.2rem' }}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 5 }} />
              Back to subscription plans
            </Button>
          </div>
        );
      case 'STANDARD':
        return (
          <div style={{ backgroundColor: '#CDF564', height: '20rem' }}>
            <Typography>
              <Title>You chose: STANDARD PACK</Title>
              <Paragraph>Complete checkout form below to continue...</Paragraph>
            </Typography>
            <Button
              type={'link'}
              onClick={() => {
                history.push(PATH_COMPANY_MANAGER.SUBSCRIPTION_DASH_BOARD);
              }}
              style={{ fontSize: '1.2rem' }}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 5 }} />
              Back to subscription plans
            </Button>
          </div>
        );
      case 'PREMIUM':
        return (
          <div style={{ backgroundColor: '#a464e7', height: '20rem' }}>
            <Typography>
              <Title>You chose: PREMIUM PACK</Title>
              <Paragraph>Complete checkout form below to continue...</Paragraph>
            </Typography>
            <Button
              type={'link'}
              onClick={() => {
                history.push(PATH_COMPANY_MANAGER.SUBSCRIPTION_DASH_BOARD);
              }}
              style={{ fontSize: '1.2rem' }}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 5 }} />
              Back to subscription plans
            </Button>
          </div>
        );
    }
  };
  return (
    <div>
      {renderHeaderBaseOnType()}
      {/*<CheckoutForm />*/}
    </div>
  );
};

export default SubscriptionDetailContainer;
