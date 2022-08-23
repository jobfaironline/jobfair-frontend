import { CallAPI } from '../axiosBase';
import {
  JOB_FAIR_END_POINT,
  JOB_FAIR_INFORMATION_FOR_3D_MAP
} from '../../constants/Endpoints/jobhub-api/JobFairConTrollerEndpoint';

export const getAllJobFairAPI = ({
  name = '',
  direction = 'DESC',
  offset = '0',
  pageSize = '100',
  sortBy = 'createTime',
  status = null
}) =>
  CallAPI(
    `${JOB_FAIR_END_POINT}`,
    'GET',
    {},
    {
      direction,
      offset,
      pageSize,
      sortBy,
      name,
      status
    }
  );

export const draftJobFairAPI = (body) => CallAPI(JOB_FAIR_END_POINT, 'POST', body, {});
export const updateJobFairAPI = (body) => CallAPI(JOB_FAIR_END_POINT, 'PUT', body, {});
export const publishJobFairAPI = (jobFairId) => CallAPI(`${JOB_FAIR_END_POINT}/publish/${jobFairId}`, 'POST', {}, {});
export const getJobFairByIDAPI = (jobFairId) => CallAPI(`${JOB_FAIR_END_POINT}/${jobFairId}`, 'GET');
export const uploadJobFairThumbnailAPI = (jobFairId, body) =>
  CallAPI(
    `${JOB_FAIR_END_POINT}/upload-thumbnail/${jobFairId}`,
    'POST',
    body,
    {},
    { 'content-type': 'multipart/form-data' }
  );

export const getLayoutInformationForJobFairPark = (jobFairId) =>
  CallAPI(`${JOB_FAIR_INFORMATION_FOR_3D_MAP}/${jobFairId}`, 'GET');
export const getJobFairForAttendant = ({
  name = '',
  countryId = '',
  categoryId = '',
  direction = 'ASC',
  offset = '0',
  pageSize = '10',
  sortBy = 'createTime'
}) =>
  CallAPI(
    `${JOB_FAIR_END_POINT}/attendants`,
    'GET',
    {},
    { name, countryId, categoryId, direction, offset, pageSize, sortBy }
  );
export const checkJobFairPublishAPI = (jobFairId) =>
  CallAPI(`${JOB_FAIR_END_POINT}/check-publish/${jobFairId}`, 'POST', {}, {});

export const deleteJobFairDraftAPI = (jobFairId) => CallAPI(`${JOB_FAIR_END_POINT}/${jobFairId}`, 'DELETE', {}, {});

export const getJobFairProgress = (jobFairId) => CallAPI(`${JOB_FAIR_END_POINT}/progress/${jobFairId}`, 'GET', {}, {});

export const getAllJobFairForAdminAPI = ({
  name = '',
  direction = 'DESC',
  offset = '0',
  pageSize = '100',
  sortBy = 'createTime',
  status = null
}) =>
  CallAPI(
    `${JOB_FAIR_END_POINT}/admins`,
    'GET',
    {},
    {
      direction,
      offset,
      pageSize,
      sortBy,
      name,
      status
    }
  );

export const getAllJobFairForAdminInRangeAPI = ({ to, from }) =>
  CallAPI(
    `${JOB_FAIR_END_POINT}/admins/range`,
    'GET',
    {},
    {
      to,
      from
    }
  );
