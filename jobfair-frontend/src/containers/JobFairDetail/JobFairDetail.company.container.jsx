import React, { useEffect, useState } from 'react'
import JobFairDetailComponent from '../../components/JobFairDetail/JobFairDetail.company.component'
import { getJobFairPlanById } from '../../services/job-fair-controller/JobFairConTrollerService'
import { notification } from 'antd'

const JobFairDetailCompanyContainer = props => {
  const { id, role } = props
  const [jobFairDetailData, setJobFairDetailData] = useState()
  const getJobFairDetail = async () => {
    getJobFairPlanById(id)
      .then(res => {
        setJobFairDetailData(res.data)
      })
      .catch(err => {
        if (err.response.status === 404) {
          notification['info']({
            message: `No booth has been assigned for this job fair yet.`
          })
        } else {
          notification['error']({
            message: `Error at get total booth: ${err}`
          })
        }
      })
  }
  useEffect(() => {
    getJobFairDetail()
  }, [])
  return (
    <>
      <JobFairDetailComponent data={jobFairDetailData} role={role} />
    </>
  )
}
export default JobFairDetailCompanyContainer
