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
    return new Date(dateValue).toISOString().replace(/T.*/, '').split('-').reverse().join('-');
  } catch (err) {
    return '01-01-1970';
  }
};

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

//convert enum status to string
export const convertEnumToString = (data) => {
  if (data !== undefined) {
    const arr = data.includes('_') ? data.split('_') : Array.of(data); //['INTERN', 'SHIP', 'STUDENT']
    const result = arr
      .map((item) => item.toString().toLowerCase())
      .map((item) => item[0].toUpperCase() + item.slice(1))
      .join(' ');
    return result;
  }
  return data;
};

export const convertToUTCString = (data) => new Date(data).toUTCString();

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
