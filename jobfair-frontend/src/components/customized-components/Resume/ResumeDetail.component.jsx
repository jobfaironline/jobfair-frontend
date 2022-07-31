import './ResumeDetail.styles.scss';
import { Card, Col, Row, Typography } from 'antd';
import { ResumeCertificationList } from './Content/ResumeCertificationList.component';
import { ResumeOverview } from './Content/ResumeOverview.component';
import { ResumeReferenceList } from './Content/ResumeReferenceList.component';
import { ResumeSkillList } from './Content/ResumeSkillList.component';
import { ResumeWorkHistoryList } from './Content/ResumeWorkHistoryList.component';
import { useSelector } from 'react-redux';
import React from 'react';
import ResumeEducationList from './Content/ResumeEducationList.component';
import RoleType from '../../../constants/RoleType';

const { Title, Text } = Typography;

export const ResumeDetailComponent = (props) => {
  const { data, isForCompany = false } = props;
  const isSuitable = data.matchingPoint * 100 > 50;
  const role = useSelector((state) => state.authentication.user.roles);

  const matchingStatement = () => {
    if (role !== RoleType.COMPANY_EMPLOYEE) return null;
    if (isSuitable) return <Text style={{ color: 'green' }}>This application is suitable for your job position</Text>;
    return <Text style={{ color: 'red' }}>This application is not suitable for your job position</Text>;
  };
  return (
    <div className='resume-detail'>
      <Row gutter={15}>
        <Col span={7}>
          <ResumeOverview userOverview={data.overviewData} isForCompany={isForCompany} />
          <div>{matchingStatement()}</div>
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
