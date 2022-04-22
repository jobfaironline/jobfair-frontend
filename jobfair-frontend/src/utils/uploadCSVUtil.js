import { notification } from 'antd';
import { uploadCSVFile } from '../services/jobhub-api/JobControllerService';

export const loadCSVFile = (onChange) => ({
  name: 'file',
  accept: '.csv',
  beforeUpload: () => false,
  onChange,
  showUploadList: false,
  progress: {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068'
    },
    strokeWidth: 3,
    format: (percent) => `${parseFloat(percent.toFixed(2))}%`
  }
});

export const uploadUtil = async (info) => {
  if (info.file.type !== 'text/csv') {
    notification['error']({
      message: `${info.file.name} is not csv`
    });
    return;
  }
  const formData = new FormData();
  formData.append('file', info.file);
  await uploadCSVFile(formData);
  notification['success']({
    message: `${info.file.name} upload successfully`
  });
};
