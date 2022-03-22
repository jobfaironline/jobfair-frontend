import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
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
} from 'antd'
import { getAttendantDetailAPI } from '../../services/attendant-controller/AttendantControllerService'
import { useSelector } from 'react-redux'
import {
  CalendarOutlined,
  GlobalOutlined,
  HomeOutlined,
  MailOutlined,
  ManOutlined,
  PhoneOutlined,
  TeamOutlined,
  WomanOutlined
} from '@ant-design/icons'
import { convertEnumToString, convertToDateString, convertToDateValue, handleProgress } from '../../utils/common'
import EvaluationFormComponent from '../../components/EvaluationForm/EvaluationForm.component'
import { CountryConst } from '../../components/attendant-profile-form/AttendantConstants'
import './ResumeDetailPage.styles.scss'
import { Content } from 'antd/es/layout/layout'
import ResumeHeader from '../../components/Resume/Header/ResumeHeader.component'
import ResumeContent from '../../components/Resume/Content/ResumeContent.component'
import { evaluateApplication, getApplication } from '../../services/application-controller/ApplicationControllerService'
const defaultResumeId = 'a5c3e29d-0a5c-4950-bf4a-8f31b3401b72'

const ResumeDetailPage = () => {
  const history = useHistory()
  const location = useLocation()
  const { resumeId } = location.state

  return (
    <div className="page">
      <PageHeader className="site-page-header" onBack={() => history.goBack()} title="Resume Detail Page" />
      <ResumeDetailContainer resumeId={resumeId} />
    </div>
  )
}

const ResumeDetailContainer = ({ resumeId }) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const attendantId = useSelector(state => state.authentication.user.userId)
  const [data, setData] = useState({})

  const onFinish = values => {
    //mapping
    const body = {
      applicationId: values['applicationId'],
      evaluateMessage: values['message'],
      status: values['status']
    }

    evaluateApplication(body)
      .then(res => {
        notification['success']({
          message: `Submit evaluation successfully`,
          description: `Your evaluation has been submitted`,
          duration: 2
        })
        history.goBack()
      })
      .catch(e => {
        notification['error']({
          message: `Submit evaluation failed`,
          description: `There is problem while submitting, try again later`,
          duration: 2
        })
      })
  }

  const fetchData = async () => {
    getApplication(resumeId)
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
      <ResumeDetailComponent form={form} onFinish={onFinish} data={data} handleOnChangeDob={handleOnChangeDob} />
    </>
  )
}

const ResumeDetailComponent = props => {
  const { onFinish, form, handleOnChangeDob, data } = props
  const { Text } = Typography
  const { Panel } = Collapse
  const { Link } = Anchor

  const educations = [
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
  const workExperiences = [
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
  const adwards = [
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
    experience: '5-10 Years',
    age: '28-33 Years',
    currentSalary: '41K - 50K',
    expectedSalary: 'Above 50K',
    gender: 'Male',
    language: 'English, French',
    educationLevel: 'Certificate'
  }
  const skills = [
    { id: '1', name: 'Creativity' },
    { id: '2', name: 'Problem Solving' }
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
    jobPosition: 'Designer',
    name: data.candidateName,
    email: data.account?.email,
    website: 'dsc@gmail.com',
    location: 'vietnam',
    startYear: '2020',
    profileImageUrl: data.account?.profileImageUrl
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
        />
      </Card>
      {data.status == 'PENDING' ? (
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

export default ResumeDetailPage
