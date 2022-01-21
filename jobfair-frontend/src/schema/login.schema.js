import yup from "../validate/yupGlobal";
//Login schema
export const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password").password(),
});
