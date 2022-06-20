import { MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const BoothDescriptionValidation = {
  boothName: [REQUIRED_VALIDATOR('Booth name'), MAX_LENGTH_VALIDATOR('Booth name', 100)],
  boothDescription: [REQUIRED_VALIDATOR('Booth description'), MAX_LENGTH_VALIDATOR('Booth description ', 500)]
};
