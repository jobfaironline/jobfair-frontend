import React, { useEffect, useState } from 'react'
import { Form, notification } from 'antd'
import { useSelector } from 'react-redux'
import {
  getAttendantDetailAPI,
  updateAttendantProfileAPI
} from '../../services/attendant-controller/AttendantControllerService'
import AttendantProfileFormComponent from '../../components/AttendantProfileForm/AttendantProfileForm.component'
import { convertToDateValue, handleConvertRangePicker } from '../../utils/common'

const AttendantProfileFormContainer = () => {
  const [form] = Form.useForm()
  const attendantId = useSelector(state => state.authentication.user.userId)
  const [data, setData] = useState({})

  const onFinish = values => {
    const body = {
      account: values.account,
      accountId: attendantId,
      activities: handleConvertRangePicker(values.activities),
      address: values.address,
      certifications: values.certifications,
      countryId: values.countryId,
      dob: convertToDateValue(values.dob.format()),
      educations: handleConvertRangePicker(values.educations),
      jobLevel: values.jobLevel,
      jobTitle: values.jobTitle,
      maritalStatus: values.maritalStatus,
      references: values.references,
      residenceId: values.residenceId,
      skills: values.skills,
      title: values.title,
      workHistories: handleConvertRangePicker(values.workHistories),
      yearOfExp: values.yearOfExp
    }
    updateAttendantProfileAPI(body)
      .then(() => {
        notification['success']({
          message: `Update attendant profile successfully`,
          description: `Update attendant: ${attendantId} successfully`
        })
        fetchData()
      })
      .catch(() => {
        notification['error']({
          message: `Update attendant profile failed`,
          description: `There is problem while updating, try again later`
        })
      })
  }
  const fetchData = async () => {
    getAttendantDetailAPI(attendantId)
      .then(res => {
        notification['success']({
          message: `Fetch attendant profile successfully`,
          description: `For attendant with ${attendantId}`
        })
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

  return (
    <>
      <AttendantProfileFormComponent form={form} onFinish={onFinish} data={data} />
    </>
  )
}

export default AttendantProfileFormContainer
