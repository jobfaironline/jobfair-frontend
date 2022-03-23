import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Form, notification, Spin} from "antd";
import {useSelector} from "react-redux";
import {evaluateApplication, getApplication} from "../../services/application-controller/ApplicationControllerService";
import {convertToDateValue} from "../../utils/common";
import ResumeDetailComponent from "../../components/Resume/ResumeDetail.component";
import {getAttendantDetailAPI} from "../../services/attendant-controller/AttendantControllerService";
import {getAttendantCvById} from "../../services/cv-controller/CvControllerService";

const ResumeDetailContainer = ({resumeId}) => {
  const history = useHistory()
  const [form] = Form.useForm()
  const [data, setData] = useState(undefined)


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

  if (data === undefined) {
    return <Spin/>
  }

  return (
    <>
      <ResumeDetailComponent form={form} onFinish={onFinish} data={data} handleOnChangeDob={handleOnChangeDob}/>
    </>
  )
}

export default ResumeDetailContainer;