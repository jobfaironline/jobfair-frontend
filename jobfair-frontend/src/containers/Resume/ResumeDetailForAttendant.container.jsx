import React, { useEffect, useState } from 'react'
import ResumeDetailComponent from '../../components/Resume/ResumeDetail.component'
import { convertToDateValue } from '../../utils/common'
import { getAttendantDetailAPI } from '../../services/attendant-controller/AttendantControllerService'
import { mapperResumeDetail } from '../../utils/mapperResumeDetailForAttendant'

const ResumeDetailForAttendantContainer = props => {
  const { resume, attendantId } = props
  const [data, setData] = useState(undefined)

  useEffect(() => {
    getAttendantDetailAPI(attendantId).then(res => {
      const result = mapperResumeDetail(res, resume)
      setData(result)
    })
  }, [])

  const handleOnChangeDob = dateString => {
    return convertToDateValue(dateString)
  }

  return (
    <>
      <ResumeDetailComponent data={data} handleOnChangeDob={handleOnChangeDob} />
    </>
  )
}

export default ResumeDetailForAttendantContainer
