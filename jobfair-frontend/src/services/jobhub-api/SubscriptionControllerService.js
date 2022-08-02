import {
  CANCEL_SUBSCRIPTION,
  GET_ALL_COMPANY_SUBSCRIPTION,
  GET_ALL_SUBSCRIPTION_PLAN_END_POINT,
  GET_CURRENT_SUBSCRIPTION,
  GET_INVOICE,
  PURCHASE_SUBSCRIPTION_END_POINT,
  SUBSCRIPTION_PLAN_ENDPOINT
} from '../../constants/Endpoints/jobhub-api/SubscriptionControllerEndpoint';
import { CallAPI } from '../axiosBase';

//Subscription plan APIs
export const getAllSubscriptionPlanAPI = (
  direction = 'ASC',
  name = '',
  offset = '0',
  pageSize = '10',
  sortBy = 'name'
) =>
  CallAPI(
    GET_ALL_SUBSCRIPTION_PLAN_END_POINT,
    'GET',
    {},
    {
      direction,
      name,
      offset,
      pageSize,
      sortBy
    }
  );
export const getSubscriptionPlanById = (id) => CallAPI(`${GET_ALL_SUBSCRIPTION_PLAN_END_POINT}/${id}`, 'GET');
export const createSubscriptionPlan = (body) => CallAPI(SUBSCRIPTION_PLAN_ENDPOINT, 'POST', body);
export const updateSubscriptionPlan = (body) => CallAPI(SUBSCRIPTION_PLAN_ENDPOINT, 'PUT', body);
//---------------------
export const purchaseSubscriptionAPI = (body) => CallAPI(PURCHASE_SUBSCRIPTION_END_POINT, 'POST', body);
export const getAllSubscriptionForAdmin = (
  companyName = '',
  direction = 'ASC',
  offset = '0',
  pageSize = '10',
  sortBy = 'currentPeriodStart'
) =>
  CallAPI(
    `${GET_ALL_SUBSCRIPTION_PLAN_END_POINT}/admin`,
    'GET',
    {},
    {
      companyName,
      direction,
      offset,
      pageSize,
      sortBy
    }
  );
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
