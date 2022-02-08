//This is global validate fill work with YUP
import * as yup from "yup";
import {
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REGEX_PHONE,
  REGEX_XSS,

  REGEX_OTP,
  REGEX_NEW_PASSWORD,
  REGEX_RE_NEW_PASSWORD,
} from "../constants/AppConst";
yup.addMethod(yup.string, "password", function (message) {
  return this.matches(REGEX_PASSWORD, {
    message,
    excludeEmptyString: true,
  });
});
yup.addMethod(yup.string, "email", function (message) {
  return this.matches(REGEX_EMAIL, {
    message,
    excludeEmptyString: true,
  });
});
yup.addMethod(yup.string, "phone", function (message) {
  return this.matches(REGEX_PHONE, {
    message,
    excludeEmptyString: true,
  });
});
yup.addMethod(yup.string, "xss", function (message) {
  return this.matches(REGEX_XSS, {
    message,
    excludeEmptyString: true,
  });
});

yup.addMethod(yup.string, "otp", function (message) {
  return this.matches(REGEX_OTP, {
    message,
    excludeEmptyString: true,
  });
});
yup.addMethod(yup.string, "newPassword", function (message) {
  return this.matches(REGEX_NEW_PASSWORD, {
    message,
    excludeEmptyString: true,
  });
});
yup.addMethod(yup.string, "confirmPassword", function (message) {
  return this.matches(REGEX_RE_NEW_PASSWORD, {
    message,
    excludeEmptyString: true,
  });
});
export default yup;
