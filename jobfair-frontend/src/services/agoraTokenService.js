import {
    ENDPOINT_AGORA_RTC_TOKEN,
    ENDPOINT_AGORA_RTM_TOKEN
} from '../constants/EndPoint';
import { CallAPI } from './axiosBase.js';


export const getAgoraRTCToken =  channelId => CallAPI(ENDPOINT_AGORA_RTC_TOKEN, "GET", {}, {channelName: channelId} );

export const getAgoraRTMToken = () => CallAPI(ENDPOINT_AGORA_RTM_TOKEN, "GET");