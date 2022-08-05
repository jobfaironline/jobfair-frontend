import { CallAPI } from '../axiosBase';
import {
  DECREASE_QUOTA,
  EVALUATE_REFUND_REQUEST,
  GET_ALL_COMPANY_SUBSCRIPTION,
  GET_ALL_SUBSCRIPTION_PLAN_END_POINT,
  GET_INVOICE,
  GET_INVOICE_DATA,
  PURCHASE_SUBSCRIPTION_END_POINT,
  SEND_REQUEST_TO_REFUND,
  SUBSCRIPTION_PLAN_ENDPOINT
} from '../../constants/Endpoints/jobhub-api/SubscriptionControllerEndpoint';

//Subscription plan APIs
export const getAllSubscriptionPlanAPI = (
  direction = 'ASC',
  name = '',
  offset = '0',
  pageSize = '10',
  sortBy = 'name'
) =>
  CallAPI(
    SUBSCRIPTION_PLAN_ENDPOINT,
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
export const getSubscriptionPlanById = (id) => CallAPI(`${SUBSCRIPTION_PLAN_ENDPOINT}/${id}`, 'GET');
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
export const getSubscriptionById = (subscriptionId) =>
  CallAPI(`${GET_ALL_SUBSCRIPTION_PLAN_END_POINT}/${subscriptionId}`, 'GET');
export const sendRequestToRefund = (body) => CallAPI(`${SEND_REQUEST_TO_REFUND}`, 'POST', body);
export const evaluateRequestToRefund = (status, subscriptionId) =>
  CallAPI(`${EVALUATE_REFUND_REQUEST}?status=${status}&subscriptionId=${subscriptionId}`, 'GET');
export const decreaseQuota = (subscriptionId) => CallAPI(`${DECREASE_QUOTA}/${subscriptionId}`, 'GET');
export const getInvoiceData = (subscriptionId) => CallAPI(`${GET_INVOICE_DATA}/${subscriptionId}`);
