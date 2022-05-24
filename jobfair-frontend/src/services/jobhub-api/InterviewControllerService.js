import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_END_INTERVIEW,
  ENDPOINT_GET_SCHEDULE_BY_INTERVIEW_ROOM_ID,
  ENDPOINT_GET_WAITING_ROOM_INFO,
  ENDPOINT_INTERVIEW_SCHEDULE,
  ENDPOINT_INVITE_INTERVIEWEE,
  ENDPOINT_KICK_FROM_ROOM,
  ENDPOINT_LEAVE_WAITING_ROOM,
  ENDPOINT_REQUEST_CHANGE_SCHEDULE,
  ENDPOINT_START_INTERVIEW,
  ENDPOINT_SWAP_INTERVIEW,
  ENDPOINT_VISIT_WAITING_ROOM
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

export const getScheduleById = (scheduleId) => CallAPI(`${ENDPOINT_INTERVIEW_SCHEDULE}/${scheduleId}`, 'GET');

export const swapSchedule = (fromApplicationId, toApplicationId) =>
  CallAPI(`${ENDPOINT_SWAP_INTERVIEW}`, 'POST', {}, { fromApplicationId, toApplicationId });

export const startInterview = (attendantId, interviewRoomId) =>
  CallAPI(`${ENDPOINT_START_INTERVIEW}`, 'POST', {}, { attendantId, interviewRoomId });

export const endInterview = (attendantId, interviewRoomId) =>
  CallAPI(`${ENDPOINT_END_INTERVIEW}`, 'POST', {}, { attendantId, interviewRoomId });

export const kickUser = (userId, channelId) => CallAPI(`${ENDPOINT_KICK_FROM_ROOM}`, 'POST', {}, { channelId, userId });
