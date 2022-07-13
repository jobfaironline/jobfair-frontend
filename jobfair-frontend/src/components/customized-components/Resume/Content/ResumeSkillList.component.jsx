import { Card, Divider, Rate, Timeline, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

export const ResumeSkillList = (props) => {
  const { data } = props;
  return (
    <Card style={{ borderRadius: '8px' }} className={'list'}>
      <Title id='skills' level={3} style={{ marginBottom: '10px' }}>
        Professional Skills
      </Title>
      <Timeline pending={true} pendingDot={<></>}>
        {data?.map((skill, index) => (
          <div>
            {index !== 0 ? <Divider style={{ margin: '10px 0' }} /> : null}
            <Title style={{ marginBottom: '0' }} level={4}>
              {skill?.name}
            </Title>
            <Rate defaultValue={skill?.proficiency} disabled={true} />
          </div>
        ))}
      </Timeline>
    </Card>
  );
};
