import {MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR} from "./GeneralValidation";

export const ApplicationValidation = {
  summary: [
    MAX_LENGTH_VALIDATOR("summary",1000),
    REQUIRED_VALIDATOR("summary"),
  ]
}