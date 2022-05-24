import { Descriptions, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

export const CompactResumeDetail = (props) => {
  const { data } = props;
  return (
    <Descriptions title={'Applicant resume'}>
      <Descriptions.Item label='Full name'>
        {data.attendant.account.firstname} {data.attendant.account.middlename} {data.attendant.account.lastname}
      </Descriptions.Item>
      <Descriptions.Item label='Email'> {data.email}</Descriptions.Item>
      <Descriptions.Item label='Phone'> {data.phone}</Descriptions.Item>
      <Descriptions.Item label='Year of exp:'> {data.yearOfExp}</Descriptions.Item>
      <Descriptions.Item label='Job level'>{data.jobLevel}</Descriptions.Item>
      {data.activities.map((activity) => (
        <Text>{activity.name}</Text>
      ))}
      {data.certifications.map((certification) => (
        <Text>{certification.name}</Text>
      ))}
      {data.educations.map((education) => (
        <Text>{education.school}</Text>
      ))}
      {data.references.map((reference) => (
        <Text>{reference.fullName}</Text>
      ))}
      {data.skills.map((skill) => (
        <Text>{skill.name}</Text>
      ))}
      {data.workHistories.map((workHistory) => (
        <Text>{workHistory.company}</Text>
      ))}
    </Descriptions>
  );
};
