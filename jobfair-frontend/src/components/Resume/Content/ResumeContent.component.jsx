import React from 'react'
import { Anchor, Col, Row, Space, Typography } from 'antd'
import styles from './ResumeContent.module.scss'
import EducationList from './EducationList/ResumeEducationList.component'
import NodeListComponent from './NodeList/ResumeNodeList.component'
import SkillListComponent from './SkillsList/ResumeSkillList.component'
import OverviewComponent from './Overview/ResumeOverview.component'

const { Link } = Anchor
const { Text, Title } = Typography
const ResumeContent = props => {
  const { candidateAbout, educations, workExperiences, adwards, skills, userOverview, references } = props
  return (
    <div className="header">
      <Col span={16} offset={4}>
        <div className={styles.anchorBar}>
          <Space align="center" direction="vertical">
            <Anchor
              targetOffset="70"
              onClick={e => {
                e.preventDefault()
              }}
            >
              <Link href="#candidatesAbout" title="Candidates About" />
              <Link href="#education" title="Education" />
              <Link href="#workExperience" title="Work & Experience" />
              <Link href="#professionalSkills" title="Professional Skills" />
              <Link href="#references" title="Reference" />
              <Link href="#certifications" title="Certification" />
            </Anchor>
          </Space>
        </div>
        <Row justify="space-between">
          <Col span={18}>
            <Title id="candidatesAbout" level={2}>
              Candidates About
            </Title>
            <Text type="secondary">{candidateAbout}</Text>
            <Title id="education" level={2}>
              Education
            </Title>
            {educations.map(data => (
              <div className={styles.educationList}>
                <EducationList id={data} data={data} />
              </div>
            ))}
            <Title id="workExperience" level={2}>
              Work & Experience
            </Title>
            <NodeListComponent listData={workExperiences} titleSize={4} subTitleSize={21} />
            <Title id="professionalSkills" level={2}>
              Professional Skills
            </Title>
            <SkillListComponent listData={skills} />
            <Title id="certifications" level={2}>
              Certifications
            </Title>
            <NodeListComponent listData={adwards} titleSize={8} subTitleSize={21} />
            <Title id="references" level={3}>
              References
            </Title>
            <NodeListComponent listData={references} titleSize={8} subTitleSize={21} />
          </Col>
          <Col span={6}>
            <Text type="secondary" style={{ fontSize: '1.2rem' }}>
              Candidate Overview
            </Text>
            <OverviewComponent data={userOverview} />
          </Col>
        </Row>
      </Col>
    </div>
  )
}
export default ResumeContent
