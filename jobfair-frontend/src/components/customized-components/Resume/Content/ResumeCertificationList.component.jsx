import { Button, Card, Timeline, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const { Title, Text } = Typography;

export const ResumeCertificationList = (props) => {
  const { data } = props;
  return (
    <Card style={{ borderRadius: '8px' }} className={'list'}>
      <Title id='certifications' level={4} style={{ marginBottom: '10px' }}>
        Certifications
      </Title>
      <Timeline pending={true} pendingDot={<></>}>
        {data.map((certification) => (
          <Timeline.Item>
            <Title style={{ marginBottom: '0' }} level={4}>
              {certification?.name}
            </Title>
            <Text strong style={{ fontSize: '1rem' }}>
              {certification?.institution}
            </Text>
            <br />
            <Text>Issued date: {certification?.issueDate}</Text>
            <br />
            <Button
              style={{ padding: '5px 1rem', marginTop: '5px', borderRadius: '8px' }}
              type={'primary'}
              onClick={() => {
                window.open(certification?.certificationLink);
              }}>
              Show credential <FontAwesomeIcon style={{ marginLeft: '5px' }} icon={faUpRightFromSquare} />
            </Button>
          </Timeline.Item>
        ))}
      </Timeline>
    </Card>
  );
};
