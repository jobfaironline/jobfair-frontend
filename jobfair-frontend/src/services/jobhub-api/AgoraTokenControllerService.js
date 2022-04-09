import { CallAPI } from '../axiosBase';
import {
  ENDPOINT_AGORA_RTC_TOKEN,
  ENDPOINT_AGORA_RTM_TOKEN
} from '../../constants/Endpoints/jobhub-api/AgoraTokenControllerEndpoint';

export const getAgoraRTCToken = (channelId) => CallAPI(ENDPOINT_AGORA_RTC_TOKEN, 'GET', {}, { channelName: channelId });
export const getAgoraRTMToken = () => CallAPI(ENDPOINT_AGORA_RTM_TOKEN, 'GET');
