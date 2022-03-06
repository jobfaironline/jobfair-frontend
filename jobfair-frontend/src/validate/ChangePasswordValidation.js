export const ChangePasswordValidation = {
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
  ],
  newPassword: [{ required: true, message: 'Please input your new password!' }],
  rePassword: [{ required: true, message: 'Please input your confirm password!' }]
}
