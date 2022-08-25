import './ResumeDetail.styles.scss';
import { APPLICATION_STATUS } from '../../../constants/ApplicationConst';
import { Card, Col, Descriptions, Row, Tag, Typography } from 'antd';
import { INTERVIEW_SCHEDULE_STATUS } from '../../../constants/InterviewScheduleConst';
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

export const InterviewOverview = (props) => {
  const { data } = props;
  if (data.status !== APPLICATION_STATUS.APPROVE) return null;

  const tagColor = {
    NOT_YET: 'lime',
    INTERVIEWING: 'blue',
    DONE: 'green',
    REQUEST_CHANGE: 'red'
  };

  return (
    <Card style={{ borderRadius: '8px' }}>
      <Title level={4}>Interview overview</Title>
      <div style={{ marginBottom: '10px' }}>
        <Text strong={true}>Status:</Text> <Tag color={tagColor[data.interviewStatus]}>{data.interviewStatus}</Tag>
      </div>
      {data.interviewStatus === INTERVIEW_SCHEDULE_STATUS.DONE ? (
        <Descriptions layout={'vertical'} size={'small'}>
          <Descriptions.Item span={3} label={`Interviewer's note`} labelStyle={{ fontWeight: 600 }}>
            {data.interviewNote}{' '}
          </Descriptions.Item>
          <Descriptions.Item span={3} label={`Candidate's advantage`} labelStyle={{ fontWeight: 600 }}>
            {data.attendantAdvantage}
          </Descriptions.Item>
          <Descriptions.Item span={3} label={`Candidate's disadvantage`} labelStyle={{ fontWeight: 600 }}>
            {data.attendantDisadvantage}
          </Descriptions.Item>
        </Descriptions>
      ) : null}
    </Card>
  );
};

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
          <div style={{ marginBottom: '1rem' }}>{matchingStatement()}</div>
          <InterviewOverview data={data} />
        </Col>
        <Col span={17}>
          <Card style={{ borderRadius: '8px' }} className={'list'}>
            <Title id='candidatesAbout' level={4}>
              About me
            </Title>
            <Text type='secondary' style={{ whiteSpace: 'pre-line' }}>
              {data.about}
            </Text>
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
