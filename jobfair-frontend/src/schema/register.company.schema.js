import yup from '../validate/yupGlobal'
//Login schema
export const companySchema = yup.object().shape({
  companyName: yup.string().required('Please enter your company name'),
  email: yup.string().required('Please enter your email').email(),
  password: yup.string().required('Please enter your password').password(),
})
