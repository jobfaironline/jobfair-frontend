import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import JobFairListManagementComponent from '../../components/JobFairList/JobFairList.management.component'
import PaginationComponent from '../../components/PaginationComponent/Pagination.component'
import { getJobFairAvailableForAttendant } from '../../services/job-fair-controller/JobFairConTrollerService'
import {PATH, PATH_ATTENDANT} from "../../constants/Paths/Path";
const JobFairAttendantListContainer = (props) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  //paging
  const [pageSize, setPageSize] = useState(100)
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResult, setSearchResult] = useState([])
  const [count, setCount] = useState(0)

  const history = useHistory()

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    getJobFairAvailableForAttendant(currentPage, pageSize)
      .then(res => {
        setCount(count + 1)
        const result = res.data.content.map(item => {
          return {
            description: item?.jobFair.description,
            id: item?.jobFair.id,
            status: item.status
          }
        })
        setData([...data, ...result])
        setSearchResult([...data, ...result])
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  // const getCompanyBoothId = jobFairId => {
  //   getCompanyBoothByJobFairId(jobFairId)
  //     .then(res => {
  //       const result = res.data[0]?.id
  //       handleRedirect(`${PATH.DECORATE_BOOTH_PATH}${result}/${jobFairId}`)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  const handleFilterByStatus = statusArr => {
    const result = data.filter(item => statusArr.some(st => st === item.status))
    setSearchResult([...result])
  }
  const handlePageChange = (page, pageSize) => {
    if (page > 0) {
      setCurrentPage(page - 1)
    } else {
      setCurrentPage(page)
    }
    setPageSize(pageSize)
  }
  const handleRedirect = link => {
    history.push(link)
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  const handleClearFilter = () => {
    setSearchResult([...data])
  }

  const handleViewDetail = (id) => {
    history.push(PATH_ATTENDANT.JOB_FAIR_DETAIL, {
      jobFairId: id
    })
  }

  const handleViewMap = (id) => {
    history.push(`${PATH.MAP}${id}`)
  }

  return (
    <div>
      <JobFairListManagementComponent
        data={data}
        handleRedirect={handleRedirect}
        loadMoreData={loadMoreData}
        handleFilterByStatus={handleFilterByStatus}
        searchResult={searchResult}
        handleClearFilter={handleClearFilter}
        handleViewDetail={handleViewDetail}
        handleViewMap={handleViewMap}
        // getCompanyBoothId={getCompanyBoothId}
      />
      <PaginationComponent handlePageChange={handlePageChange} totalRecord={data.length} />
    </div>
  )
}
export default JobFairAttendantListContainer
