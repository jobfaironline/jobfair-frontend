import { Card, Timeline, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export const ResumeReferenceList = (props) => {
  const { data } = props;
  return (
    <Card style={{ borderRadius: '8px' }} className={'list'}>
      <Title id='references' level={4} style={{ marginBottom: '10px' }}>
        References
      </Title>
      <Timeline pending={true} pendingDot={<></>}>
        {data.map((reference) => (
          <Timeline.Item>
            <Title style={{ marginBottom: '0' }} level={4}>
              {reference?.fullName}
            </Title>
            <Text strong style={{ fontSize: '1rem' }}>
              {reference?.position} at {reference?.company}
            </Text>
            <br />
            <Text>Email: {reference?.email}</Text>
            <br />
            <Text>Phone: {reference?.phoneNumber}</Text>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};
