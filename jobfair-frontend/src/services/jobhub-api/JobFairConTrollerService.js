import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_GET_JOB_FAIR_FOR_ATTENDANT,
  ENDPOINT_GET_JOB_FAIR_PLAN_OF_COMPANY,
  ENDPOINT_GET_LAYOUT_FOR_JOB_FAIR_PARK,
  ENDPOINT_JOB_FAIR
} from '../../constants/Endpoints/job-fair-controller/JobFairConTrollerEndpoint';
import { JOB_FAIR_FOR_ADMIN_STATUS } from '../../constants/JobFairConst';

export const getJobFairForCompany = (pageNumber, pageSize, tabStatus) => {
  switch (tabStatus) {
    //available
    case 1:
      return CallAPI(
        `${ENDPOINT_GET_JOB_FAIR_PLAN_OF_COMPANY}?filterStatus=HAPPENING&filterStatus=REGISTRABLE`,
        'GET',
        {},
        {
          offset: pageNumber,
          pageSize,
          direction: 'DESC',
          sortBy: 'jobFair.createTime'
        }
      );
    //history
    case 2:
      return CallAPI(
        `${ENDPOINT_GET_JOB_FAIR_PLAN_OF_COMPANY}?filterStatus=APPROVE&filterStatus=ATTENDED&filterStatus=CHOOSE_BOOTH&filterStatus=DECORATE_BOOTH&filterStatus=REJECT&filterStatus=REQUEST_CHANGE&filterStatus=SUBMITTED`,
        'GET',
        {},
        {
          offset: pageNumber,
          pageSize,
          direction: 'DESC',
          sortBy: 'jobFair.createTime'
        }
      );
    default:
      return null;
  }
};

export const getLayoutInformationForJobFairPark = (jobFairId) =>
  CallAPI(`${ENDPOINT_GET_LAYOUT_FOR_JOB_FAIR_PARK}/${jobFairId}`, 'GET');

export const getAllJobFairAPI = (pageNumber, pageSize, sortBy, direction) =>
  CallAPI(
    `${ENDPOINT_JOB_FAIR}`,
    'GET',
    {},
    {
      direction,
      offset: pageNumber,
      pageSize,
      sortBy
    }
  );
export const evaluateJobFairPlanAPI = (body) => CallAPI(`${ENDPOINT_JOB_FAIR}/evaluate`, 'POST', body);
export const getJobFairForAttendant = (offset, pageSize, tabStatus) => {
  switch (tabStatus) {
    //available
    case 1:
      return CallAPI(
        `${ENDPOINT_GET_JOB_FAIR_FOR_ATTENDANT}?filterStatus=HAPPENING&filterStatus=REGISTRABLE`,
        'GET',
        {},
        {
          offset,
          pageSize
        }
      );
    //history
    case 2:
      return CallAPI(
        `${ENDPOINT_GET_JOB_FAIR_FOR_ATTENDANT}?filterStatus=ATTENDED&filterStatus=CLOSED&filterStatus=REGISTERED`,
        'GET',
        {},
        {
          offset,
          pageSize
        }
      );
    default:
      return null;
  }
};

export const getJobFairOccurredForAdmin = (offset, pageSize) =>
  CallAPI(
    `${ENDPOINT_JOB_FAIR}/admin?filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.CLOSED}&filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.UNAVAILABLE}`,
    'GET',
    {},
    {
      offset,
      pageSize
    }
  );

export const getJobFairHappeningForAdmin = (offset, pageSize) =>
  CallAPI(
    `${ENDPOINT_JOB_FAIR}/admin?filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.HAPPENING}&filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.ATTENDANT_REGISTER}&filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.COMPANY_BUY_BOOTH}&filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.COMPANY_REGISTER}&filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.PROCESSING}`,
    'GET',
    {},
    {
      offset,
      pageSize
    }
  );

export const getJobFairIncomingForAdmin = (offset, pageSize) =>
  CallAPI(
    `${ENDPOINT_JOB_FAIR}/admin?filterStatus=${JOB_FAIR_FOR_ADMIN_STATUS.NOT_YET}`,
    'GET',
    {},
    {
      offset,
      pageSize
    }
  );

export const getJobFairPlanById = (id) => CallAPI(`${ENDPOINT_JOB_FAIR}/${id}`, 'GET');
