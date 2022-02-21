import yup from '../validate/yupGlobal'
//Login schema
export const employeeSchema = yup.object().shape({
  email: yup.string().required('Please enter your email').email(),
  password: yup.string().required('Please enter your password').password()
})
