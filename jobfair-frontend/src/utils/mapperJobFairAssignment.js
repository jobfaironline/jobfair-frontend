import { convertToUTCString } from './common';

export const mapperJobFairAssignment = (item, index) => ({
  key: item.id,
  no: index + 1,
  id: item.id,
  booth: item.jobFairBooth?.booth,
  jobFair: item.jobFairBooth?.jobFair,
  jobFairName: item.jobFairBooth?.jobFair?.name,
  assignmentType: item.type,
  decorateStartTime: convertToUTCString(item.jobFairBooth?.jobFair?.decorateStartTime),
  decorateEndTime: convertToUTCString(item.jobFairBooth?.jobFair?.decorateEndTime),
  decorateStartTimeValue: item.jobFairBooth?.jobFair?.decorateStartTime,
  decorateEndTimeValue: item.jobFairBooth?.jobFair?.decorateEndTime,
  publicStartTime: convertToUTCString(item.jobFairBooth?.jobFair?.publicStartTime),
  publicEndTime: convertToUTCString(item.jobFairBooth?.jobFair?.publicEndTime),
  status: item.jobFairBooth?.jobFair?.status
});
