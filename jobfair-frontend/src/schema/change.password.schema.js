import yup from '../validate/yupGlobal'

export const changePasswordSchema = yup.object().shape({
  newPassword: yup.string().required('Please enter your new password').password(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Passwords do not match')
    .required('Please enter your confirm password')
    .password(),
  oldPassword: yup.string().required('Please enter your old password').password()
})
