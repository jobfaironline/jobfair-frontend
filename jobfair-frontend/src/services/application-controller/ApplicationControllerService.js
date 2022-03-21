import { CallAPI } from '../axiosBase'
import { ENDPOINT_APPLICATION } from '../../constants/Endpoints/application-controller/ApplicationControllerEndpoint'
export const getAllApplication = (pageNumber, pageSize, status, jobFairSearchValue, jobPositionSearchValue) => {
  const filterStatusString = status
    ? status.reduce((previousValue, currentValue, index) => {
        if (index === 0) {
          return previousValue + 'status=' + currentValue
        }
        return previousValue + '&status=' + currentValue
      }, '')
    : ''

  return CallAPI(
    `${ENDPOINT_APPLICATION}/company?${filterStatusString}`,
    'GET',
    {},
    {
      offset: pageNumber,
      pageSize: pageSize,
      direction: 'DESC',
      sortBy: 'appliedDate',
      jobPositionName: jobPositionSearchValue,
      jobFairName: jobFairSearchValue
    }
  )
}

export const getApplication = applicationId => {
  return CallAPI(`${ENDPOINT_APPLICATION}/company-general/${applicationId}`, 'GET')
}
