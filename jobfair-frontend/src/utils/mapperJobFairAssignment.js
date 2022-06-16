import { JOB_FAIR_STATUS_FOR_EMPLOYEE } from '../constants/JobFairConst';
import moment from 'moment';

export const mapperJobFairAssignment = (item, index) => {
  const now = moment();
  let status = JOB_FAIR_STATUS_FOR_EMPLOYEE.NOT_YET;
  if (now.valueOf() > item.jobFairBooth?.jobFair?.decorateStartTime) status = JOB_FAIR_STATUS_FOR_EMPLOYEE.HAPPENING;
  if (now.valueOf() > item.jobFairBooth?.jobFair?.decorateEndTime) status = JOB_FAIR_STATUS_FOR_EMPLOYEE.DONE;
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
    jobFairBoothId: item?.jobFairBooth?.id
  };
};
