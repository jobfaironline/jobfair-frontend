import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Form from "../../components/react-hook-form/form/Form";
import TextInput from "../../components/react-hook-form/input/TextInput/TextInput";
import { generateOtpHandler } from "../../redux-flow/reset-password/reset-password-action";
import { generateOtpSchema } from "../../schema/send.otp.schema";
import { generateOTPAPI } from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import { injectStyle } from "react-toastify/dist/inject-style";
import { notify } from "../../utils/toastutil";
import { useHistory } from "react-router-dom";

if (typeof window !== "undefined") {
  injectStyle();
}
const GenerateOtpPage = () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [errorRes, setErrorRes] = useState();
  const handelOnSubmit = (values, actions) => {
    generateOTPAPI({ email: values.email })
      .then((res) => {
        localStorage.setItem("email", values.email);
        notify(2, "Send OTP Successfully!");
        dispatch(generateOtpHandler(res.data));
        history.push("/resetpassword");
      })
      .catch((err) => {
        notify(0, `Send OTP Failed ${err}`);
        if (err?.response?.data?.message) {
          setErrorRes(err?.response?.data?.message);
        }
      });
  };
  return (
    <Form onSubmit={handelOnSubmit} schema={generateOtpSchema}>
      <TextInput name="email" label="Email" />
      <button>Submit</button>
      <ToastContainer />
    </Form>
  );
};

export default GenerateOtpPage;