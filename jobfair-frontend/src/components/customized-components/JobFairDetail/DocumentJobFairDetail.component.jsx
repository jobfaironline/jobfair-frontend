import { Descriptions, Typography } from 'antd';
import { handleStatusTag } from '../../../utils/common';
import React from 'react';

const { Title } = Typography;

const DocumentJobFairDetailComponent = (props) => {
  const { data } = props;

  return (
    <>
      <Title level={3}>Job fair: {data.name}</Title>
      <Descriptions>
        <Descriptions.Item label='Status'>{handleStatusTag(data.status)}</Descriptions.Item>
        <Descriptions.Item label='Total booths'>{1} slot(s)</Descriptions.Item>
        <Descriptions.Item label='Description' style={{ textAlign: 'start' }}>
          {data.description}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default DocumentJobFairDetailComponent;
