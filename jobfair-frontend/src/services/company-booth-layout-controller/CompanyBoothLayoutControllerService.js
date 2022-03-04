import { CallAPI } from '../axiosBase'
import {
  ENDPOINT_BOOTH_LAYOUT,
  ENDPOINT_GET_COMPANY_BOOTH_LATEST_VERSION_LAYOUT
} from '../../constants/Endpoints/company-booth-layout-controller/CompanyBoothLayoutControllerEndpoint'

export const saveDecoratedBooth = formData =>
  CallAPI(
    `${ENDPOINT_BOOTH_LAYOUT}`,
    'POST',
    formData,
    {},
    {
      'content-type': 'multipart/form-data'
    }
  )

export const getCompanyBoothLatestLayout = companyBoothId =>
  CallAPI(ENDPOINT_GET_COMPANY_BOOTH_LATEST_VERSION_LAYOUT, 'GET', {}, { companyBoothId: companyBoothId })
