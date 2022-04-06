import { CallAPI } from '../axiosBase'
import {
  ENDPOINT_BOOTH_LAYOUT,
  ENDPOINT_GET_COMPANY_BOOTH_LATEST_VERSION_LAYOUT,
  ENDPOINT_LAYOUT_VIDEO_WITH_FILE,
  ENDPOINT_LAYOUT_VIDEO_WITH_URL
} from '../../constants/Endpoints/company-booth-layout-controller/CompanyBoothLayoutControllerEndpoint'

export const saveDecoratedBooth = async formData =>
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

export const saveLayoutVideoWithFile = async formData =>
  CallAPI(ENDPOINT_LAYOUT_VIDEO_WITH_FILE, 'POST', formData, {}, { 'content-type': 'multipart/form-data' })

export const saveLayoutVideoWithUrl = async params => CallAPI(ENDPOINT_LAYOUT_VIDEO_WITH_URL, 'POST', {}, params)
