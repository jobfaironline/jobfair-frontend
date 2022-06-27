import { MAX_LENGTH_VALIDATOR, REQUIRED_VALIDATOR } from './GeneralValidation';

export const UploadTemplateValidation = {
  name: [REQUIRED_VALIDATOR('Name'), MAX_LENGTH_VALIDATOR('Name', 100)],
  description: [REQUIRED_VALIDATOR(`Description`), MAX_LENGTH_VALIDATOR('Description', 500)],
  fileGLB: [REQUIRED_VALIDATOR('File glb')]
};
