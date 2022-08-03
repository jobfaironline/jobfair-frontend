export const GET_ALL_SUBSCRIPTION_PLAN_END_POINT = '/api/v1/subscriptions';
export const SUBSCRIPTION_PLAN_ENDPOINT = '/api/v1/subscription-plans';
export const PURCHASE_SUBSCRIPTION_END_POINT = `${GET_ALL_SUBSCRIPTION_PLAN_END_POINT}/pay`;
export const GET_ALL_COMPANY_SUBSCRIPTION = `${GET_ALL_SUBSCRIPTION_PLAN_END_POINT}/company`;
export const GET_INVOICE = `${GET_ALL_SUBSCRIPTION_PLAN_END_POINT}/invoice`;
export const SEND_REQUEST_TO_REFUND = '/api/v1/subscriptions/cancel';
export const EVALUATE_REFUND_REQUEST = '/api/v1/subscriptions/evaluate-refund-request';
