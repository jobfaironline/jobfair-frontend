import { Card, Timeline, Typography } from 'antd';
import { MonthFormat } from '../../../../constants/ApplicationConst';
import React from 'react';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

const ResumeEducationList = (props) => {
  const { data } = props;
  return (
    <Card style={{ borderRadius: '8px' }} className={'list'}>
      <Title id='education' level={4} style={{ marginBottom: '10px' }}>
        Education
      </Title>
      <Timeline pending={true} pendingDot={<></>}>
        {data?.map((education) => (
          <Timeline.Item>
            <Title style={{ marginBottom: '0' }} level={4}>
              {education?.school}
            </Title>
            <Text>
              {education?.qualificationId}, {education?.subject}
            </Text>
            <br />
            <Text>
              {moment(education?.fromDate).format(MonthFormat)} - {moment(education?.toDate).format(MonthFormat)}
            </Text>
            <Paragraph style={{ marginTop: '5px', whiteSpace: 'pre-line' }}>{education?.achievement}</Paragraph>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};
export default ResumeEducationList;
