/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import {
  getJobFairForAttendant,
  getJobFairForCompany
} from '../../../services/job-fair-controller/JobFairConTrollerService'
import { getCompanyBoothByJobFairId } from '../../../services/company-booth-controller/CompanyBoothControllerService'
import { PATH, PATH_ATTENDANT, PATH_COMPANY_EMPLOYEE, PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path'
import { notification } from 'antd'
import JobFairListManagementComponent from '../../../components/JobFairList/JobFairList.management.component'
import { convertToDateString } from '../../../utils/common'

const JobFairListContainer = props => {
  const { tabStatus, role } = props
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  //paging state
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(100)

  const [searchResult, setSearchResult] = useState([])
  const [count, setCount] = useState(0)

  const history = useHistory()

  const setResponseResult = res => {
    setCount(count + 1)
    const result = res.data.content.map(item => mapperJobFairDetail(item))
    setData([...data, ...result])
    setSearchResult([...data, ...result])
    setLoading(false)
  }

  const mapperJobFairDetail = item => {
    if (item !== undefined) {
      return {
        id: item.jobFair.id,
        status: item.status,
        companyId: item.companyId,
        startTime: convertToDateString(item.jobFair.startTime),
        endTime: convertToDateString(item.jobFair.endTime),
        companyRegisterStartTime: convertToDateString(item.jobFair.companyRegisterStartTime),
        description: item.jobFair.description,
        layoutId: item.jobFair.layoutId,
        thumbnail: item.jobFair.thumbnail,
        name: item.jobFair.name,
        estimateParticipant: item.jobFair.estimateParticipant,
        targetCompany: item.jobFair.targetCompany,
        targetAttendant: item.jobFair.targetAttendant
      }
    }
  }

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    switch (role) {
      case 'COMPANY_MANAGER':
      case 'COMPANY_EMPLOYEE':
        getJobFairForCompany(currentPage, pageSize, tabStatus)
          .then(res => setResponseResult(res))
          .catch(() => {
            setLoading(false)
          })
          .finally(() => {
            setLoading(false)
          })
        break
      case 'ATTENDANT':
        getJobFairForAttendant(currentPage, pageSize, tabStatus)
          .then(res => setResponseResult(res))
          .catch(() => {
            setLoading(false)
          })
          .finally(() => {
            setLoading(false)
          })
        break
      default:
        return null
    }
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
      .catch(err => {
        notification['error']({
          message: `Error: ${err.response.data}`
        })
      })
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
    switch (role) {
      case 'COMPANY_MANAGER':
        history.push(PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE, {
          jobFairId: id
        })
        break
      case 'COMPANY_EMPLOYEE':
        history.push(PATH_COMPANY_EMPLOYEE.JOB_FAIR_DETAIL_PAGE, {
          jobFairId: id
        })
        break
      case 'ATTENDANT':
        history.push(PATH_ATTENDANT.JOB_FAIR_DETAIL_PAGE, {
          jobFairId: id
        })
        break
      default:
        return null
    }
  }

  const handleViewMap = id => {
    const url = generatePath(PATH.PUBLICIZED_BOOTH_PAGE, { jobFairId: id })
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
        handleViewMap={handleViewMap}
      />
    </>
  )
}

export default JobFairListContainer
