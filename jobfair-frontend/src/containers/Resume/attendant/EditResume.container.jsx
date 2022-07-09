import { ActivityList } from '../../../components/forms/ProfileForm/AttendantProfileForm/ActivityList/ActivityList.component';
import { Avatar, BackTop, Button, Divider, Form, Typography, message, notification } from 'antd';
import { CertificationList } from '../../../components/forms/ProfileForm/AttendantProfileForm/CertificationList/CertificationList.component';
import { EducationList } from '../../../components/forms/ProfileForm/AttendantProfileForm/EducationList/EducationList.component';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { ReferenceList } from '../../../components/forms/ProfileForm/AttendantProfileForm/ReferencesList/ReferencesList.component';
import { ResumeOverviewInformation } from '../../../components/customized-components/Resume/form/ResumeOverviewInformation.component';
import { SkillList } from '../../../components/forms/ProfileForm/AttendantProfileForm/SkillList/SkillList.component';
import { WorkHistoryList } from '../../../components/forms/ProfileForm/AttendantProfileForm/WorkHistoryList/WorkHistoryList.component';
import { convertToMoment, getBase64 } from '../../../utils/common';
import { getAttendantCvById } from '../../../services/jobhub-api/CvControllerService';
import AnchorComponent from '../../../components/commons/Anchor/Achor.component';
import React, { useEffect, useRef, useState } from 'react';
import UploadComponent from '../../../components/commons/UploadComponent/Upload.component';
import moment from 'moment';

const formTitles = [
  { title: 'Overview', href: '#overview' },
  { title: 'Skills', href: '#skills' },
  { title: 'Work history', href: '#work-histories' },
  { title: 'Education', href: '#educations' },
  { title: 'Certification', href: '#certifications' },
  { title: 'Reference', href: '#references' },
  { title: 'Activity', href: '#activities' }
];

const mapperProfileDate = (resume) => ({
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
const { Text, Title } = Typography;

export const EditResumeContainer = (props) => {
  const { resumeId } = props;

  const [form] = Form.useForm();
  const [data, setData] = useState();
  const [imageUrl, setMediaUrl] = useState();
  const uploadFileRef = useRef();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let { data: resume } = await getAttendantCvById(resumeId);
      resume = mapperProfileDate(resume);
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
        /*await uploadProfileImage(formData);
        dispatch(changeProfileURL(url));*/
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

  const onFinish = () => {};

  if (data === undefined || imageUrl === undefined) return <LoadingComponent isWholePage={true} />;

  form.setFieldsValue({ ...data });
  return (
    <div className={'profile-form'}>
      <Divider orientation='left'>
        <Title level={2} id={'account-profile'} style={{ scrollMarginTop: '126px' }}>
          {data.name}
        </Title>
      </Divider>
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
  );
};
