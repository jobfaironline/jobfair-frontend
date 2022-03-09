import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import JobFairListManagementComponent from '../../components/JobFairList/JobFairList.management.component'
import { getJobFairForAttendant } from '../../services/job-fair-controller/JobFairConTrollerService'
import { Pagination } from 'antd'
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
        console.log(res.data)
        setCount(count + 1)
        setTotalPage(res.totalPage)
        const result = res.data.content.map(item => {
          return {
            description: item.description,
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
    //status is an array: ["APPROVE", "REGISTRABLE"]
    const result = data.filter(item => statusArr.some(st => st === item.status))
    setSearchResult([...result])
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
      <Pagination defaultCurrent={1} total={totalPage} />
    </div>
  )
}
export default JobFairAttendantListContainer
