import { NUMBER_RANGE_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation'

export const PickJobPositionFormValidation = {
  jobTitle: [REQUIRED_VALIDATOR('Job title')],
  description: [REQUIRED_VALIDATOR('Description')],
  requirement: [REQUIRED_VALIDATOR('Requirement')],
  minSalary: name => {
    return [
      REQUIRED_VALIDATOR('Min salary'),
      { pattern: /^\d+$/, message: 'Invalid number format' },
      ({ getFieldValue }) => ({
        validator(_, value) {
          const minValue = parseInt(value)
          const maxValue = parseInt(getFieldValue('jobPositions')[name].maxSalary)
          if (!value || minValue > maxValue) {
            return Promise.reject(new Error('Invalid min salary.'))
          }
          if (value <= 0) {
            return Promise.reject(new Error('The minimum of salary is 1'))
          }
          if (value > 99999) {
            return Promise.reject(new Error('The maximum of salary is 99999'))
          }

          return Promise.resolve()
        }
      })
    ]
  },
  maxSalary: name => {
    return [
      ({ getFieldValue }) => ({
        validator(_, value) {
          const maxValue = parseInt(value)
          const minValue = parseInt(getFieldValue('jobPositions')[name].minSalary)
          if (!value) {
            return Promise.resolve()
          }
          if (!value.match(/^\d+$/)) {
            return Promise.reject(new Error('Invalid number'))
          }
          if (maxValue < minValue) {
            return Promise.reject(new Error('Invalid max salary.'))
          }
          if (maxValue <= 0) {
            return Promise.reject(new Error('The minimum of salary is 1'))
          }
          if (maxValue > 99999) {
            return Promise.reject(new Error('The maximum of salary is 99999'))
          }

          return Promise.resolve()
        }
      })
    ]
  },
  numberOfPosition: [REQUIRED_VALIDATOR('Number of position'), NUMBER_RANGE_VALIDATOR(1, 10000)]
}
