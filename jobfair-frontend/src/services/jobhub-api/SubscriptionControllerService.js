import { CallAPI } from '../axiosBase';
import {
  GET_ALL_SUBSCRIPTION_END_POINT,
  PURCHASE_SUBSCRIPTION_END_POINT
} from '../../constants/Endpoints/jobhub-api/SubscriptionControllerEndpoint';

export const getAllSubscriptionAPI = () => CallAPI(GET_ALL_SUBSCRIPTION_END_POINT, 'GET');
export const purchaseSubscriptionAPI = (body) => CallAPI(PURCHASE_SUBSCRIPTION_END_POINT, 'POST', body);
