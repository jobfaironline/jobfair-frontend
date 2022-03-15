import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {
  getHistoricalJobFairForCompany,
  getJobFairPlanForCompany
} from "../../../services/job-fair-controller/JobFairConTrollerService";
import {getCompanyBoothByJobFairId} from "../../../services/company-booth-controller/CompanyBoothControllerService";
import {PATH, PATH_ADMIN, PATH_COMPANY_MANAGER} from "../../../constants/Paths/Path";
import JobFairListManagementComponent from "../../../components/JobFairList/JobFairList.management.component";

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
            description: item.description,
            id: item.id,
            status: item.status,
          }
        })
        setData([...data, ...result])
        setSearchResult([...data, ...result])
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
      })
  }

  const getCompanyBoothId = jobFairId => {
    getCompanyBoothByJobFairId(jobFairId)
      .then(res => {
        const result = res.data[0]?.id
        handleRedirect(`${PATH.DECORATE_BOOTH_PATH}${result}/${jobFairId}`)
      })
      .catch(err => {

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
    history.push(PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL, {
      jobFairId: id
    })
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
      />
    </>
  )
};

export default JobFairListHistoryContainer;