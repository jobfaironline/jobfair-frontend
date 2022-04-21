import './QuestionBank.styles.scss';
import { Typography } from 'antd';
import QuestionBankContainer from '../../containers/QuestionBank/QuestionBank.container';
import React from 'react';

const QuestionBankPage = () => (
  <div className='page'>
    <div className={'page-title'}>
      <Typography.Title level={2}>Question bank management</Typography.Title>
    </div>
    <QuestionBankContainer />
  </div>
);

export default QuestionBankPage;
