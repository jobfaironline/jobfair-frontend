import { Card, Timeline, Typography } from 'antd';
import React from 'react';

const { Title, Text, Paragraph } = Typography;

const ResumeEducationList = (props) => {
  const { data } = props;
  return (
    <Card style={{ borderRadius: '8px' }} className={'list'}>
      <Title id='education' level={4} style={{ marginBottom: '10px' }}>
        Education
      </Title>
      <Timeline pending={true} pendingDot={<></>}>
        {data.map((education) => (
          <Timeline.Item>
            <Title style={{ marginBottom: '0' }} level={4}>
              {education?.school}
            </Title>
            <Text>
              {education?.qualificationId}, {education?.subject}
            </Text>
            <br />
            <Text>
              {education?.fromDate} - {education?.toDate}
            </Text>
            <Paragraph style={{ marginTop: '5px' }}>{education?.achievement}</Paragraph>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};
export default ResumeEducationList;
