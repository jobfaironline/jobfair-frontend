import { CallAPI } from '../axiosBase';
import {
  GET_ALL_COMPANY_SUBSCRIPTION,
  GET_ALL_SUBSCRIPTION_END_POINT,
  GET_INVOICE,
  PURCHASE_SUBSCRIPTION_END_POINT
} from '../../constants/Endpoints/jobhub-api/SubscriptionControllerEndpoint';

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
