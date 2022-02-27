import {CallAPI} from "./axiosBase";
import {ENDPOINT_AGORA_RTM_TOKEN, ENDPOINT_GET_LAYOUT_BY_JOB_FAIR_ID} from "../constants/EndPoint";

export const getLayoutByJobFairId = (jobFairId) => CallAPI(ENDPOINT_GET_LAYOUT_BY_JOB_FAIR_ID + `/${jobFairId}`, "GET");