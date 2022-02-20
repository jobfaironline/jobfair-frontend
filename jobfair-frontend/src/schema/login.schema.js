import yup from '../validate/yupGlobal'
//Login schema
export const schema = yup.object().shape({
  email: yup.string().required('Please enter your email'),
  password: yup.string().required('Please enter your password').password(),
})
