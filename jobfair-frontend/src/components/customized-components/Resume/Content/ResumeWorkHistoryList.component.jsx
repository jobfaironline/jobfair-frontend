import { Card, Timeline, Typography } from 'antd';
import { MonthFormat } from '../../../../constants/ApplicationConst';
import React from 'react';
import moment from 'moment';

const { Title, Text, Paragraph } = Typography;

export const ResumeWorkHistoryList = (props) => {
  const { data } = props;
  return (
    <Card style={{ borderRadius: '8px' }} className={'list'}>
      <Title id='workExperience' level={4} style={{ marginBottom: '10px' }}>
        Work & Experience
      </Title>
      <Timeline pending={true} pendingDot={<></>}>
        {data?.map((history) => (
          <Timeline.Item>
            <Title style={{ marginBottom: '0' }} level={4}>
              {history?.position}
            </Title>
            <Text strong style={{ fontSize: '1rem' }}>
              {history?.company}
            </Text>
            <br />
            <Text>
              {moment(history?.fromDate).format(MonthFormat)} - {moment(history?.toDate).format(MonthFormat)}
            </Text>
            <Paragraph style={{ marginTop: '5px' }}>{history?.description}</Paragraph>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};
