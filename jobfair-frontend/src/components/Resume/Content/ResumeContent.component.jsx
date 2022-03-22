import React from 'react'
import { Anchor, Drawer, Button, Row, Col, Typography, Avatar, Space } from 'antd'
const { Link } = Anchor
import styles from './ResumeContent.module.scss'
import EducationList from './EducationList/ResumeEducationList.component'
import NodeListComponent from './NodeList/ResumeNodeList.component'
import SkillListComponent from './SkillsList/ResumeSkillList.component'
import OverviewComponent from './Overview/ResumeOverview.component'
const { Text, Title } = Typography
const ResumeContent = props => {
  const { candidateAbout, educations, workExperiences, adwards, skills, userOverview } = props
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
              <Link href="#awards" title="Awards" />
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
            <NodeListComponent listData={workExperiences} titleSize={4} subTitleSize={4} />
            <Title id="professionalSkills" level={2}>
              Professional Skills
            </Title>
            <SkillListComponent listData={skills} />
            <Title id="awards" level={2}>
              Awards
            </Title>
            <NodeListComponent listData={adwards} titleSize={8} subTitleSize={4} />
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
