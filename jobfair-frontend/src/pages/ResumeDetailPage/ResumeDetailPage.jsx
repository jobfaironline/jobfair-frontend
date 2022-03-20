import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {
  Anchor,
  Card,
  Col,
  Collapse,
  Descriptions,
  Form,
  Layout,
  notification,
  PageHeader,
  Row,
  Space,
  Tooltip,
  Typography
} from "antd";
import {getAttendantDetailAPI} from "../../services/attendant-controller/AttendantControllerService";
import {useSelector} from "react-redux";
import {
  CalendarOutlined,
  GlobalOutlined,
  HomeOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  TeamOutlined,
  WomanOutlined
} from "@ant-design/icons";
import {convertEnumToString, convertToDateString, convertToDateValue, handleProgress} from "../../utils/common";
import EvaluationFormComponent from "../../components/EvaluationForm/EvaluationForm.component";
import {CountryConst} from "../../components/attendant-profile-form/AttendantConstants";
import './ResumeDetailPage.styles.scss'
import {Content} from "antd/es/layout/layout";

const defaultResumeId = 'a5c3e29d-0a5c-4950-bf4a-8f31b3401b72'

const ResumeDetailPage = () => {
  return (
    <div className="page">
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Resume Detail Page"
      />
      <ResumeDetailContainer/>
    </div>
  );
};

