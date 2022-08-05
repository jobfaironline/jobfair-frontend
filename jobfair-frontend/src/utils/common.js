import { CountryConst } from '../constants/AttendantConstants';
import { DateFormat, MatchingPointColor } from '../constants/ApplicationConst';
import { JOB_FAIR_PLAN_STATUS } from '../constants/JobFairConst';
import { Progress, Tag } from 'antd';
import React from 'react';
import moment from 'moment';

export const contains = (list, listCurrent) => {
  let result = false;
  list.forEach((e) => {
    if (listCurrent?.includes(e) === true) result = true;
  });
  return result;
};

export const transformToSelections = (data) => {
  if (!data) return null;
  if (Array.isArray(data) && !data.length) return null;

  if (Array.isArray(data)) return data.map((item) => toSelection(item));

  return [toSelection(data)];
};

const toSelection = (data) => {
  if (data?.user) return { value: data.user?.id, label: data.user?.email };

  return { value: data?.id, label: data?.name };
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const convertToDateString = (dateValue) => {
  try {
    return moment(dateValue).format(DateFormat);
  } catch (err) {
    return '01-01-1970';
  }
};

export const getTimeDifferenceInDate = (date1, date2) => (date1 - date2) / (1000 * 3600 * 24);

export const convertToDateValue = (dateString) => Date.parse(dateString);

export const convertToMoment = (data) => {
  const result = data.map((item) => ({
    ...item,
    range: [moment(convertToDateString(item.fromDate)), moment(convertToDateString(item.toDate))]
  }));
  return result;
};

//attendantProfileForm.container.jsx
export const handleConvertRangePicker = (data) => {
  const result = data.map((item) => ({
    ...item,
    fromDate: convertToDateValue(item.range[0].format()),
    toDate: convertToDateValue(item.range[1].format())
  }));
  return result;
};

export const convertMomentToMilliseconds = (moment) => convertToDateValue(moment.format());

//convert enum status to string
export const convertEnumToString = (data) => {
  if (!data) return data;
  const arr = data.includes('_') ? data.split('_') : Array.of(data); //['INTERN', 'SHIP', 'STUDENT']
  return arr
    .map((item) => item.toString().toLowerCase())
    .map((item) => item[0].toUpperCase() + item.slice(1))
    .join(' ');
};

export const convertToUTCString = (data) => new Date(data).toUTCString();

export function toLocaleUTCDateString(date, locales, offset) {
  if (!date) return;
  const timeDiff = 60000;
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Bangkok'
  };
  const adjustedDate = new Date(date.valueOf() + timeDiff);
  return adjustedDate.toLocaleDateString(locales, options, offset);
}

//Get date (long) after n years
export const getNYearAfter = (numberOfYears) => {
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const result = new Date(year + numberOfYears, month, day).getTime();
  return result;
};

//
export const handleCreateListEmailFromListAccount = (arr) => {
  const listEmail = [];
  arr.map((account) => {
    listEmail.push(account?.account.email);
  });
  return listEmail;
};
export const handleCreateListNameFromListAccount = (arr) => {
  const listName = [];
  arr.map((account) => {
    const name = `${account?.account.middlename} ${account?.account.lastname}`;
    listName.push(name);
  });
  return listName;
};
//get status
export const handleGetStatus = (data) => data.find((item) => item.key !== undefined);

export const handleProgress = (proficiency) => {
  switch (proficiency) {
    case 1:
      return <Progress percent={20} status='active' steps='5' />;
    case 2:
      return <Progress percent={40} status='active' steps='5' />;
    case 3:
      return <Progress percent={60} status='active' steps='5' />;
    case 4:
      return <Progress percent={80} status='active' steps='5' />;
    default:
      return <Progress percent={100} status='active' steps='5' />;
  }
};

//convert date of birth to Age
export const convertDobToAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;

  return age;
};

//handle status tag
export const handleStatusTag = (status) => {
  if (status === undefined) return;

  switch (status) {
    case JOB_FAIR_PLAN_STATUS.PENDING:
      return <Tag color='blue'>{convertEnumToString(status)}</Tag>;
    case JOB_FAIR_PLAN_STATUS.APPROVE:
      return <Tag color='green'>{convertEnumToString(status)}</Tag>;
    case JOB_FAIR_PLAN_STATUS.DRAFT:
      return <Tag color='gold'>{convertEnumToString(status)}</Tag>;
    case JOB_FAIR_PLAN_STATUS.REJECT:
      return <Tag color='red'>{convertEnumToString(status)}</Tag>;
    case JOB_FAIR_PLAN_STATUS.DELETED:
      return <Tag color='volcano'>{convertEnumToString(status)}</Tag>;
    default:
      return <Tag color='orange'>{convertEnumToString(status)}</Tag>;
  }
};

export const difference = (array1, array2) => array1.filter((item) => array2.includes(item));

export const convertHH_mmToMinute = (moment) => {
  const arr = moment.format().split('T')[1].split(':');
  const result = arr[0] * 60 + parseInt(arr[1]);
  return result;
};

export const getDateDifferent = (timeStamp) => {
  const milli = new Date() - timeStamp;
  const days = Math.round(milli / 1000 / 60 / 60 / 24);
  if (days <= 1) return '1 day ago';
  if (days < 7) return `${Math.round(days)} days ago`;
  const weeks = Math.round(days / 7);
  if (weeks <= 1) return '1 week ago';
  if (weeks < 4) return `${Math.round(weeks)} weeks ago`;
  const months = Math.round(weeks / 4);
  if (months <= 1) return '1 month ago';
  if (months <= 12) return `${Math.round(months)} year ago`;
  const years = Math.round(months / 12);
  if (years <= 1) return '1 year ago';
  return `${years} years ago`;
};

export const getCountryOrder = () => CountryConst.sort((o1, o2) => o1.name.localeCompare(o2.name));
export const formatMoney = (value, message = 'Not enter') => {
  if (value === undefined || value === null || value === '') return message;
  return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
export const parseMoney = (value) => value.replace(/\$\s?|(,*)/g, '');

export const deepClone = (value) => {
  if (Array.isArray(value)) return value.map((child) => deepClone(child));
  if (moment.isMoment(value)) return value.clone();

  if (typeof value === 'object' && value !== null)
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, deepClone(v)]));

  return value;
};

export const getTimeZoneCode = () =>
  //https://stackoverflow.com/questions/1954397/detect-timezone-abbreviation-using-javascript
  new Date().toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];

export const getMatchingPointColor = (value) => {
  let tagColor = MatchingPointColor.low.color;
  if (value > MatchingPointColor.medium.score) tagColor = MatchingPointColor.medium.color;
  if (value > MatchingPointColor.high.score) tagColor = MatchingPointColor.high.color;
  return tagColor;
};

export const getCurrentUserAgent = () => {
  const ua = navigator.userAgent;
  let tem;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return { name: 'IE', version: tem[1] || '' };
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) return { name: 'Opera', version: tem[1] };
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);

  return {
    name: M[0],
    version: M[1]
  };
};
