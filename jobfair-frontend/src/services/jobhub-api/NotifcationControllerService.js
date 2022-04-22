import { CallAPI } from '../axiosBase';
import {
  NOTIFICATION_ENDPOINT,
  READ_ALL_ENDPOINT,
  READ_ENDPOINT
} from '../../constants/Endpoints/jobhub-api/NotificationControllerEndpoint';

export const getNotification = () => CallAPI(`${NOTIFICATION_ENDPOINT}`, 'GET', {});

export const readNotification = (id) => CallAPI(`${READ_ENDPOINT}/${id}`, 'POST');
export const readAllNotification = () => CallAPI(`${READ_ALL_ENDPOINT}`, 'POST');
