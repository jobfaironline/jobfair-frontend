import PublishJobFairComponent from '../../components/customized-components/PublishJobFair/PublishJobFair.component';
import React from 'react';

const PublishJobFairContainer = ({ onHandlePrev, onFinish, data }) => (
  <PublishJobFairComponent onHandlePrev={onHandlePrev} onFinish={onFinish} data={data} />
);

export default PublishJobFairContainer;
