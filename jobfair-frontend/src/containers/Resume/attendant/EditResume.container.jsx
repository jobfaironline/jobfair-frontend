import { ActivityList } from '../../../components/forms/ProfileForm/AttendantProfileForm/ActivityList/ActivityList.component';
import { Avatar, BackTop, Button, Form, Input, Modal, Typography, message, notification } from 'antd';
import { CertificationList } from '../../../components/forms/ProfileForm/AttendantProfileForm/CertificationList/CertificationList.component';
import { EducationList } from '../../../components/forms/ProfileForm/AttendantProfileForm/EducationList/EducationList.component';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { ReferenceList } from '../../../components/forms/ProfileForm/AttendantProfileForm/ReferencesList/ReferencesList.component';
import { ResumeOverviewInformation } from '../../../components/customized-components/Resume/form/ResumeOverviewInformation.component';
import { SkillList } from '../../../components/forms/ProfileForm/AttendantProfileForm/SkillList/SkillList.component';
import { WorkHistoryList } from '../../../components/forms/ProfileForm/AttendantProfileForm/WorkHistoryList/WorkHistoryList.component';
import { convertToMoment, deepClone, getBase64, handleConvertRangePicker } from '../../../utils/common';
import {
  draftCv,
  getAttendantCvById,
  updateCv,
  uploadProfileImage
} from '../../../services/jobhub-api/CvControllerService';
import { getAttendantDetailAPI } from '../../../services/jobhub-api/AttendantControllerService';
import { useSelector } from 'react-redux';
import AnchorComponent from '../../../components/commons/Anchor/Achor.component';
import React, { useEffect, useRef, useState } from 'react';
import UploadComponent from '../../../components/commons/UploadComponent/Upload.component';
import axios from 'axios';
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
  return result.map((reference) => ({
    ...reference,
    fullname: reference.fullName ? reference.fullName : reference.fullname
  }));
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

const formTitles = [
  { title: 'Overview', href: '#overview' },
  { title: 'Skills', href: '#skills' },
  { title: 'Work history', href: '#work-histories' },
  { title: 'Education', href: '#educations' },
  { title: 'Certification', href: '#certifications' },
  { title: 'Reference', href: '#references' },
  { title: 'Activity', href: '#activities' }
];

const mapperResumeData = (resume) => ({
  ...resume,
  workHistories: convertToMoment(resume.workHistories),
  activities: convertToMoment(resume.activities),
  educations: convertToMoment(resume.educations).map((education) => ({
    ...education,
    qualification: education.qualificationId
  })),
  certifications: resume.certifications.map((certification) => ({
    ...certification,
    issueDate: moment(certification.issueDate)
  })),
  references: resume.references.map((reference) => ({
    ...reference,
    phone: reference.phoneNumber
  }))
});

const mappingAttendantProfileToResumeData = (attendantProfile, resume) => ({
  ...resume,
  email: attendantProfile.account.email,
  phone: attendantProfile.account.phone,
  yearOfExp: attendantProfile.yearOfExp,
  jobLevel: attendantProfile.jobLevel,
  jobTitle: attendantProfile.jobTitle,
  skills: attendantProfile.skills.map((skill) => ({ ...skill, id: null })),
  workHistories: convertToMoment(attendantProfile.workHistories).map((history) => ({
    ...history,
    id: null
  })),
  educations: convertToMoment(attendantProfile.educations).map((education) => ({
    ...education,
    id: null,
    qualificationId: education.qualification
  })),
  certifications: attendantProfile.certifications.map((certification) => ({
    ...certification,
    id: null,
    issueDate: moment(certification.issueDate)
  })),
  references: attendantProfile.references.map((reference) => ({
    ...reference,
    id: null
  })),
  activities: convertToMoment(attendantProfile.activities).map((activity) => ({ ...activity, id: null })),
  fullName: `${attendantProfile.account.firstname ?? ''} ${attendantProfile.account.middlename ?? ''} ${
    attendantProfile.account.lastname ?? ''
  }`,
  countryId: attendantProfile.countryId
});
const { Text } = Typography;

