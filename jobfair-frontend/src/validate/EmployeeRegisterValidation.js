export const EmployeeRegisterValidation = {
  email: [
    {
      type: 'email',
      message: 'The input is not valid E-mail!'
    },
    {
      required: true,
      message: 'Please input your E-mail!'
    }
  ],
  firstName: [
    {
      required: true,
      message: 'Please input your nickname!',
      whitespace: true
    }
  ],
  middleName: [],
  lastName: [
    {
      required: true,
      message: 'Please input your nickname!',
      whitespace: true
    }
  ],
  phone: [
    {
      required: true,
      message: 'Please input your phone number!'
    }
  ],
  gender: [
    {
      required: true,
      message: 'Please select gender!'
    }
  ]
}
