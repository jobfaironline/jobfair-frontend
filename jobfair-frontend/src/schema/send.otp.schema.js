import yup from "../validate/yupGlobal";
//Login schema
export const generateOtpSchema = yup.object().shape({
  email: yup.string().required("Please enter your email to get otp"),
});