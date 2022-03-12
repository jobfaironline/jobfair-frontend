import {convertToDateString} from "./common";

export const mapperJobFairDetail = (data, creatorInfo) => {
  return {
    attendantRegisterStartTime: data?.attendantRegisterStartTime,
    companyBuyBoothEndTime: data?.companyBuyBoothEndTime,
    companyBuyBoothStartTime: data?.companyBuyBoothStartTime,
    companyRegisterEndTime: data?.companyRegisterEndTime,
    companyRegisterStartTime: data?.companyRegisterStartTime,
    creatorInfo: creatorInfo,
    description: data?.description,
    endTime: data?.endTime,
    id: data?.id,
    layoutId: data?.layoutId,
    startTime: data?.startTime,
    status: data?.status,
    name: data?.name,
    estimateParticipant: data?.estimateParticipant,
    targetCompany: data?.targetCompany,
    targetAttendant: data?.targetAttendant,
  }
}

export const mapperResponseJobFairForAdmin = (res) => {
  return res.data.content.map((item, index) => {
    return {
      no: index + 1,
      id: item.jobFair.id,
      companyRegisterStartTime: convertToDateString(item.jobFair.companyRegisterStartTime),
      companyRegisterEndTime: convertToDateString(item.jobFair.companyRegisterEndTime),
      companyBuyBoothStartTime: convertToDateString(item.jobFair.companyBuyBoothStartTime),
      companyBuyBoothEndTime: convertToDateString(item.jobFair.companyBuyBoothEndTime),
      attendantRegisterStartTime: convertToDateString(item.jobFair.attendantRegisterStartTime),
      startTime: convertToDateString(item.jobFair.startTime),
      endTime: convertToDateString(item.jobFair.endTime),
      description: item.jobFair.description,
      layoutId: item.jobFair.layoutId,
      creatorId: item.jobFair.creatorId,
      name: item.jobFair.name,
      estimateParticipant: item.jobFair.estimateParticipant,
      targetCompany: item.jobFair.targetCompany,
      targetAttendant: item.jobFair.targetAttendant,
      status: item.status
    }
  })
}