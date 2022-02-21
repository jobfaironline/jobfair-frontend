import React, { useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import Form from '../../components/react-hook-form/form/Form'
import TextInput from '../../components/react-hook-form/input/TextInput/TextInput'
import { SigninHandler } from '../../redux-flow/authentication/authentication-action'
import { schema } from '../../schema/login.schema'
import { signInAPI } from '../../services/userService'
import { ToastContainer, toast } from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { notify } from '../../utils/toastutil'
if (typeof window !== 'undefined') {
  injectStyle()
}
const LoginPage = () => {
  const dispatch = useDispatch()
  const [errorRes, setErrorRes] = useState()
  const handelOnSubmit = (values, actions) => {
    console.log('Hello')
    signInAPI({ email: values.email, password: values.password })
      .then((res) => {
        notify(2, 'Login Success')
        dispatch(SigninHandler(res.data))
      })
      .catch((err) => {
        notify(0, `Login Faile ${err}`)
        if (err?.response?.data?.message) {
          setErrorRes(err?.response?.data?.message)
        }
      })
  }
  return (
    <Form onSubmit={handelOnSubmit} schema={schema}>
      <TextInput name="email" label="Email" />
      <TextInput name="password" type="password" label="Password" />
      <button>Login</button>
      <ToastContainer />
    </Form>
  )
}

export default LoginPage
