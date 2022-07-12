import { Avatar, Button, Card, Descriptions, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { convertEnumToString } from '../../../utils/common';
import React from 'react';
import ResumeDetailForAttendantContainer from '../../../containers/Resume/attendant/ResumeDetailForAttendant.container';
import './CompactResumeDetail.style.scss';

export const CompactResumeDetail = (props) => {
  const { data } = props;

  const handleOpenResume = () => {
    Modal.info({
      title: 'Resume detail',
      width: '90rem',
      closable: true,
      maskClosable: true,
      content: <ResumeDetailForAttendantContainer resume={data} attendantId={data.attendant.account.id} />
    });
  };

  return (
    <div className='compact-resume-wrapper'>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem' }}>
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
        <Descriptions title={'Applicant resume'}>
          <Descriptions.Item label='Full name' span={24}>
            {data.attendant.account.firstname} {data.attendant.account.middlename} {data.attendant.account.lastname}
          </Descriptions.Item>
          <Descriptions.Item label='Email' span={24} className='unimportant-field'>
            {data.email}
          </Descriptions.Item>
          <Descriptions.Item label='Phone' span={24}>
            {' '}
            {data.phone}
          </Descriptions.Item>
          <Descriptions.Item label='Year of exp:' span={24} className='unimportant-field'>
            {' '}
            {data.yearOfExp}
          </Descriptions.Item>
          <Descriptions.Item label='Job level' span={24}>
            {convertEnumToString(data.jobLevel)}
          </Descriptions.Item>
          <Descriptions.Item span={24}>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <Button type='primary' shape='round' onClick={() => handleOpenResume()}>
                Check Resume
              </Button>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};
