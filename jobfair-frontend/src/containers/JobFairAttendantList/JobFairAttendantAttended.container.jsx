import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {
  getJobFairAttendedForAttendant,
  getJobFairAvailableForAttendant
} from "../../services/job-fair-controller/JobFairConTrollerService";
import JobFairListManagementComponent from "../../components/JobFairList/JobFairList.management.component";
import PaginationComponent from "../../components/PaginationComponent/Pagination.component";
import {PATH_ATTENDANT, PATH_COMPANY_MANAGER} from "../../constants/Paths/Path";
import {convertToDateString} from "../../utils/common";

const JobFairAttendantAttendedContainer = () => {
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
    getJobFairAttendedForAttendant(currentPage, pageSize)
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
            attendantRegisterStartTime: convertToDateString(item.jobFair.attendantRegisterStartTime),
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
        console.log(err)
        setLoading(false)
      })
  }


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
    history.push(PATH_ATTENDANT.JOB_FAIR_DETAIL_PAGE, {
      jobFairId: id
    })
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
        // getCompanyBoothId={getCompanyBoothId}
      />
      <PaginationComponent handlePageChange={handlePageChange} totalRecord={data.length}/>
    </div>
  )
};

export default JobFairAttendantAttendedContainer;