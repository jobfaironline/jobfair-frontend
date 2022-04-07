import { Descriptions, Tag } from 'antd';
import { handleStatusTag } from '../../../utils/common';
import React from 'react';

const JobFairDetailComponent = (props) => {
  const { data, totalRegistration, totalBooth, totalApproval } = props;

  return (
    <>
      <Descriptions title='Job fair detail' bordered size='small' style={{ textAlign: 'center' }}>
        <Descriptions.Item label='Job fair name'>{data.name}</Descriptions.Item>
        <Descriptions.Item label='Status'>{handleStatusTag(data.status)}</Descriptions.Item>

        <Descriptions.Item label='Job fair time'>
          <Tag color='orange'>
            {data.startTime} {' → '}
            {data.endTime}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label='Attendant register time'>{data.attendantRegisterStartTime}</Descriptions.Item>
        <Descriptions.Item label='Company register time'>
          <Tag color='orange'>
            {data.companyRegisterStartTime}
            {' → '} {data.companyRegisterEndTime}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label='Company buy booth time'>
          <Tag color='green'>
            {data.companyBuyBoothStartTime} {' → '}
            {data.companyBuyBoothEndTime}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label='Estimated number of participants'>{data.estimateParticipant}</Descriptions.Item>
        <Descriptions.Item label='Target company'>{data.targetCompany}</Descriptions.Item>
        <Descriptions.Item label='Target attendant'>{data.targetAttendant}</Descriptions.Item>
        <Descriptions.Item label='Total approval company registrations'>{totalApproval}</Descriptions.Item>
        <Descriptions.Item label='Total company registrations'>{totalRegistration}</Descriptions.Item>
        <Descriptions.Item label='Total booths'>{totalBooth} slot(s)</Descriptions.Item>
        <Descriptions.Item label='Description' style={{ textAlign: 'start' }}>
          {data.description}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default JobFairDetailComponent;
