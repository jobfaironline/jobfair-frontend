import {CallAPI} from "../axiosBase";
import {
  ENDPOINT_APPLICATION_CONTROLLER
} from "../../constants/Endpoints/application-controller/ApplicationControllerEndpoint";

export const submitApplication = (body) => CallAPI(ENDPOINT_APPLICATION_CONTROLLER, 'POST', body)