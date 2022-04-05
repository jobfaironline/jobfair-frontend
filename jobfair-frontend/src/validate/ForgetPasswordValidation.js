import {EMAIL_VALIDATOR, REQUIRED_VALIDATOR} from "./GeneralValidation";

export const ForgetPasswordValidation = {
  email: [
    REQUIRED_VALIDATOR("Email"),
    ...EMAIL_VALIDATOR()
  ]
}
