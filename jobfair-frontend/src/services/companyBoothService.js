import {CallAPI} from "./axiosBase";
import {
    ENDPOINT_GET_COMPANY_BOOTH_LATEST_VERSION_LAYOUT} from "../constants/EndPoint";

export const getCompanyBoothLatestLayout = (companyBoothId) => CallAPI(ENDPOINT_GET_COMPANY_BOOTH_LATEST_VERSION_LAYOUT , "GET", {}, {companyBoothId: companyBoothId});