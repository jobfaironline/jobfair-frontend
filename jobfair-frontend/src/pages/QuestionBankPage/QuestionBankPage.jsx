import './QuestionBankPage.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from 'antd';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
import QuestionBankContainer from '../../containers/QuestionBank/QuestionBank.container';
import React from 'react';

const QuestionBankPage = () => {
  const location = useLocation();
  const jobPositionId = location.state?.jobPositionId;
  const history = useHistory();

  return (
    <PageLayoutWrapper className='page question-bank-page'>
      <div className={'page-title'}>
        <Typography.Title level={2}>Question bank management</Typography.Title>
      </div>
      <a
        className={'back'}
        onClick={() => {
          history.goBack();
        }}>
        <FontAwesomeIcon icon={faArrowLeft} size={'1x'} color={'black'} />
        <Typography.Title level={5}>Return to company profile page</Typography.Title>
      </a>
      <QuestionBankContainer jobPositionId={jobPositionId} />
    </PageLayoutWrapper>
  );
};

export default QuestionBankPage;
