import { Button, Typography, notification } from 'antd';
import { CountryConst, QualificationConst } from '../../../constants/AttendantConstants';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { PATH_ATTENDANT } from '../../../constants/Paths/Path';
import { ResumeDetailComponent } from '../../../components/customized-components/Resume/ResumeDetail.component';
import { generatePath, useHistory } from 'react-router-dom';
import { getAttendantCvById } from '../../../services/jobhub-api/CvControllerService';
import React, { useEffect, useState } from 'react';

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
      location: CountryConst.find((item) => item.id === resume.countryId)?.name,
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

const ResumeDetailForAttendantContainer = (props) => {
  const { resumeId, isEditable = true } = props;
  const history = useHistory();
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data: resume } = await getAttendantCvById(resumeId);
      const data = mapperResumeDetail(resume);
      setData(data);
    } catch (e) {
      notification['error']({
        message: `Fetch resume fail`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  const handleEditResume = () => {
    const url = generatePath(PATH_ATTENDANT.EDIT_RESUME_PAGE, { id: resumeId });
    history.push(url);
  };

  if (data === undefined) return <LoadingComponent isWholePage={true} />;

  return (
    <div style={{ marginTop: '1rem' }}>
      <div style={{ display: 'flex' }}>
        <Typography.Title level={2}>{data.name}</Typography.Title>
        {isEditable ? (
          <Button className={'button'} type={'primary'} style={{ marginLeft: '1rem' }} onClick={handleEditResume}>
            Edit resume
          </Button>
        ) : null}
      </div>
      <ResumeDetailComponent data={data} isForCompany={false} />
    </div>
  );
};

export default ResumeDetailForAttendantContainer;
