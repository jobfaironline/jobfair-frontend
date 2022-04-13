import { Spin } from 'antd';
import PublishJobFairComponent from '../../components/customized-components/PublishJobFair/PublishJobFair.component';
import React from 'react';

const PublishJobFairContainer = ({ onHandlePrev, onFinish, data }) => {
  if (data === undefined) return <Spin />;
  return <PublishJobFairComponent onHandlePrev={onHandlePrev} onFinish={onFinish} data={data} />;
};

export default PublishJobFairContainer;
