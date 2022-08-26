import { ArrowRightOutlined } from '@ant-design/icons';
import { Card, Timeline, Typography } from 'antd';
import { MonthFormat } from '../../../../constants/ApplicationConst';
import React from 'react';
import moment from 'moment';

const { Text, Title, Paragraph } = Typography;

export const ResumeActivityList = (props) => {
  const { data } = props;
  return (
    <Card style={{ borderRadius: '8px' }} className={'list'}>
      <Title id='certifications' level={4} style={{ marginBottom: '10px' }}>
        Activities
      </Title>
      <Timeline pending={true} pendingDot={<></>}>
        {data?.map((activity) => (
          <Timeline.Item>
            <Title style={{ marginBottom: '0' }} level={4}>
              {activity?.name}
            </Title>
            <Title level={5} style={{ margin: 0 }}>
              {activity.functionTitle} - {activity.organization}
            </Title>
            <Text>
              {moment(activity?.fromDate)?.format(MonthFormat)} <ArrowRightOutlined />{' '}
              {activity.isCurrentActivity ? 'Present' : moment(activity?.toDate)?.format(MonthFormat)}
            </Text>
            <div style={{ marginTop: '1rem' }}>
              <Text strong>Descriptions</Text>
              <Paragraph style={{ whiteSpace: 'pre-line' }}>{activity.description}</Paragraph>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};
