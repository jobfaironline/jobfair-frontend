import React, { useEffect, useState } from 'react'
import JobFairDetailCompanyComponent from '../../components/JobFairDetail/JobFairDetail.company.component'
import { getJobFairPlanById } from '../../services/job-fair-controller/JobFairConTrollerService'
const JobFairDetailCompanyContainer = props => {
  const { id } = props
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
      <JobFairDetailCompanyComponent data={jobFairDetailData} />
    </>
  )
}
export default JobFairDetailCompanyContainer
