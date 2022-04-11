import { CallAPI } from '../axiosBase';
import { ENDPOINT_TEMPLATE_LAYOUT } from '../../constants/Endpoints/jobhub-api/TemplateControllerEndpoint';

export const getTemplateLayoutAPI = () => CallAPI(ENDPOINT_TEMPLATE_LAYOUT, 'GET', {}, {});
