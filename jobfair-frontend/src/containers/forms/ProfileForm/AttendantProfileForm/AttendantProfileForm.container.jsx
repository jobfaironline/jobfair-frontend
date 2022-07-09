import { ActivityList } from '../../../../components/forms/ProfileForm/AttendantProfileForm/ActivityList/ActivityList.component';
import { AttendantProfile } from '../../../../components/forms/ProfileForm/AttendantProfileForm/AttendantProfile.component';
import { CertificationList } from '../../../../components/forms/ProfileForm/AttendantProfileForm/CertificationList/CertificationList.component';
import { EducationList } from '../../../../components/forms/ProfileForm/AttendantProfileForm/EducationList/EducationList.component';
import { Form, notification } from 'antd';
import { LoadingComponent } from '../../../../components/commons/Loading/Loading.component';
import { ProfileFormContainer } from '../ProfileForm.container';
import { ReferenceList } from '../../../../components/forms/ProfileForm/AttendantProfileForm/ReferencesList/ReferencesList.component';
import { SkillList } from '../../../../components/forms/ProfileForm/AttendantProfileForm/SkillList/SkillList.component';
import { WorkHistoryList } from '../../../../components/forms/ProfileForm/AttendantProfileForm/WorkHistoryList/WorkHistoryList.component';
import {
  convertToDateString,
  convertToDateValue,
  convertToMoment,
  deepClone,
  handleConvertRangePicker
} from '../../../../utils/common';
import {
  getAttendantDetailAPI,
  updateAttendantProfileAPI
} from '../../../../services/jobhub-api/AttendantControllerService';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const removeIdNewItem = (data) => {
  const result = deepClone(data);
  result.forEach((history) => {
    if (history.isNew) history.id = null;
  });
  return result;
};

const mapperForWorkHistoryRequestBody = (workHistories) => {
  let result = deepClone(workHistories);
  result = handleConvertRangePicker(result);
  result = removeIdNewItem(result);
  return result;
};

const mapperForEducationRequestBody = (educations) => {
  let result = deepClone(educations);
  result = handleConvertRangePicker(result);
  result = removeIdNewItem(result);
  return result;
};

const mapperForReferencesRequestBody = (references) => {
  let result = deepClone(references);
  result = removeIdNewItem(result);
  return result;
};

const mapperForCertificationRequestBody = (certifications) => {
  let result = deepClone(certifications);
  result.forEach((certification) => {
    certification.issueDate = certification.issueDate ? certification.issueDate.unix() * 1000 : null;
  });
  result = removeIdNewItem(result);
  return result;
};

const mapperForActivitiesRequestBody = (activities) => {
  let result = deepClone(activities);
  result = handleConvertRangePicker(result);
  result = removeIdNewItem(result);
  return result;
};

const mapperProfileDate = (data) => ({
  ...data,
  residenceId: data.countryId !== 60 ? 62 : data.residenceId,
  dob: data.dob ? moment(convertToDateString(data.dob)) : moment(),
  workHistories: convertToMoment(data.workHistories),
  activities: convertToMoment(data.activities),
  educations: convertToMoment(data.educations),
  certifications: data.certifications.map((certification) => {
    certification.issueDate = moment(certification.issueDate);
    return certification;
  })
});

const formTitles = [
  { title: 'Profile', href: '#profile' },
  { title: 'Skills', href: '#skills' },
  { title: 'Work history', href: '#work-histories' },
  { title: 'Education', href: '#educations' },
  { title: 'Certification', href: '#certifications' },
  { title: 'Reference', href: '#references' },
  { title: 'Activity', href: '#activities' }
];

const AttendantProfileFormContainer = () => {
  const [form] = Form.useForm();
  const attendantId = useSelector((state) => state.authentication.user.userId);

  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await getAttendantDetailAPI(attendantId);
      setData(mapperProfileDate(data));
    } catch (e) {
      notification['error']({
        message: `Fetch attendant profile failed`
      });
    }
  };

  const onFinish = async (values) => {
    const body = {
      account: values.account,
      accountId: attendantId,
      activities: mapperForActivitiesRequestBody(values.activities),
      address: values.address,
      certifications: mapperForCertificationRequestBody(values.certifications),
      countryId: values.countryId,
      dob: convertToDateValue(values.dob.format()),
      educations: mapperForEducationRequestBody(values.educations),
      jobLevel: values.jobLevel,
      jobTitle: values.jobTitle,
      maritalStatus: values.maritalStatus,
      references: mapperForReferencesRequestBody(values.references),
      residenceId: values.residenceId,
      skills: values.skills,
      title: values.title,
      workHistories: mapperForWorkHistoryRequestBody(values.workHistories),
      yearOfExp: values.yearOfExp
    };

    try {
      await updateAttendantProfileAPI(body);
      fetchData();
      notification['success']({
        message: `Update attendant profile successfully`
      });
    } catch (e) {
      notification['error']({
        message: `Update attendant profile failed`,
        description: `There is problem while updating, try again later`
      });
    }
  };

  if (data === undefined || data === null || Object.keys(data).length === 0)
    return <LoadingComponent isWholePage={true} />;

  return (
    <ProfileFormContainer form={form} onFinish={onFinish} data={data} formAnchorTitles={formTitles}>
      <AttendantProfile form={form} id={'profile'} />
      <SkillList id={'skills'} />
      <WorkHistoryList form={form} id={'work-histories'} />
      <EducationList form={form} id={'educations'} />
      <CertificationList form={form} id={'certifications'} />
      <ReferenceList form={form} id={'references'} />
      <ActivityList form={form} id={'activities'} />
    </ProfileFormContainer>
  );
};

export default AttendantProfileFormContainer;