const ResumeDetailContainer = () => {
  const resumeId = useParams()
  const [form] = Form.useForm()
  const attendantId = useSelector(state => state.authentication.user.userId)
  const [data, setData] = useState({})

  const onFinish = (values) => {
    console.log(values)
  }

  const fetchData = async () => {
    getAttendantDetailAPI(attendantId)
      .then(res => {
        setData(res.data)
      })
      .catch(() => {
        notification['error']({
          message: `Fetch attendant profile failed`,
          description: `Failed for attendant with ${attendantId}`
        })
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleOnChangeDob = dateString => {
    return convertToDateValue(dateString)
  }


  return (
    <>
      <ResumeDetailComponent
        form={form}
        onFinish={onFinish}
        data={data}
        handleOnChangeDob={handleOnChangeDob}
      />
    </>
  )
}


const ResumeDetailComponent = (props) => {
  const {onFinish, form, handleOnChangeDob, data} = props
  const {Text} = Typography
  const {Panel} = Collapse;
  const {Link} = Anchor;

  console.log(data)
  return (
    <>
      <Anchor affix={true} offsetTop={100} getCurrentAnchor='#skill-resume'>
        <Link href="#candidate-overview" title="Overview"/>
        <Link href="#skill-resume" title="Skill"/>
        <Link href="#work-history-resume" title="Work history"/>
        <Link href="#education-resume" title="Education"/>
        <Link href="#certification-resume" title="Certification"/>
        <Link href="#reference-resume" title="Reference"/>
        <Link href="#activity-resume" title="Activity"/>
      </Anchor>
      <Layout>
        <Content>
          <Card
            title="Resume Detail"
            style={{width: 1500, marginLeft: '2rem'}}
            headStyle={{fontWeight: 700, fontSize: 24}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div style={{
                display: 'flex',
                placeContent: 'space-around',
                marginTop: '1rem',
                marginLeft: '3rem',
              }}>
                <img
                  alt="example"
                  style={{
                    maxHeight: '25rem',
                    width: '10rem',
                    height: '10rem',
                    borderRadius: '6em',
                  }}
                  src={data.account?.profileImageUrl}
                />
              </div>
              <div style={{flex: 'display', flexDirection: 'column', marginLeft: '5rem'}}>
                <Card title="Skills" style={{width: 500}} headStyle={{fontWeight: 700, fontSize: 24}} id='skill-resume'>
                  {data.skills?.map((item, index) => (
                    <Collapse>
                      <Panel header={item.name} key={index}>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="skill_name">
                            <Space>
                              <Text strong>Name: </Text>
                              <Text>{item.name}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="skill_proficiency">
                            <Space>
                              <Text strong>Proficiency: </Text>
                              <Text>
                                {handleProgress(item.proficiency)}
                              </Text>
                            </Space>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  ))}
                </Card>
                <Card title="Work history" style={{width: 500, marginTop: '2rem'}}
                      headStyle={{fontWeight: 700, fontSize: 24}} id='work-history-resume'>
                  {data.workHistories?.map((item, index) => (
                    <Collapse>
                      <Panel header={`Worked at: ${item.company}`} key={index}>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="company_name">
                            <Space>
                              <Text strong>Company: </Text>
                              <Text>{item.company}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="position">
                            <Space>
                              <Text strong>Position: </Text>
                              <Text>{item.position}</Text>
                            </Space>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="fromDate">
                            <Space>
                              <Text strong>From: </Text>
                              <Text>{convertToDateString(item.fromDate)}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="position">
                            <Space>
                              <Text strong>To: </Text>
                              <Text>{convertToDateString(item.toDate)}</Text>
                            </Space>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="description">
                            <Space>
                              <Text strong>Description: </Text>
                              <Text>{item.description}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="position">
                            <Space>
                              <Text strong>Current job: </Text>
                              <Text>{item.isCurrentJob ? 'Yes' : 'No'}</Text>
                            </Space>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  ))}
                </Card>
                <Card title="Education" style={{width: 500, marginTop: '2rem'}}
                      headStyle={{fontWeight: 700, fontSize: 24}}
                      id="education-resume">
                  {data.educations?.map((item, index) => (
                    <Collapse>
                      <Panel header={`Studied at: ${item.school}`} key={index}>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="achievement">
                            <Space>
                              <Text strong>Achievement: </Text>
                              <Text>{item.achievement}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="subject">
                            <Space>
                              <Text strong>Subject: </Text>
                              <Text>{item.subject}</Text>
                            </Space>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="fromDate">
                            <Space>
                              <Text strong>From: </Text>
                              <Text>{convertToDateString(item.fromDate)}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="position">
                            <Space>
                              <Text strong>To: </Text>
                              <Text>{convertToDateString(item.toDate)}</Text>
                            </Space>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="qualification">
                            <Space>
                              <Text strong>Qualification: </Text>
                              <Text>{convertEnumToString(item.qualification)}</Text>
                            </Space>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  ))}
                </Card>
                <Card title="Certification" style={{width: 500, marginTop: '2rem'}}
                      headStyle={{fontWeight: 700, fontSize: 24}} id='certification-resume'>
                  {data.certifications?.map((item, index) => (
                    <Collapse>
                      <Panel header={`Institution: ${item.institution}`} key={index}>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="institution">
                            <Space>
                              <Text strong>Institution: </Text>
                              <Text>{item.institution}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="subject_name">
                            <Space>
                              <Text strong>Subject name: </Text>
                              <Text>{item.name}</Text>
                            </Space>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="cert_link">
                            <Space>
                              <Text strong>Certification link: </Text>
                              <Text>{item.certificationLink}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="year">
                            <Space>
                              <Text strong>Semester: </Text>
                              <Text>{item.year}</Text>
                            </Space>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  ))}
                </Card>
                <Card title="References" style={{width: 500, marginTop: '2rem'}}
                      headStyle={{fontWeight: 700, fontSize: 24}} id='reference-resume'>
                  {data.references?.map((item, index) => (
                    <Collapse>
                      <Panel header={`Professor: ${item.fullname}`} key={index}>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="title">
                            <Space>
                              <Text strong>Work at: </Text>
                              <Text>{item.company}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="company_ref">
                            <Space>
                              <Text strong>Position: </Text>
                              <Text>{item.position}</Text>
                            </Space>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="email_ref">
                            <Space>
                              <Text strong>Email address: </Text>
                              <Text>{item.email}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="phone_ref">
                            <Space>
                              <Text strong>Phone: </Text>
                              <Text>{item.phone}</Text>
                            </Space>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  ))}
                </Card>
                <Card title="Activities" style={{width: 500, marginTop: '2rem'}}
                      headStyle={{fontWeight: 700, fontSize: 24}} id='activity-resume'>
                  {data.activities?.map((item, index) => (
                    <Collapse>
                      <Panel header={`Name: ${item.name}`} key={index}>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="description">
                            <Space>
                              <Text strong>Description: </Text>
                              <Text>{item.description}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="functionTitle">
                            <Space>
                              <Text strong>Function title: </Text>
                              <Text>{item.functionTitle}</Text>
                            </Space>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="fromDate">
                            <Space>
                              <Text strong>From: </Text>
                              <Text>{convertToDateString(item.fromDate)}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="toDate">
                            <Space>
                              <Text strong>To: </Text>
                              <Text>{convertToDateString(item.toDate)}</Text>
                            </Space>
                          </Col>
                        </Row>
                        <Row gutter={[16, 16]}>
                          <Col span={12} key="organization">
                            <Space>
                              <Text strong>Organization: </Text>
                              <Text>{item.organization}</Text>
                            </Space>
                          </Col>
                          <Col span={12} key="isCurrent">
                            <Space>
                              <Text strong>Current activity: </Text>
                              <Text>{item.isCurrentActivity ? 'Yes' : 'No'}</Text>
                            </Space>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  ))}
                </Card>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', marginLeft: '5rem'}}>
                <Card title="Candidate overview" style={{width: 550}} headStyle={{fontWeight: 700, fontSize: 24}}
                      id='candidate-overview'>
                  <Descriptions
                    title={`${data.account?.firstname} ${data.account?.middlename} ${data.account?.lastname}`}
                    layout="vertical">
                    <Descriptions.Item label={<Tooltip title="Email address"><MailOutlined/> Email</Tooltip>}
                                       contentStyle={{marginRight: '0.5rem'}}>
                      <Text strong>
                        {data.account?.email}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<Tooltip title="Telephone"><PhoneOutlined/> Telephone</Tooltip>}>
                      <Text strong>
                        {data.account?.phone}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<Tooltip title="Country"><GlobalOutlined/> Country</Tooltip>}>
                      <Text strong>
                        {CountryConst.find(item => item.id === data?.countryId)?.name}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<Tooltip title="Country"><HomeOutlined/> Address</Tooltip>} span={2}>
                      <Text strong>
                        {data?.address}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Tooltip title="Date of birth"><CalendarOutlined/> Date of birth</Tooltip>}>
                      <Text strong>
                        {convertToDateString(data.dob)}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<Tooltip title="Gender"><TeamOutlined/> Gender</Tooltip>}>
                      <Text strong>
                        {data.account?.gender === 'MALE' ? (<><ManOutlined/> Male</>) : (<><WomanOutlined/> Female</>)}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<Tooltip title="Job title"><TeamOutlined/> Job title</Tooltip>}>
                      <Text strong>
                        {data?.jobTitle}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item label={<Tooltip title="Job level"><TeamOutlined/> Job level</Tooltip>}>
                      <Text strong>
                        {convertEnumToString(data?.jobLevel)}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Tooltip title="Year of experience"><TeamOutlined/> Year of experience</Tooltip>}>
                      <Text strong>
                        {data?.yearOfExp} year(s)
                      </Text>
                    </Descriptions.Item>
                  </Descriptions>,
                </Card>
                <Card title="Evaluate this registration" style={{width: 500, marginTop: '2rem'}}
                      headStyle={{fontWeight: 700, fontSize: 24}}>
                  <div style={{marginLeft: '5rem'}}>
                    <EvaluationFormComponent onFinish={onFinish} name='resumeRegistration' id={defaultResumeId}/>
                  </div>
                </Card>
              </div>
            </div>
          </Card>
        </Content>
      </Layout>
    </>
  )
}

export default ResumeDetailPage;