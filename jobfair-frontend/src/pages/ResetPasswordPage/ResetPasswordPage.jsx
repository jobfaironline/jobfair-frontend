import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import TextInput from "../../components/react-hook-form/input/TextInput/TextInput";
import { resetPasswordHandler } from "../../redux-flow/reset-password/reset-password-action";
import { resetPasswordSchema } from "../../schema/reset.password.schema";
import { resetPasswordAPI } from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { notify } from "../../utils/toastutil";
import Form from "../../components/react-hook-form/form/Form";
import { useHistory } from "react-router-dom";

if (typeof window !== "undefined") {
  injectStyle();
}
const ResetPasswordPage = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [errorRes, setErrorRes] = useState();

  const handelOnSubmit = (values, actions) => {
    console.log("reset");
    resetPasswordAPI({
      email: localStorage.getItem("email"),
      otp: values.otp,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    })
      .then((res) => {
        if (res.status === 200) {
          notify(2, "Reset password successfully!");
          dispatch(resetPasswordHandler(res.data));
          localStorage.removeItem("email");
          history.push("/auth/login");
        }
      })
      .catch((err) => {
        notify(0, `Reset password Failed ${err}`);
        if (err?.response?.data?.message) {
          setErrorRes(err?.response?.data?.message);
        }
      });
  };

  return (
    <Form onSubmit={handelOnSubmit} schema={resetPasswordSchema}>
      <div>Changing password for: {localStorage.getItem("email")}</div>
      <TextInput name="otp" label="OTP" type="text" />
      <TextInput name="newPassword" label="New Password" type="password"  />
      <TextInput name="confirmPassword" label="Confirm Password" type="password" />
      <button>Submit</button>
      <ToastContainer />
    </Form>
  );
};

export default ResetPasswordPage;