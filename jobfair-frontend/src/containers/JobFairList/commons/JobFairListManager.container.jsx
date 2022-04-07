import React, { useEffect, useState } from 'react'
import { generatePath, useHistory } from 'react-router-dom'
import { getJobFairForCompany } from '../../../services/job-fair-controller/JobFairConTrollerService'
import { getCompanyBoothByJobFairId } from '../../../services/company-booth-controller/CompanyBoothControllerService'
import { PATH, PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path'
import { notification } from 'antd'
import JobFairListManagementComponent from '../../../components/JobFairList/JobFairList.management.component'
import CompanyJobFairActionButton from '../../../components/JobFairList/CompanyJobFairActionButton.component'
import { mapperJobFairDetail } from '../../../utils/mapperJobFairList'

const JobFairListManagerContainer = props => {
  const { tabStatus } = props
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  //paging state
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0)
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(100)

  const [searchResult, setSearchResult] = useState([])

  const history = useHistory()

  const setResponseResult = res => {
    const result = res.data.content.map(item => mapperJobFairDetail(item))
    setData([...data, ...result])
    setSearchResult([...data, ...result])
    setLoading(false)
  }

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    getJobFairForCompany(currentPage, pageSize, tabStatus)
      .then(res => setResponseResult(res))
      .catch(() => {
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
    history.push(PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE, {
      jobFairId: id
    })
  }

  const handleViewMap = id => {
    const url = generatePath(PATH.PUBLICIZED_BOOTH_PAGE, { jobFairId: id })
    history.push(url)
  }

  const jobFairListProps = {
    handleFilterByStatus: handleFilterByStatus,
    handleViewDetail: handleViewDetail,
    handleClearFilter: handleClearFilter,
    data: data,
    loadMoreData: loadMoreData,
    searchResult: searchResult,
    getCompanyBoothId: getCompanyBoothId,
    extraHeaderComponent: item => {
      return [
        <CompanyJobFairActionButton
          getCompanyBoothId={getCompanyBoothId}
          item={item}
          handleRedirect={handleRedirect}
          handleViewMap={handleViewMap}
        />
      ]
    }
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  return (
    <>
      <JobFairListManagementComponent {...jobFairListProps} />
    </>
  )
}

export default JobFairListManagerContainer
