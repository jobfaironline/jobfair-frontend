import yup from '../validate/yupGlobal'
//Login schema
export const attendantSchema = yup.object().shape({
  employeeName: yup.string().required('Please enter attendant name'),
  email: yup.string().required('Please enter your email').email(),
  password: yup.string().required('Please enter your password').password()
})
