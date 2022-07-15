import { CallAPI } from '../axiosBase';
import { ENDPOINT_APPLICATION } from '../../constants/Endpoints/jobhub-api/ApplicationControllerEndpoint';

export const getAllApplicationForCompany = (
  pageNumber,
  pageSize,
  status,
  jobFairSearchValue,
  jobPositionSearchValue,
  sortField
) => {
  const filterStatusString = status
    ? status.reduce((previousValue, currentValue, index) => {
        if (index === 0) return `${previousValue}status=${currentValue}`;

        return `${previousValue}&status=${currentValue}`;
      }, '')
    : '';

  return CallAPI(
    `${ENDPOINT_APPLICATION}/company?${filterStatusString}`,
    'GET',
    {},
    {
      offset: pageNumber,
      pageSize,
      direction: 'DESC',
      sortBy: sortField,
      jobPositionName: jobPositionSearchValue,
      jobFairName: jobFairSearchValue
    }
  );
};

export const getAllApplicationForAttendant = (
  pageNumber,
  pageSize,
  status,
  jobFairSearchValue,
  jobPositionSearchValue,
  sortField
) => {
  const filterStatusString = status
    ? status.reduce((previousValue, currentValue, index) => {
        if (index === 0) return `${previousValue}status=${currentValue}`;

        return `${previousValue}&status=${currentValue}`;
      }, '')
    : '';

  return CallAPI(
    `${ENDPOINT_APPLICATION}?${filterStatusString}`,
    'GET',
    {},
    {
      offset: pageNumber,
      pageSize,
      direction: 'DESC',
      sortBy: sortField,
      jobPositionName: jobPositionSearchValue,
      jobFairName: jobFairSearchValue
    }
  );
};

export const getApplicationForCompany = (applicationId) =>
  CallAPI(`${ENDPOINT_APPLICATION}/company-general/${applicationId}`, 'GET');

export const evaluateApplication = (body) => CallAPI(`${ENDPOINT_APPLICATION}/evaluate`, 'POST', body);

export const draftApplication = (body) => CallAPI(`${ENDPOINT_APPLICATION}/draft`, 'POST', body);

export const submitApplication = (applicationId) => CallAPI(`${ENDPOINT_APPLICATION}/submit/${applicationId}`, 'POST');

export const getApplicationById = (applicationId) => CallAPI(`${ENDPOINT_APPLICATION}/${applicationId}`, 'GET');
