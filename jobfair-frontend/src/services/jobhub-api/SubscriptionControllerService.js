import {
  CANCEL_SUBSCRIPTION,
  GET_ALL_COMPANY_SUBSCRIPTION,
  GET_ALL_SUBSCRIPTION_END_POINT,
  GET_CURRENT_SUBSCRIPTION,
  GET_INVOICE,
  PURCHASE_SUBSCRIPTION_END_POINT
} from '../../constants/Endpoints/jobhub-api/SubscriptionControllerEndpoint';
import { CallAPI } from '../axiosBase';

export const getAllSubscriptionAPI = () => CallAPI(GET_ALL_SUBSCRIPTION_END_POINT, 'GET');
export const purchaseSubscriptionAPI = (body) => CallAPI(PURCHASE_SUBSCRIPTION_END_POINT, 'POST', body);
export const getAllCompanySubscriptionsAPI = (
  direction = 'ASC',
  offset = 0,
  pageSize = 10,
  sortBy = 'currentPeriodStart'
) =>
  CallAPI(
    GET_ALL_COMPANY_SUBSCRIPTION,
    'GET',
    {},
    {
      direction,
      offset,
      pageSize,
      sortBy
    }
  );

export const getInvoiceAPI = (subscriptionId) => CallAPI(`${GET_INVOICE}/${subscriptionId}`, 'GET', {});
export const getCurrentSubscriptionAPI = () => CallAPI(GET_CURRENT_SUBSCRIPTION, 'GET');
export const cancelSubscriptionAPI = () => CallAPI(CANCEL_SUBSCRIPTION, 'GET');
