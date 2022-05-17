import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_INTERVIEW_SCHEDULE,
  ENDPOINT_REQUEST_CHANGE_SCHEDULE,
  ENDPOINT_LEAVE_WAITING_ROOM,
  ENDPOINT_VISIT_WAITING_ROOM,
  ENDPOINT_INVITE_INTERVIEWEE,
  ENDPOINT_GET_WAITING_ROOM_INFO,
  ENDPOINT_GET_SCHEDULE_BY_INTERVIEW_ROOM_ID
} from '../../constants/Endpoints/jobhub-api/InterviewControllerEndpoint';
import moment from 'moment';

export const getSchedule = ({
  beginTime = moment().subtract(1, 'M').unix() * 1000,
  endTime = moment().add(1, 'M').unix() * 1000
}) => CallAPI(`${ENDPOINT_INTERVIEW_SCHEDULE}`, 'GET', {}, { beginTime, endTime });

export const requestChangeSchedule = (applicationId, beginTime, endTime, requestMessage) =>
  CallAPI(ENDPOINT_REQUEST_CHANGE_SCHEDULE, 'POST', { applicationId, beginTime, endTime, requestMessage });

export const visitWaitingRoom = (channelId) => CallAPI(ENDPOINT_VISIT_WAITING_ROOM, 'POST', {}, { channelId });

export const leaveWaitingRoom = (channelId) => CallAPI(ENDPOINT_LEAVE_WAITING_ROOM, 'POST', {}, { channelId });

export const inviteInterviewee = (attendantId, interviewRoomId) =>
  CallAPI(ENDPOINT_INVITE_INTERVIEWEE, 'POST', {}, { attendantId, interviewRoomId });

export const getWaitingRoomInfo = (waitingRoomId) =>
  CallAPI(ENDPOINT_GET_WAITING_ROOM_INFO, 'GET', {}, { waitingRoomId });

export const getScheduleByInterviewRoomId = (interviewRoomId) =>
  CallAPI(`${ENDPOINT_GET_SCHEDULE_BY_INTERVIEW_ROOM_ID}/${interviewRoomId}`, 'GET');
