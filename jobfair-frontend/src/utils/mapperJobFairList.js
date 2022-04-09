import { convertToDateString } from './common';

export const mapperJobFairDetail = (item) => {
  if (item !== undefined) {
    return {
      id: item.jobFair.id,
      status: item.status,
      companyId: item.companyId,
      startTime: convertToDateString(item.jobFair.startTime),
      endTime: convertToDateString(item.jobFair.endTime),
      companyRegisterStartTime: convertToDateString(item.jobFair.companyRegisterStartTime),
      description: item.jobFair.description,
      layoutId: item.jobFair.layoutId,
      thumbnail: item.jobFair.thumbnail,
      name: item.jobFair.name,
      estimateParticipant: item.jobFair.estimateParticipant,
      targetCompany: item.jobFair.targetCompany,
      targetAttendant: item.jobFair.targetAttendant
    };
  }
};
