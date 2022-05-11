export const uploadUtil = async (file, apiCall, ...args) => {
  const formData = new FormData();
  formData.append('file', file);
  await apiCall(formData, ...args);
};
