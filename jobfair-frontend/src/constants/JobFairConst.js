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

export const JOB_FAIR_STATUS_FOR_EMPLOYEE = {
  NOT_YET: 'NOT_YET',
  HAPPENING: 'HAPPENING',
  DONE: 'DONE'
};

export const PUBLIC_RANGE_LIMIT = 2;

export const ADMIN_JOB_FAIR_STATUS = {
  TAKEN_PLACE: 'TAKEN_PLACE',
  HAPPENING: 'HAPPENING',
  COMING_SOON: 'COMING_SOON'
};

export const TargetAttendants = [
  {
    id: 0,
    name: 'College students'
  },
  {
    id: 1,
    name: 'University students'
  },
  {
    id: 2,
    name: 'New graduates from colleges and universities'
  },
  {
    id: 3,
    name: 'Employed candidates'
  },
  {
    id: 4,
    name: 'Unemployed candidates'
  }
];
