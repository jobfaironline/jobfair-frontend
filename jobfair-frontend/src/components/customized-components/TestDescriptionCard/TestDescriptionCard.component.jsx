import './TestDescriptionCard.styles.scss';
import { Card, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;
const { Meta } = Card;
const TestDescriptionCardComponent = ({ title, content, metaData }) => (
  <div>
    <Card title={title} className={'description'}>
      <Text>{content}</Text>
      <Meta description={metaData} />
    </Card>
  </div>
);

export default TestDescriptionCardComponent;
