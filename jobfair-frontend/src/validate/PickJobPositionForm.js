export const PickJobPositionFormValidation = {
  jobTitle: [{ required: true, message: 'Missing title' }],
  description: [{ required: true, message: 'Missing description' }],
  requirement: [{ required: true, message: 'Missing requirement' }],
  minSalary: name => {
    return [
      { required: true, message: 'Missing min salary' },
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
  numberOfPosition: [
    { required: true, message: 'Missing number of position' },
    { pattern: /^\d+$/, message: 'Invalid number format' },
    () => ({
      validator(_, value) {
        const numOfPosition = parseInt(value)
        if (!value || numOfPosition >= 10000) {
          return Promise.reject(new Error('The maximum of position is 10000'))
        }
        if (numOfPosition <= 0) {
          return Promise.reject(new Error('The minimum of position is 1'))
        }

        return Promise.resolve()
      }
    })
  ]
}
