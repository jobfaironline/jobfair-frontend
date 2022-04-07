import { CallAPI } from '../axiosBase';
import { ENDPOINT_PURCHASE_BOOTH } from '../../constants/Endpoints/company-buy-booth-controller/CompanyBuyBoothControllerEndpoint';

export const purchaseBooth = (body) => CallAPI(`${ENDPOINT_PURCHASE_BOOTH}`, 'POST', body);
