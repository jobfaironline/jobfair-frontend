import React, {useEffect, useState} from 'react'
import {generatePath, useHistory} from 'react-router-dom'
import JobFairListManagementComponent from '../../../components/JobFairList/JobFairList.management.component'
import {getAvailableJobFairForCompany} from '../../../services/job-fair-controller/JobFairConTrollerService'
import {getCompanyBoothByJobFairId} from '../../../services/company-booth-controller/CompanyBoothControllerService'
import {PATH, PATH_COMPANY_MANAGER} from '../../../constants/Paths/Path'
import {convertToDateString} from "../../../utils/common";
import {notification} from "antd";

const approvedJobFairId = 'a50a9875-93aa-4605-8afd-29923d3310fe'

const JobFairListAvailableContainer = props => {
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
    getAvailableJobFairForCompany(currentPage, pageSize)
      .then(res => {
        setCount(count + 1)
        const result = res.data.content.map(item => {
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
        })
        setData([...data, ...result])
        setSearchResult([...data, ...result])
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }


  const getCompanyBoothId = jobFairId => {
    getCompanyBoothByJobFairId(jobFairId)
      .then(res => {
        const result = res.data[0]?.id
        const url = generatePath(PATH.DECORATE_BOOTH_PAGE, {jobFairId: jobFairId, companyBoothId: result})
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

  const handleViewDetail = (id) => {
    history.push(PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE, {
      jobFairId: id
    })
  }

  const handleViewMap = (id) => {
    const url = generatePath(PATH.PUBLICIZED_BOOTH_PAGE, {jobFairId: id})
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

export default JobFairListAvailableContainer
