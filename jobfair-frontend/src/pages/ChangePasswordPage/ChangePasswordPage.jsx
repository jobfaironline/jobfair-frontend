import React, { useMemo, useState } from 'react'
import TextInput from '../../components/react-hook-form/input/TextInput/TextInput'
import { changePasswordSchema } from '../../schema/change.password.schema'
import { changePasswordAPI, resetPasswordAPI } from '../../services/userService'
import { ToastContainer, toast } from 'react-toastify'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { notify } from '../../utils/toastutil'
import Form from '../../components/react-hook-form/form/Form'
import { useHistory } from 'react-router-dom'

if (typeof window !== 'undefined') {
  injectStyle()
}
const ChangePasswordPage = () => {
  let history = useHistory()
  const [errorRes, setErrorRes] = useState()

  const handelOnSubmit = (values, actions) => {
    changePasswordAPI({
      newPassword: values.newPassword,
      oldPassword: values.oldPassword,
    })
      .then((res) => {
        if (res.status === 200) {
          notify(2, 'Change password successfully!')
          // dispatch(resetPasswordHandler(res.data));
          history.push('/auth/login')
        }
      })
      .catch((err) => {
        notify(0, `Change password Failed ${err}`)
        if (err?.response?.data?.message) {
          setErrorRes(err?.response?.data?.message)
        }
      })
  }

  return (
    <Form onSubmit={handelOnSubmit} schema={changePasswordSchema}>
      <TextInput name="newPassword" label="New Password" type="password" />
      <TextInput
        name="confirmPassword"
        label="Confirm New Password"
        type="password"
      />
      <TextInput name="oldPassword" label="Old Password" type="password" />
      <button>Submit</button>
      <ToastContainer />
    </Form>
  )
}

export default ChangePasswordPage
