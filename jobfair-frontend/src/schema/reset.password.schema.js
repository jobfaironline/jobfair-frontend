import yup from "../validate/yupGlobal";
export const resetPasswordSchema = yup.object().shape({
  // email: yup.string().required("Please enter your email").email(),
  otp: yup.string().required("Please enter your otp form mail").otp(),
  newPassword: yup.string().required("Please enter your new password").password(),
  confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords do not match').required("Please enter your confirm password").password(),
});
