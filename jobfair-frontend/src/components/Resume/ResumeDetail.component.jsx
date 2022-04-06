/* eslint-disable no-unused-vars */
import React from 'react'
import { Card, Spin } from 'antd'
import ResumeHeader from './Header/ResumeHeader.component'
import ResumeContent from './Content/ResumeContent.component'
import EvaluationFormComponent from '../EvaluationForm/EvaluationForm.component'
import { convertDobToAge, convertEnumToString } from '../../utils/common'
import { QualificationConst } from '../AttendantProfileForm/AttendantConstants'

const ResumeDetailComponent = props => {
  const { onFinish, form, data, attendant } = props

  if (data === undefined || data === null) {
    return <Spin />
  }

  //TODO: refactor mapping later
  const educations = !!data?.candidateEducation
    ? data.candidateEducation.map((item, index) => {
        return {
          id: index,
          time: `${item.fromDate}-${item.toDate}`,
          titleName: item.school,
          subName: `with subject ${item.subject}`,
          description: `Achievement: ${item.achievement} - Qualification: ${convertEnumToString(item.qualificationId)}`
        }
      })
    : [
        {
          id: '1',
          time: '2012-2014',
          titleName: 'Modern College',
          subName: 'Bachlors in Fine Arts',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        },
        {
          id: '2',
          time: '2008-2012',
          titleName: 'Haravard University',
          subName: 'Computer Science',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        }
      ]

  //get the highest education level
  const result = data.candidateEducation
    ?.map(item => item.qualificationId)
    .map(name => {
      const result = QualificationConst.find(qualification => qualification.enumName === name)
      return result.id
    })
    .sort()
  const highestEducationLevel = result !== undefined ? QualificationConst.find(item => item.id === result[0])?.name : ''
  const workExperiences = !!data?.candidateWorkHistories
    ? data.candidateWorkHistories.map((item, index) => {
        return {
          id: index,
          time: `${item.fromDate}-${item.toDate}`,
          titleName: item.company,
          subName: item.description,
          description: `Position: ${item.position}`
        }
      })
    : [
        {
          id: '1',
          time: '2012-2014',
          titleName: 'Designer',
          subName: 'Musical Studio',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        },
        {
          id: '2',
          time: '2008-2012',
          titleName: 'CEO-founder',
          subName: 'Techy Studio',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        }
      ]
  const adwards = !!data?.candidateCertifications
    ? data.candidateCertifications.map((item, index) => {
        return {
          id: index,
          time: item.year,
          titleName: item.name,
          subName: `Certification link: ${item.certificationLink}`,
          description: `At institution: ${item.institution}`
        }
      })
    : [
        {
          id: '1',
          time: 'JAN 2017',
          titleName: 'Perfect Attendance Programs',
          subName: '',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        },
        {
          id: '2',
          time: 'DEC 2017',
          titleName: 'Top Performer Recognition',
          subName: '',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        },
        {
          id: '3',
          time: 'DEC 2017',
          titleName: 'King LLC',
          subName: '',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
        }
      ]

  const candidateOverView = {
    experience: `${data.candidateYearOfExp} Years`,
    age: `${convertDobToAge(data.dob)} years`,
    currentSalary: '41K - 50K',
    expectedSalary: 'Above 50K',
    gender: `${convertEnumToString(data.gender)}`,
    language: 'English, French',
    educationLevel: highestEducationLevel
  }
  const skills = !!data?.candidateSkills
    ? data.candidateSkills.map((item, index) => {
        return {
          id: index,
          name: item.name
        }
      })
    : [
        { id: '1', name: 'Creativity' },
        { id: '2', name: 'Problem Solving' }
      ]
  const references = !!data?.candidateReferences
    ? data.candidateReferences.map((item, index) => {
        return {
          id: index,
          time: item.phoneNumber,
          titleName: `${item.fullName}-${item.company}`,
          subName: `Email address: ${item.email}`,
          description: `Current position: ${item.position}`
        }
      })
    : [
        {
          id: '1',
          time: 'JAN 2017',
          titleName: 'Peter Adonis',
          subName: 'Master',
          description: 'Master at Harvard'
        },
        {
          id: '2',
          time: 'JAN 2017',
          titleName: 'Kim Adonis',
          subName: 'Master',
          description: 'Master at KMC'
        }
      ]
  const candidateAbout = `Hello my name is James Rogers and Painter from Miami. In pharetra orci dignissim, blandit mi semper,
  ultricies diam. Suspendisse malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor
  non consequat enim. Sed vitae aliquam velit. Aliquam ante erat, blandit at pretium et, accumsan ac est.
  Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus.
  Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar. Aliquam
  ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum
  sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris
  nec erat ut libero vulputate pulvinar.'`
  const dataInfo = {
    jobPosition: data.jobPositionTitle,
    name: data.candidateName,
    email: data.account?.email,
    website: 'dsc@gmail.com',
    location: 'vietnam',
    startYear: '2020',
    profileImageUrl: data?.imageUrl,
    jobTitle: data.candidateJobTitle
  }
  return (
    <>
      <Card title="Resume Detail">
        <ResumeHeader data={dataInfo} />
        <ResumeContent
          adwards={adwards}
          candidateAbout={candidateAbout}
          educations={educations}
          workExperiences={workExperiences}
          userOverview={candidateOverView}
          skills={skills}
          references={references}
        />
      </Card>
      {data.status === 'PENDING' ? (
        <div style={{ paddingBottom: '5rem' }}>
          <Card
            title="Evaluate this registration"
            style={{ width: 500, margin: '2rem auto' }}
            headStyle={{ fontWeight: 700, fontSize: 24 }}
          >
            <div style={{ marginLeft: '5rem' }}>
              <EvaluationFormComponent onFinish={onFinish} name="applicationId" id={data.id} />
            </div>
          </Card>
        </div>
      ) : null}
    </>
  )
}

export default ResumeDetailComponent
