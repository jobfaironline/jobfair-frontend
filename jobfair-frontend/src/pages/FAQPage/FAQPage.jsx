import React from 'react'
import ResumeContent from '../../components/Resume/Content/ResumeContent.component'
import ResumeHeader from '../../components/Resume/Header/ResumeHeader.component'
const data = {
  jobPosition: 'Designer',
  name: 'BanhsBao',
  email: 'huynhbaofaker@gmail.com',
  website: 'dsc@gmail.com',
  location: 'vietnam',
  time: '10year'
}
const FAQPage = () => {
  return (
    <div className="page">
      <ResumeHeader data={data} />
      <ResumeContent />
    </div>
  )
}

export default FAQPage
