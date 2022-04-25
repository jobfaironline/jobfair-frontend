import './QuestionBank.styles.scss';
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import QuestionBankContainer from '../../containers/QuestionBank/QuestionBank.container';
import React from 'react';

const QuestionBankPage = () => {
  //useLocation
  const location = useLocation();
  const jobPositionId = location.state?.jobPositionId;
  return (
    <div className='page'>
      <div className={'page-title'}>
        <Typography.Title level={2}>Question bank management</Typography.Title>
      </div>
      <QuestionBankContainer jobPositionId={jobPositionId} />
    </div>
  );
};

export default QuestionBankPage;
