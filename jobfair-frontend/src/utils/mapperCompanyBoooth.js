import { convertEnumToString } from './common';

export const mapperCompanyBooth = (boothData, assigmentData) => ({
  name: boothData.name,
  description: boothData.description,
  boothId: assigmentData.jobFairBooth.id,
  jobPositions: boothData.boothJobPositions.map((position, index) => ({
    ...position,
    jobType: convertEnumToString(position.jobType),
    jobLevel: convertEnumToString(position.jobLevel),
    id: position.originJobPosition,
    key: position.originJobPosition,
    no: index,
    isHaveTest: position.isHaveTest ? [true] : [],
    testLength: position.testTimeLength,
    testNumOfQuestion: position.numOfQuestion
  })),
  jobFair: boothData.jobFair
});
