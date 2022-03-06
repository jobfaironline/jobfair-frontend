export const ForgetPasswordValidation = {
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
      message: 'This field is not valid E-mail!'
    }
  ]
}
