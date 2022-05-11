import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_INTERVIEW_SCHEDULE,
  ENDPOINT_REQUEST_CHANGE_SCHEDULE
} from '../../constants/Endpoints/jobhub-api/InterviewControllerEndpoint';
import moment from 'moment';

export const getSchedule = ({
  beginTime = moment().subtract(1, 'M').unix() * 1000,
  endTime = moment().add(1, 'M').unix() * 1000
}) => CallAPI(`${ENDPOINT_INTERVIEW_SCHEDULE}`, 'GET', {}, { beginTime, endTime });

export const requestChangeSchedule = (applicationId, beginTime, endTime, requestMessage) =>
  CallAPI(ENDPOINT_REQUEST_CHANGE_SCHEDULE, 'POST', { applicationId, beginTime, endTime, requestMessage });