import {
  EMAIL_VALIDATOR,
  MAX_LENGTH_VALIDATOR,
  PHONE_VALIDATOR,
  REQUIRED_VALIDATOR,
  URL_VALIDATOR
} from './GeneralValidation'

export const CompanyProfileValidation = {
  name: [REQUIRED_VALIDATOR('name'), MAX_LENGTH_VALIDATOR('name', 100)],
  address: [
    REQUIRED_VALIDATOR('address'),
    MAX_LENGTH_VALIDATOR('address', 300)
  ],
  email: [REQUIRED_VALIDATOR('email'), ...EMAIL_VALIDATOR()],
  phone: [REQUIRED_VALIDATOR('phone'), ...PHONE_VALIDATOR()],
  url: [...URL_VALIDATOR()],
  benefits: {
    description: [
      REQUIRED_VALIDATOR("benefit's description"),
      MAX_LENGTH_VALIDATOR("benefit's description", 300)
    ]
  }
}
