import { CountryConst } from '../constants/AttendantConstants';

export const mapperResumeDetail = (res, resume) => ({
  jobPositionTitle: resume.jobTitle,
  candidateName: ''.concat(`${res.data.account.firstname} ${res.data.account.middlename} ${res.data.account.lastname}`),
  candidateYearOfExp: resume.yearOfExp,
  candidateJobLevel: resume.jobLevel,
  candidateJobTitle: resume.jobTitle,
  candidateSkills: resume.skills,
  candidateActivities: resume.activities,
  candidateCertifications: resume.certifications,
  candidateEducation: resume.educations,
  candidateReferences: resume.references,
  candidateWorkHistories: resume.workHistories,
  gender: res.data.account.gender,
  imageUrl: res.data.account.profileImageUrl,
  country: CountryConst.find((item) => (item.id = res.data.countryId))?.name,
  dob: res.data.dob
});
