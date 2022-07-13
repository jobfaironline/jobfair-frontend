import './ResumeDetail.styles.scss';
import { Card, Col, Row, Typography } from 'antd';
import { ResumeCertificationList } from './Content/ResumeCertificationList.component';
import { ResumeOverview } from './Content/ResumeOverview.component';
import { ResumeReferenceList } from './Content/ResumeReferenceList.component';
import { ResumeSkillList } from './Content/ResumeSkillList.component';
import { ResumeWorkHistoryList } from './Content/ResumeWorkHistoryList.component';
import React from 'react';
import ResumeEducationList from './Content/ResumeEducationList.component';

const { Title, Text } = Typography;

export const ResumeDetailComponent = (props) => {
  const { data } = props;
  return (
    <div className='resume-detail'>
      <Row gutter={15}>
        <Col span={7}>
          <ResumeOverview userOverview={data.overviewData} />
        </Col>
        <Col span={17}>
          <Card style={{ borderRadius: '8px' }} className={'list'}>
            <Title id='candidatesAbout' level={4}>
              Candidates About
            </Title>
            <Text type='secondary'>{data.about}</Text>
          </Card>
          <ResumeEducationList data={data.educations} />
          <ResumeWorkHistoryList data={data.workHistories} />
          <ResumeSkillList data={data.skills} />
          <ResumeCertificationList data={data.certifications} />
          <ResumeReferenceList data={data.references} />
        </Col>
      </Row>
    </div>
  );
};
