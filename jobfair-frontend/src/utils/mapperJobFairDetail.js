export const mapperJobFairDetail = (data) => ({
  attendantRegisterStartTime: data?.attendantRegisterStartTime,
  companyBuyBoothEndTime: data?.companyBuyBoothEndTime,
  companyBuyBoothStartTime: data?.companyBuyBoothStartTime,
  companyRegisterEndTime: data?.companyRegisterEndTime,
  companyRegisterStartTime: data?.companyRegisterStartTime,
  description: data?.description,
  endTime: data?.endTime,
  id: data?.id,
  layoutId: data?.layoutId,
  startTime: data?.startTime,
  status: data?.status,
  name: data?.name,
  estimateParticipant: data?.estimateParticipant,
  targetCompany: data?.targetCompany,
  targetAttendant: data?.targetAttendant
});

export const mapperResponseJobFairForAdmin = (res) =>
  res.data.content.map((item, index) => ({
    no: index + 1,
    id: item.id,
    name: item.name,
    companyName: item.company.name,
    jobFairDecorateStartTime: item.decorateStartTime,
    jobFairDecorateEndTime: item.decorateEndTime,
    jobFairPublicStartTime: item.publicStartTime,
    jobFairPublicEndTime: item.publicEndTime,
    createdTime: item.createTime
  }));
