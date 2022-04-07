import { Descriptions, Space, Tag } from 'antd';
import { JOB_FAIR_FOR_ADMIN_STATUS, JOB_FAIR_PLAN_STATUS } from '../../constants/JobFairConst';
import { Link } from 'react-router-dom';
import { handleStatusTag } from '../../utils/common';
import EvaluationFormComponent from '../forms/EvaluationForm/EvaluationForm.component';
import React from 'react';

const JobFairDetailComponent = (props) => {
  const { data, onFinish, totalRegistration, totalBooth, totalApproval } = props;
  const handleButton = (status) => {
    if (status === undefined) return;

    switch (status) {
      case JOB_FAIR_PLAN_STATUS.PENDING:
        return (
          <>
            <EvaluationFormComponent onFinish={onFinish} id={data.id} name='jobFairId' />
          </>
        );
      case JOB_FAIR_FOR_ADMIN_STATUS.COMPANY_REGISTER:
        return <Link to={`/approval-registration/${data.id}`}>View registrations</Link>;
    }
  };

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
      <Space>{handleButton(data.status)}</Space>
    </>
  );
};

export default JobFairDetailComponent;
