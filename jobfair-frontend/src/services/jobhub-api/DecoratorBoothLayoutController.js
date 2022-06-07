import { CallAPI } from '../axiosBase';
import { ENDPOINT_DECORATOR_BOOTH_LAYOUT } from '../../constants/Endpoints/jobhub-api/DecoratorBoothLayoutEndpoint';

export const getAllMyBoothLayout = () => CallAPI(`${ENDPOINT_DECORATOR_BOOTH_LAYOUT}`, 'GET');

export const getMyBoothLayoutById = (layoutId) => CallAPI(`${ENDPOINT_DECORATOR_BOOTH_LAYOUT}/${layoutId}`, 'GET');

export const saveDecoratedBoothIntoMyBoothLayout = async (formData) =>
  CallAPI(
    `${ENDPOINT_DECORATOR_BOOTH_LAYOUT}`,
    'POST',
    formData,
    {},
    {
      'content-type': 'multipart/form-data'
    }
  );

export const saveLayoutVideoWithFileIntoMyBoothLayout = async (formData) =>
  CallAPI(
    `${ENDPOINT_DECORATOR_BOOTH_LAYOUT}/videos/file`,
    'POST',
    formData,
    {},
    { 'content-type': 'multipart/form-data' }
  );

export const saveLayoutVideoWithUrlIntoMyBoothLayout = async (params) =>
  CallAPI(`${ENDPOINT_DECORATOR_BOOTH_LAYOUT}/videos/url`, 'POST', {}, params);
