import { convertEnumToString, convertToUTCString } from './common';

export const mapperJobFairAssignment = (item, index) => ({
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
  status: item.jobFairBooth?.jobFair?.status,
  jobFairBoothId: item?.jobFairBooth?.id
});
