import {CountryConst} from "../components/attendant-profile-form/AttendantConstants";

export const mapperResumeDetail = (res ,cv) => {
  return {
    jobPositionTitle: cv.jobTitle,
    candidateName: ''.concat(`${res.data.account.firstname} ${res.data.account.middlename} ${res.data.account.lastname}`),
    candidateYearOfExp: cv.yearOfExp,
    candidateJobLevel: cv.jobLevel,
    candidateJobTitle: cv.jobTitle,
    candidateSkills: cv.skills,
    candidateActivities: cv.activities,
    candidateCertifications: cv.certifications,
    candidateEducation: cv.educations,
    candidateReferences: cv.references,
    candidateWorkHistories: cv.workHistories,
    gender: res.data.account.gender,
    imageUrl: res.data.account.profileImageUrl,
    country: CountryConst.find(item => item.id = res.data.countryId)?.name,
    dob: res.data.dob
  }
}