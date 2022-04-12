import { notification } from 'antd';

export const JOB_FAIR_PLAN_COMPANY_STATUS = [
  {
    value: 'REGISTRABLE',
    label: 'Registrable',
    color: 'green'
  },
  {
    value: 'SUBMITTED',
    label: 'Submitted',
    color: 'gold'
  },
  {
    value: 'APPROVE',
    label: 'Approved',
    color: 'gold'
  },
  {
    value: 'CHOOSE_BOOTH',
    label: 'Choose booth',
    color: 'blue'
  },
  {
    value: 'DECORATE_BOOTH',
    label: 'Decorate booth',
    color: 'geekblue'
  },
  {
    value: 'UNAVAILABLE',
    label: 'Unavailable',
    color: 'red'
  },
  {
    value: 'HAPPENING',
    label: 'Happening',
    color: 'red'
  },
  {
    value: 'PENDING',
    label: 'Pending',
    color: 'red'
  }
];

export const JOB_FAIR_FOR_ATTENDANT_STATUS = [
  {
    value: 'ATTENDED',
    label: 'Attended'
  },
  {
    value: 'CLOSED',
    label: 'Closed'
  },
  {
    value: 'HAPPENING',
    label: 'Happening'
  },
  {
    value: 'REGISTERED',
    label: 'Registered'
  },
  {
    value: 'REGISTRABLE',
    label: 'Registrable'
  },
  {
    value: 'UNAVAILABLE',
    label: 'Unavailable'
  }
];

export const JOB_FAIR_PLAN_STATUS = {
  APPROVE: 'APPROVE',
  CANCEL: 'CANCEL',
  DELETED: 'DELETED',
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  REJECT: 'REJECT'
};

export const JOB_FAIR_FOR_ADMIN_STATUS = {
  ATTENDANT_REGISTER: 'ATTENDANT_REGISTER',
  CLOSED: 'CLOSED',
  COMPANY_BUY_BOOTH: 'COMPANY_BUY_BOOTH',
  COMPANY_REGISTER: 'COMPANY_REGISTER',
  HAPPENING: 'HAPPENING',
  NOT_YET: 'NOT_YET',
  PROCESSING: 'PROCESSING',
  UNAVAILABLE: 'UNAVAILABLE'
};

export const uploadProps = {
  name: 'file',
  multiple: true,
  beforeUpload: () => false,
  accept: '.glb',
  onChange: async (info) => {
    if (info.file.type !== 'model/gltf-binary') {
      notification['error']({
        message: `${info.file.name} is not glb file`
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', info.file);
    //TODO: adding upload GLB API later
    // await uploadCSVFile(formData);
    notification['success']({
      message: `${info.file.name} upload successfully`
    });
    //force render to fetch data after upload
    setForceRerenderState((prevState) => !prevState);
  },
  showUploadList: false
};
