import { AssignmentConst } from '../constants/AssignmentConst';
import { JOB_FAIR_STATUS_FOR_EMPLOYEE } from '../constants/JobFairConst';
import { PATH_COMPANY_EMPLOYEE } from '../constants/Paths/Path';
import { generatePath } from 'react-router-dom';
import moment from 'moment';

export const mapperJobFairAssignment = (item, index) => {
  const now = moment();
  let status = JOB_FAIR_STATUS_FOR_EMPLOYEE.NOT_YET;
  if (now.valueOf() > item.jobFairBooth?.jobFair?.decorateStartTime) status = JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING;
  if (now.valueOf() > item.jobFairBooth?.jobFair?.decorateEndTime) status = JOB_FAIR_STATUS_FOR_EMPLOYEE.DONE;
  let statusColor;
  switch (status) {
    case JOB_FAIR_STATUS_FOR_EMPLOYEE.DONE:
      statusColor = 'green';
      break;
    case JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING:
      statusColor = 'blue';
      break;
    case JOB_FAIR_STATUS_FOR_EMPLOYEE.NOT_YET:
      statusColor = 'default';
      break;
    default:
      statusColor = 'default';
  }

  let dueTime;
  switch (item.type) {
    case AssignmentConst.SUPERVISOR:
      dueTime = item.jobFairBooth?.jobFair?.decorateEndTime;
      break;
    case AssignmentConst.DECORATOR:
      dueTime = item.jobFairBooth?.jobFair?.decorateEndTime;
      break;
    case AssignmentConst.RECEPTION:
      dueTime = item.jobFairBooth?.jobFair?.publicEndTime;
      break;
    case AssignmentConst.INTERVIEWER:
      dueTime = item.jobFairBooth?.jobFair?.publicEndTime;
      break;
    case AssignmentConst.STAFF:
      dueTime = item.jobFairBooth?.jobFair?.publicEndTime;
      break;
    default:
      dueTime = item.jobFairBooth?.jobFair?.publicEndTime;
  }

  return {
    key: item.id,
    no: index + 1,
    id: item.id,
    booth: item.jobFairBooth?.booth,
    jobFair: item.jobFairBooth?.jobFair,
    jobFairName: item.jobFairBooth?.jobFair?.name,
    assignmentType: item.type,
    decorateStartTime: item.jobFairBooth?.jobFair?.decorateStartTime,
    decorateEndTime: item.jobFairBooth?.jobFair?.decorateEndTime,
    decorateStartTimeValue: item.jobFairBooth?.jobFair?.decorateStartTime,
    decorateEndTimeValue: item.jobFairBooth?.jobFair?.decorateEndTime,
    publicStartTime: item.jobFairBooth?.jobFair?.publicStartTime,
    publicEndTime: item.jobFairBooth?.jobFair?.publicEndTime,
    status,
    jobFairBoothId: item?.jobFairBooth?.id,
    onClickJobFair: () => {
      const url = generatePath(PATH_COMPANY_EMPLOYEE.CHECKLIST, { jobFairId: item.jobFairBooth?.jobFair?.id });
      window.open(`${window.location.origin}${url}`);
    },
    statusColor,
    assignerFullName: `${item?.assigner?.account.firstname} ${item?.assigner?.account.middlename} ${item?.assigner?.account.lastname}`,
    createTime: item?.createTime,
    dueTime
  };
};
