import {PHONE_REGEX} from "../constants/RegexConstant";

export const REQUIRED_VALIDATOR = fieldName => {
  return {
    required: true,
    message: `${fieldName} is required.`
  }
}

export const MAX_LENGTH_VALIDATOR = (fieldName, maxValue) => {
  return {
    max: maxValue,
    message: `${fieldName} has max value of length is ${maxValue}`
  }
}

export const MIN_LENGTH_VALIDATOR = (fieldName, minValue) => {
  return {
    min: minValue,
    message: `${fieldName} has min value of length is ${minValue}`
  }
}

export const CompanyProfileValidation = {
  name: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 100,
      message: 'This field has max length is 100 characters'
    }
  ],
  address: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 300,
      message: 'This field has max length is 300 characters'
    }
  ],
  email: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 322,
      message: 'This field has max length is 322 characters'
    },
    {
      type: 'email',
      message: 'This field has invalid email'
    }
  ],
  taxId: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 9,
      message: 'This field has max length is 9 characters'
    },
    {
      min: 9,
      message: 'This field has min length is 9 characters'
    }
  ],
  phone: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 11,
      message: 'This field has max length is 11 characters'
    },
    {
      pattern: PHONE_REGEX,
      message: 'This field has invalid phone number'
    }
  ],
  url: [
    {
      max: 2048,
      message: 'This field has max length is 2048 characters'
    }
  ],
  description: [
    {
      required: true,
      message: 'This field is required'
    },
    {
      max: 3000,
      message: 'This field has max length is 3000 characters'
    }
  ],
  benefits: {
    description: [
      {
        required: true,
        message: 'This field is required'
      },
      {
        max: 3000,
        message: 'This field has max length is 3000 characters'
      }
    ]
  }
}
