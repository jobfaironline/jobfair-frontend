import React from 'react'
import { Anchor, Drawer, Button, Row, Col, Typography, Avatar, Space } from 'antd'
const { Link } = Anchor
import styles from './ResumeContent.module.scss'
import EducationList from './EducationList/ResumeEducationList.component'
import NodeListComponent from './NodeList/ResumeNodeList.component'
import SkillListComponent from './SkillsList/ResumeSkillList.component'
const { Text, Title } = Typography
const listEducation = [
  {
    id: '1',
    edutTime: '2012-2014',
    titleName: 'Modern College',
    subName: 'Bachlors in Fine Arts',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
  },
  {
    id: '2',
    edutTime: '2008-2012',
    titleName: 'Haravard University',
    subName: 'Computer Science',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.'
  }
]
const listWorkAndWorkExperience = [
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
const listAdwards = [
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
const listSkill = [
  { id: '1', name: 'Creativity' },
  { id: '2', name: 'Problem Solving' }
]
const ResumeContent = () => {
  return (
    <div className="header">
      <Col span={16} offset={4}>
        <div className={styles.anchorBar}>
          <Space align="center" direction="vertical">
            <Anchor targetOffset="65">
              <Link href="#hero" title="Home" />
              <Link href="#about" title="About" />
              <Link href="#feature" title="Features" />
              <Link href="#works" title="How it works" />
              <Link href="#faq" title="FAQ" />
              <Link href="#pricing" title="Pricing" />
              <Link href="#contact" title="Contact" />
            </Anchor>
          </Space>
        </div>
        <Row>
          <Col>
            <Title level={2}>Candidates About</Title>
            <Text type="secondary">
              Hello my name is James Rogers and Painter from Miami. In pharetra orci dignissim, blandit mi semper,
              ultricies diam. Suspendisse malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor
              non consequat enim. Sed vitae aliquam velit. Aliquam ante erat, blandit at pretium et, accumsan ac est.
              Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus.
              Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar. Aliquam
              ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum
              sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris
              nec erat ut libero vulputate pulvinar.
            </Text>
            <Title level={2}>Education</Title>
            {listEducation.map(data => (
              <div className={styles.educationList}>
                <EducationList id={data} data={data} />
              </div>
            ))}
            <Title level={2}>Work & Experience</Title>
            <NodeListComponent listData={listWorkAndWorkExperience} />
            <Title level={2}>Professional Skills</Title>
            <SkillListComponent listData={listSkill} />
            <Title level={2}>Awards</Title>
            <NodeListComponent listData={listAdwards} />
          </Col>
          <Col></Col>
        </Row>
      </Col>
    </div>
  )
}
export default ResumeContent
