export const REGEX_EMAIL = '^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,6}$';
export const REGEX_PASSWORD = '^.{2,}$';
export const REGEX_PHONE = '^[0-9]{10,11}$';
export const REGEX_XSS = '(<w*)((s/>)|(.*</w*>))';
export const DEFAULT_PROFILE_IMAGE =
  'https://s.yimg.com/ny/api/res/1.2/hoUUlCBtzgBGfnn_v2_6tw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTk4MA--/https://s.yimg.com/uu/api/res/1.2/zHTIgAjnvELyX159tagdPg--~B/aD05OTg7dz05Nzg7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/homerun/hello_giggles_454/b09a659b35c629a8dc378d7a73e2e740';
export const REGEX_NEW_PASSWORD = '^.{2,}$';
export const REGEX_RE_NEW_PASSWORD = '^.{2,}$';

export const TOKEN_KEY = 'token';
export const TOKEN = '';
export const USER_STORAGE = 'user';
export const COMPANY_ID_DEMO = 'fe99c965-3dc7-4391-9665-1c7c72cce981';
export const DateFormat = 'MMMM DD,YYYY';
export const HourMinuteDateFormat = 'YYYY-MMMM-DD';
export const CustomDateFormat = 'MMMM DD,YYYY HH:mm';
export const MinuteFormat = 'HH:mm';
export const MonthFormat = 'MMMM, YYYY';

export const MinimumDateOfBirth = 18;
export const TestStatus = {
  PASS: 'PASS',
  FAIL: 'FAIL',
  IN_PROGRESS: 'IN_PROGRESS',
  NOT_TAKEN: 'NOT_TAKEN',
  NO_TEST: 'NO_TEST',
  DONE: 'DONE'
};

export const MatchingPointColor = {
  low: {
    color: 'red',
    score: 0.0
  },
  medium: {
    color: 'gold',
    score: 0.5
  },
  high: {
    color: 'green',
    score: 0.7
  }
};
