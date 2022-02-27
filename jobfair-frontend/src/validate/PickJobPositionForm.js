export const PickJobPositionFormValidation = {
  jobTitle: [{ required: true, message: 'Missing title' }],
  description: [{ required: true, message: 'Missing description' }],
  requirement: [{ required: true, message: 'Missing requirement' }],
  minSalary: [{ required: true, message: 'Missing min salary' }],
  maxSalary: [{ required: true, message: 'Missing max salary' }],
  numberOfPosition: [{ required: true, message: 'Missing number of position' }]
}
