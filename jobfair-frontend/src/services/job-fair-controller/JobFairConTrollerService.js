import {CallAPI} from '../axiosBase'
import {
  ENDPOINT_GET_JOB_FAIR_PLAN_OF_COMPANY,
  ENDPOINT_GET_LAYOUT_FOR_JOB_FAIR_PARK,
  ENDPOINT_JOB_FAIR,
  ENDPOINT_GET_JOB_FAIR_FOR_ATTENDANT
} from '../../constants/Endpoints/job-fair-controller/JobFairConTrollerEndpoint'
import {JOB_FAIR_FOR_ADMIN_STATUS} from '../../constants/JobFairConst'

export const getAvailableJobFairForCompany = (pageNumber, pageSize) =>
  CallAPI(
    `${ENDPOINT_GET_JOB_FAIR_PLAN_OF_COMPANY}?filterStatus=HAPPENING&filterStatus=REGISTRABLE`,
    'GET',
    {},
    {
      offset: pageNumber,
      pageSize: pageSize,
      direction: 'DESC',
      sortBy: 'jobFair.createTime'
    }
  )
export const getHistoricalJobFairForCompany = (pageNumber, pageSize) =>
  CallAPI(
    `${ENDPOINT_GET_JOB_FAIR_PLAN_OF_COMPANY}?filterStatus=APPROVE&filterStatus=ATTENDED&filterStatus=CHOOSE_BOOTH&filterStatus=DECORATE_BOOTH&filterStatus=REJECT&filterStatus=REQUEST_CHANGE&filterStatus=SUBMITTED`,
    'GET',
    {},
    {
      offset: pageNumber,
      pageSize: pageSize,
      direction: 'DESC',
      sortBy: 'jobFair.createTime'
    }
  )

export const getLayoutInformationForJobFairPark = jobFairId =>
  CallAPI(ENDPOINT_GET_LAYOUT_FOR_JOB_FAIR_PARK + `/${jobFairId}`, 'GET')

export const getAllJobFairAPI = (pageNumber, pageSize, sortBy, direction) =>
  CallAPI(
    `${ENDPOINT_JOB_FAIR}`,
    'GET',
    {},
    {
      direction: direction,
      offset: pageNumber,
      pageSize: pageSize,
      sortBy: sortBy
    }
  )
export const evaluateJobFairPlanAPI = body => CallAPI(`${ENDPOINT_JOB_FAIR}/evaluate`, 'POST', body)
export const getJobFairAvailableForAttendant = (offset, pageSize) =>
  CallAPI(
    `${ENDPOINT_GET_JOB_FAIR_FOR_ATTENDANT}?filterStatus=HAPPENING&filterStatus=REGISTRABLE`,
    'GET',
    {},
    {
      offset: offset,
      pageSize: pageSize
    }
  )

export const getJobFairAttendedForAttendant = (offset, pageSize) =>
  CallAPI(
    `${ENDPOINT_GET_JOB_FAIR_FOR_ATTENDANT}?filterStatus=ATTENDED&filterStatus=CLOSED&filterStatus=REGISTERED`,
    'GET',
    {},
    {
      offset: offset,
      pageSize: pageSize
    }
  )

export const getJobFairOccurredForAdmin = (offset, pageSize) =>
  CallAPI(
    `${ENDPOINT_JOB_FAIR}/admin?filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.CLOSED}&filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.UNAVAILABLE}`,
    'GET',
    {},
    {
      offset: offset,
      pageSize: pageSize
    }
  )

export const getJobFairHappeningForAdmin = (offset, pageSize) =>
  CallAPI(
    `${ENDPOINT_JOB_FAIR}/admin?filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.HAPPENING}&filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.ATTENDANT_REGISTER}&filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.COMPANY_BUY_BOOTH}&filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.COMPANY_REGISTER}&filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.PROCESSING}`,
    'GET',
    {},
    {
      offset: offset,
      pageSize: pageSize
    }
  )

export const getJobFairIncomingForAdmin = (offset, pageSize) => CallAPI(
  `${ENDPOINT_JOB_FAIR}/admin?filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.NOT_YET}`,
  'GET',
  {},
  {
    offset: offset,
    pageSize: pageSize
  }
)

export const getJobFairPlanById = id => CallAPI(`${ENDPOINT_JOB_FAIR}/${id}`, 'GET')
