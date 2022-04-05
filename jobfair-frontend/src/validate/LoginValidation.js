import {REQUIRED_VALIDATOR, MIN_LENGTH_VALIDATOR, MAX_LENGTH_VALIDATOR, EMAIL_VALIDATOR} from "./GeneralValidation";

export const LoginValidation = {
  email: [
    REQUIRED_VALIDATOR("email"),
    ...EMAIL_VALIDATOR()
  ],
  password: [REQUIRED_VALIDATOR("Password")]
}
