import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import JobFairListManagementComponent from '../../components/JobFairList/JobFairList.management.component'
import PaginationComponent from '../../components/PaginationComponent/Pagination.component'
import { getJobFairForAttendant } from '../../services/job-fair-controller/JobFairConTrollerService'
const JobFairAttendantListContainer = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pageSize, setPageSize] = useState(100)
  const [totalPage, setTotalPage] = useState(0)
  const [searchResult, setSearchResult] = useState([])
  const [count, setCount] = useState(0)

  const history = useHistory()

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    getJobFairForAttendant(searchResult, count, pageSize)
      .then(res => {
        setCount(count + 1)
        setTotalPage(res.totalPage)
        const result = res.data.content.map(item => {
          return {
            description: item?.jobFair.description,
            id: item.id,
            status: item.status
          }
        })
        setData([...data, ...result])
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
  return (
    <div>
      <JobFairListManagementComponent
        data={data}
        handleRedirect={handleRedirect}
        loadMoreData={loadMoreData}
        handleFilterByStatus={handleFilterByStatus}
        searchResult={searchResult}
        // getCompanyBoothId={getCompanyBoothId}
      />
      <PaginationComponent handlePageChange={handlePageChange} totalRecord={totalPage} />
    </div>
  )
}
export default JobFairAttendantListContainer