export const EditResumeContainer = (props) => {
  const { resumeId } = props;
  const userId = useSelector((state) => state.authentication.user.userId);

  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [imageUrl, setMediaUrl] = useState();
  const uploadFileRef = useRef();
  const resumeIdRef = useRef(resumeId);
  const [confirmImportModalVisibility, setConfirmImportModalVisibility] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (resumeIdRef.current === undefined) {
        //create new resume if page does not contain resume id
        const { data } = await draftCv();
        resumeIdRef.current = data.id;
      }
      let { data: resume } = await getAttendantCvById(resumeIdRef.current);
      resume = mapperResumeData(resume);
      setData(resume);
      setMediaUrl(resume.profileImageUrl);
    } catch (e) {
      notification['error']({
        message: `Fetch attendant profile failed`
      });
    }
  };

  const mediaUpload = {
    name: 'file',
    beforeUpload: (file) => {
      uploadFileRef.current = file;
      return false;
    },
    onChange: async () => {
      try {
        const file = uploadFileRef.current;
        if (file === undefined) return;
        const fileExtension = file.name.split('.').pop();
        if (fileExtension !== 'png' && fileExtension !== 'jpg' && fileExtension !== 'jpeg') {
          notification['error']({
            message: `${file.name} is not image file`
          });
          return;
        }
        const url = await getBase64(file);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('cvId', resumeIdRef.current);
        await uploadProfileImage(formData);
        setMediaUrl(url);
        message.success('Upload profile image successfully');
      } catch (err) {
        message.error('Upload profile image failed.');
      }
    },
    onRemove: async () => {
      setMediaUrl(undefined);
    },
    showUploadList: false,
    maxCount: 1
  };

  const onFinish = async (values) => {
    const body = {
      ...values,
      activities: mapperForActivitiesRequestBody(values.activities),
      certifications: mapperForCertificationRequestBody(values.certifications),
      educations: mapperForEducationRequestBody(values.educations),
      references: mapperForReferencesRequestBody(values.references),
      workHistories: mapperForWorkHistoryRequestBody(values.workHistories)
    };

    try {
      await updateCv(resumeIdRef.current, body);
      notification['success']({
        message: `Update account profile successfully`
      });
    } catch (e) {
      notification['error']({
        message: `Update profile failed`,
        description: `There is problem while updating, try again later`
      });
    }
  };

  const fetchProfileImage = async (url) => {
    try {
      const res = await axios({
        method: 'get',
        url: `${url}?not-from-cache-please`,
        responseType: 'blob',
        crossdomain: true
      });
      const file = res.data;
      const baseUrl = await getBase64(file);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('cvId', resumeIdRef.current);
      await uploadProfileImage(formData);
      setMediaUrl(baseUrl);
    } catch (e) {
      notification['error']({
        message: `Fetch attendant profile image failed`
      });
    }
  };

  const onImportFromProfile = () => {
    setConfirmImportModalVisibility(true);
  };

  const onCloseImportModal = () => {
    setConfirmImportModalVisibility(false);
  };

  const handleImportFromProfile = async () => {
    try {
      const { data } = await getAttendantDetailAPI(userId);
      fetchProfileImage(data.account.profileImageUrl);
      setData((prevState) => mappingAttendantProfileToResumeData(data, prevState));
      onCloseImportModal();
    } catch (e) {
      notification['error']({
        message: `Fetch attendant profile failed`
      });
    }
  };

  if (data === undefined || imageUrl === undefined) return <LoadingComponent isWholePage={true} />;

  form.setFieldsValue({ ...data });
  return (
    <>
      <Modal
        visible={confirmImportModalVisibility}
        title={'Import from profile'}
        onOk={handleImportFromProfile}
        onCancel={onCloseImportModal}>
        Are you sure to import all fields from your profile? This will override every fields in your CV
      </Modal>
      <div className={'profile-form'}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Form form={form}>
            <Form.Item
              name={['name']}
              hasFeedback
              id={'account-profile'}
              style={{ scrollMarginTop: '126px', marginTop: '1rem' }}>
              <Input placeholder='Untitled' id={'cvName'} style={{ width: '100%' }} />
            </Form.Item>
          </Form>

          <Button className={'button'} type={'primary'} style={{ marginLeft: 'auto' }} onClick={onImportFromProfile}>
            Import from your profile
          </Button>
        </div>

        <div style={{ position: 'fixed', left: '5%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <UploadComponent uploadProps={mediaUpload} isImageCrop={true} aspect={1 / 1}>
              <div style={{ display: 'flex', flexDirection: 'column', margin: '2rem' }}>
                <Avatar size={200} src={imageUrl} alt='avatar' style={{ maxHeight: '200px' }} />
                <Text style={{ marginTop: '1rem' }} strong>
                  Change avatar
                </Text>
              </div>
            </UploadComponent>
          </div>
        </div>
        <div style={{ position: 'fixed', right: '15%' }}>
          <AnchorComponent listData={formTitles} href={'#account-profile'} title={'Account profile'} />
        </div>
        <Form
          form={form}
          onFinish={onFinish}
          requiredMark='required'
          autoComplete='off'
          layout={'vertical'}
          scrollToFirstError={{ block: 'center', behavior: 'smooth' }}>
          <ResumeOverviewInformation form={form} id={'overview'} />
          <SkillList id={'skills'} />
          <WorkHistoryList form={form} id={'work-histories'} />
          <EducationList form={form} id={'educations'} />
          <CertificationList form={form} id={'certifications'} />
          <ReferenceList form={form} id={'references'} />
          <ActivityList form={form} id={'activities'} />
          <div style={{ display: 'flex', marginTop: '1rem' }}>
            <Button type='primary' htmlType='submit' className={'button'} style={{ marginLeft: 'auto' }}>
              Save
            </Button>
          </div>
        </Form>
        <BackTop visibilityHeight={500} target={() => document} />
      </div>
    </>
  );
};
