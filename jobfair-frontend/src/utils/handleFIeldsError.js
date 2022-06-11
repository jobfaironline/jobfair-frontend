export const handleFieldsError = (form) => {
  const errorsArray = form.getFieldsError();
  for (const error of errorsArray) {
    if (error.errors.length > 0) {
      form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
      break;
    }
  }
};
