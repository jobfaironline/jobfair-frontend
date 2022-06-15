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

export const JOB_FAIR_STATUS = {
  DRAFT: 'DRAFT',
  PUBLISH: 'PUBLISH'
};

export const SHIFT_DISABLE_TIME = {
  MORNING_SHIFT: [0, 1, 2, 3, 4, 5, 6, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
  AFTERNOON_SHIFT: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22, 23]
};
