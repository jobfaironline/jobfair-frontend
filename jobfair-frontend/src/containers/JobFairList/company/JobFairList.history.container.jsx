/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { getHistoricalJobFairForCompany } from '../../../services/job-fair-controller/JobFairConTrollerService'
import { getCompanyBoothByJobFairId } from '../../../services/company-booth-controller/CompanyBoothControllerService'
import { PATH, PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path'
import JobFairListManagementComponent from '../../../components/JobFairList/JobFairList.management.component'
import { convertToDateString } from '../../../utils/common'

const JobFairListHistoryContainer = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  //paging state
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(100)

  const [searchResult, setSearchResult] = useState([])
  const [count, setCount] = useState(0)

  const history = useHistory()

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    getHistoricalJobFairForCompany(currentPage, pageSize)
      .then(res => {
        setCount(count + 1)
        const result = res.data.content.map(item => {
          return {
            id: item.jobFair.id,
            status: item.status,
            companyId: item.companyId,
            startTime: convertToDateString(item.jobFair.startTime),
            endTime: convertToDateString(item.jobFair.endTime),
            companyRegisterStartTime: convertToDateString(
              item.jobFair.companyRegisterStartTime
            ),
            description: item.jobFair.description,
            layoutId: item.jobFair.layoutId,
            thumbnail: item.jobFair.thumbnail,
            name: item.jobFair.name,
            estimateParticipant: item.jobFair.estimateParticipant,
            targetCompany: item.jobFair.targetCompany,
            targetAttendant: item.jobFair.targetAttendant
          }
        })
        setData([...data, ...result])
        setSearchResult([...data, ...result])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const getCompanyBoothId = jobFairId => {
    getCompanyBoothByJobFairId(jobFairId)
      .then(res => {
        const result = res.data[0]?.id
        const url = generatePath(PATH.DECORATE_BOOTH_PAGE, {
          jobFairId: jobFairId,
          companyBoothId: result
        })
        handleRedirect(url)
      })
      .catch(() => {})
  }

  const handleFilterByStatus = statusArr => {
    //status is an array: ["APPROVE", "REGISTRABLE"]
    const result = data.filter(item => statusArr.some(st => st === item.status))
    setSearchResult([...result])
  }

  const handleRedirect = link => {
    history.push(link)
  }

  const handleClearFilter = () => {
    setSearchResult([...data])
  }

  const handleViewDetail = id => {
    history.push(PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE, {
      jobFairId: id
    })
  }

  const handleRequestChange = id => {
    const url = generatePath(PATH.REGISTER_JOB_FAIR_PAGE, { jobFairId: id })
    history.push(url)
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  return (
    <>
      <JobFairListManagementComponent
        data={data}
        handleRedirect={handleRedirect}
        loadMoreData={loadMoreData}
        handleFilterByStatus={handleFilterByStatus}
        searchResult={searchResult}
        getCompanyBoothId={getCompanyBoothId}
        handleClearFilter={handleClearFilter}
        handleViewDetail={handleViewDetail}
        handleRequestChange={handleRequestChange}
      />
    </>
  )
}

export default JobFairListHistoryContainer
