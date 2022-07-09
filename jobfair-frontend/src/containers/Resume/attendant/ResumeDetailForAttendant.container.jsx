import { Button, Typography, notification } from 'antd';
import { CountryConst, QualificationConst } from '../../../constants/AttendantConstants';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { ResumeDetailComponent } from '../../../components/customized-components/Resume/ResumeDetail.component';
import { getAttendantCvById } from '../../../services/jobhub-api/CvControllerService';
import { getAttendantDetailAPI } from '../../../services/jobhub-api/AttendantControllerService';
import React, { useEffect, useState } from 'react';

const mapperResumeDetail = (attendantData, resume) => {
  const result = resume.educations
    ?.map((item) => item.qualificationId)
    .map((name) => {
      const result = QualificationConst.find((qualification) => qualification.enumName === name);
      return result.id;
    })
    .sort();
  const highestEducationLevel =
    result !== undefined ? QualificationConst.find((item) => item.id === result[0])?.name : '';
  return {
    overviewData: {
      fullName: `${attendantData.account.firstname} ${attendantData.account.middlename} ${attendantData.account.lastname}`,
      email: attendantData.account?.email,
      phoneNumber: attendantData.account?.phone,
      jobTitle: resume.jobTitle,
      yearOfExperience: resume.yearOfExp,
      location: CountryConst.find((item) => (item.id = attendantData.countryId))?.name,
      educationLevel: highestEducationLevel,
      profileImage: attendantData.account.profileImageUrl,
      jobLevel: resume.jobLevel
    },
    skills: resume.skills,
    activities: resume.activities,
    certifications: resume.certifications,
    educations: resume.educations,
    references: resume.references,
    workHistories: resume.workHistories,
    about: `Hello my name is James Rogers and Painter from Miami. In pharetra orci dignissim, blandit mi semper,
  ultricies diam. Suspendisse malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor
  non consequat enim. Sed vitae aliquam velit. Aliquam ante erat, blandit at pretium et, accumsan ac est.
  Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus.
  Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar. Aliquam
  ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum
  sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris
  nec erat ut libero vulputate pulvinar.'`
  };
};

const ResumeDetailForAttendantContainer = (props) => {
  const { resumeId, attendantId } = props;
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: resume } = await getAttendantCvById(resumeId);
      const { data: attendantData } = await getAttendantDetailAPI(attendantId);
      const data = mapperResumeDetail(attendantData, resume);
      setData(data);
    } catch (e) {
      notification['error']({
        message: `Fetch resume fail`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  if (data === undefined) return <LoadingComponent isWholePage={true} />;

  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex' }}>
        <Typography.Title level={2}>My resume</Typography.Title>
        <Button className={'button'} type={'primary'} style={{ marginLeft: '1rem' }}>
          Edit resume
        </Button>
      </div>
      <ResumeDetailComponent data={data} />
    </div>
  );
};

export default ResumeDetailForAttendantContainer;
