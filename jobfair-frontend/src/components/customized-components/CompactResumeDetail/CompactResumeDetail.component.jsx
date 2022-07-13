import './CompactResumeDetail.style.scss';
import { Avatar, Button, Card, Descriptions, Modal } from 'antd';
import { CountryConst, QualificationConst } from '../../../constants/AttendantConstants';
import { ResumeDetailComponent } from '../Resume/ResumeDetail.component';
import { UserOutlined } from '@ant-design/icons';
import { convertEnumToString } from '../../../utils/common';
import React from 'react';

const mapperResumeDetail = (resume) => {
  const result =
    resume.educations
      ?.map((item) => item?.qualificationId)
      .map((name) => {
        const result = QualificationConst.find((qualification) => qualification.enumName === name);
        return result.id;
      })
      ?.sort() ?? 'No information';
  const highestEducationLevel =
    result !== undefined ? QualificationConst.find((item) => item.id === result[0])?.name : '';
  return {
    ...resume,
    overviewData: {
      fullName: resume.fullName,
      email: resume.email,
      phoneNumber: resume.phone,
      jobTitle: resume.jobTitle,
      yearOfExperience: resume.yearOfExp,
      location: CountryConst.find((item) => (item.id = resume.countryId))?.name,
      educationLevel: highestEducationLevel,
      profileImage: resume.profileImageUrl,
      jobLevel: resume.jobLevel
    },
    skills: resume.skills,
    activities: resume.activities,
    certifications: resume.certifications,
    educations: resume.educations,
    references: resume.references,
    workHistories: resume.workHistories,
    about: resume.aboutMe
  };
};

export const CompactResumeDetail = (props) => {
  const { data } = props;
  const handleOpenResume = () => {
    const resumeData = mapperResumeDetail(data);
    Modal.info({
      bodyStyle: { padding: '1rem' },
      title: 'Resume detail',
      width: '90rem',
      closable: true,
      maskClosable: true,
      content: <ResumeDetailComponent data={resumeData} />
    });
  };

  return (
    <div className='compact-resume-wrapper'>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '1rem' }}>
          <Avatar size={80} icon={<UserOutlined />} />
        </div>
        <Descriptions title={'Applicant resume'} layout={'horizontal'}>
          <Descriptions.Item label='Full name' span={24} style={{ paddingBottom: 0 }}>
            {data.attendant.account.firstname} {data.attendant.account.middlename} {data.attendant.account.lastname}
          </Descriptions.Item>
          <Descriptions.Item label='Email' className='unimportant-field' span={24}>
            {data.email}
          </Descriptions.Item>
          <Descriptions.Item label='Phone' span={24}>
            {data.phone}
          </Descriptions.Item>
          <Descriptions.Item label='Year of exp:' span={24} className='unimportant-field'>
            {data.yearOfExp}
          </Descriptions.Item>
          <Descriptions.Item label='Job level' span={24}>
            {convertEnumToString(data.jobLevel)}
          </Descriptions.Item>
          <Descriptions.Item span={24}>
            <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
              <Button type='primary' shape='round' onClick={() => handleOpenResume()}>
                Check Resume
              </Button>
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};
