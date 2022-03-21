import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import {Form, notification} from "antd";
import {useSelector} from "react-redux";
import {getAttendantDetailAPI} from "../../services/attendant-controller/AttendantControllerService";
import {convertToDateValue} from "../../utils/common";
import ResumeDetailComponent from "../../components/ResumeDetail/ResumeDetail.component";

const ResumeDetailContainer = (props) => {
  // const resumeId = useParams()
  const [form] = Form.useForm()
  const attendantId = useSelector(state => state.authentication.user.userId)
  const role = useSelector(state => state.authentication?.user?.roles)

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
        role={role}
      />
    </>
  )
}

export default ResumeDetailContainer;