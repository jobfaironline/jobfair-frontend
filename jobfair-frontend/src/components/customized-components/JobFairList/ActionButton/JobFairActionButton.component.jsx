import { Button, Tooltip, notification } from 'antd';
import { COMPANY_JOB_FAIR_STATUS } from '../../../../constants/CompanyJobFairStatus';
import { PATH } from '../../../../constants/Paths/Path';
import { generatePath } from 'react-router-dom';
import React from 'react';

export const RegistrableButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='This event is open. Register now' color='green'>
      <Button type='primary' onClick={onClick}>
        REGISTER NOW
      </Button>
    </Tooltip>
  );
};

export const SubmittedButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='You registration is still in progress. Please wait!' color='gold'>
      <Button type='primary' onClick={onClick}>
        PENDING
      </Button>
    </Tooltip>
  );
};

export const ApproveButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='Your registration was approved!' color='gold'>
      <Button type='primary' onClick={onClick}>
        APPROVED
      </Button>
    </Tooltip>
  );
};

export const UnavailableButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='This event was delayed. Please comeback later.' color='red'>
      <Button type='primary' disabled onClick={onClick}>
        SUSPENDED
      </Button>
    </Tooltip>
  );
};

export const DecorateBoothButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='You chose a booth in this event. Decorate it now' color='geekblue'>
      <Button type='primary' onClick={onClick}>
        DECORATE BOOTH
      </Button>
    </Tooltip>
  );
};

export const ChooseBoothButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='You registration has been approved. Now you can choose booth' color='blue'>
      <Button type='primary' onClick={onClick}>
        CHOOSE BOOTH
      </Button>
    </Tooltip>
  );
};

export const HappeningButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='This job fair is happening. Join now !' color='lime'>
      <Button type='primary' onClick={onClick}>
        JOIN NOW
      </Button>
    </Tooltip>
  );
};

export const ClosedButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='This job fair was closed ! Thank you' color='gold'>
      <Button type='primary' onClick={onClick}>
        CLOSED
      </Button>
    </Tooltip>
  );
};

export const AttendedButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='🌼Thank you for joining this job fair. See ya🌼' color='cyan'>
      <Button type='primary' onClick={onClick}>
        ATTENDED
      </Button>
    </Tooltip>
  );
};

export const RequestChangeButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='Please edit your registration and submit again!' color='purple'>
      <Button type='primary' onClick={onClick}>
        REQUEST CHANGE
      </Button>
    </Tooltip>
  );
};

export const RejectButton = (props) => {
  const { onClick } = props;
  return (
    <Tooltip title='Sorry, your registration was rejected. Click to view the reason' color='red'>
      <Button type='primary' onClick={onClick}>
        REJECT
      </Button>
    </Tooltip>
  );
};

export const GenericButton = (props) => {
  const { onClick, status } = props;
  return (
    <Tooltip title='Other status' color='blue'>
      <Button type='primary' onClick={onClick}>
        {status}
      </Button>
    </Tooltip>
  );
};

const CompanyJobFairActionButton = (props) => {
  const { getCompanyBoothId, item, handleRedirect, handleViewMap, handleRequestChange } = props;

  switch (item.status) {
    case COMPANY_JOB_FAIR_STATUS.REGISTRABLE:
      return (
        <RegistrableButton
          onClick={() => {
            const url = generatePath(PATH.REGISTER_JOB_FAIR_PAGE, {
              jobFairId: item.id
            });
            handleRedirect(url);
          }}
        />
      );
    case COMPANY_JOB_FAIR_STATUS.REJECT:
      return <RejectButton onClick={() => notification['info']({ message: 'click to view reason' })} />;
    case COMPANY_JOB_FAIR_STATUS.SUBMITTED:
      return <SubmittedButton />;
    case COMPANY_JOB_FAIR_STATUS.APPROVE:
      return <ApproveButton />;
    case COMPANY_JOB_FAIR_STATUS.UNAVAILABLE:
      return <UnavailableButton />;
    case COMPANY_JOB_FAIR_STATUS.DECORATE_BOOTH:
      return <DecorateBoothButton onClick={() => getCompanyBoothId(item.id)} />;
    case COMPANY_JOB_FAIR_STATUS.CHOOSE_BOOTH:
      return (
        <ChooseBoothButton
          onClick={() => {
            const url = generatePath(PATH.CHOOSE_BOOTH_PAGE, {
              jobFairId: item.id
            });
            handleRedirect(url);
          }}
        />
      );
    case COMPANY_JOB_FAIR_STATUS.HAPPENING:
      return <HappeningButton onClick={() => handleViewMap(item.id)} />;
    case COMPANY_JOB_FAIR_STATUS.CLOSED:
      return <ClosedButton onClick={() => notification['success']({ message: 'Closed!!' })} />;
    case COMPANY_JOB_FAIR_STATUS.ATTENDED:
      return <AttendedButton onClick={() => notification['success']({ message: '💖' })} />;
    case COMPANY_JOB_FAIR_STATUS.REQUEST_CHANGE:
      return <RequestChangeButton onClick={() => handleRequestChange(item.id)} />;
    default:
      return <GenericButton status={item.status} />;
  }
};

export default CompanyJobFairActionButton;
