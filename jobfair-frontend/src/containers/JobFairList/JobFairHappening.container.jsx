import React, {useLayoutEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {
  getJobFairForAdmin,
  getJobFairHappeningForAdmin
} from "../../services/job-fair-controller/JobFairConTrollerService";
import {convertEnumToString, convertToDateString} from "../../utils/common";
import {notification, Select, Space} from "antd";
import {JOB_FAIR_FOR_ADMIN_STATUS} from "../../constants/JobFairConst";
import JobFairForAdminComponent from "../../components/JobFairList/JobFairForAdmin.component";
import PaginationComponent from "../../components/PaginationComponent/Pagination.component";
import {PATH_ADMIN} from "../../constants/Paths/Path";

const {Option} = Select;

const JobFairHappeningContainer = () => {
  const [data, setData] = useState([])
  //pagination
  const [totalRecord, setTotalRecord] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  //
  const history = useHistory()

  const fetchData = async () => {
    getJobFairHappeningForAdmin(currentPage, pageSize)
      .then(res => {
          const totalRecord = res.data.totalElements
          setTotalRecord(totalRecord)
          const result = res.data.content.map((item, index) => {
            return {
              no: index,
              id: item.jobFair.id,
              companyRegisterStartTime: convertToDateString(item.jobFair.companyRegisterStartTime).split('T')[0],
              companyRegisterEndTime: convertToDateString(item.jobFair.companyRegisterEndTime).split('T')[0],
              companyBuyBoothStartTime: convertToDateString(item.jobFair.companyBuyBoothStartTime).split('T')[0],
              companyBuyBoothEndTime: convertToDateString(item.jobFair.companyBuyBoothEndTime).split('T')[0],
              attendantRegisterStartTime: convertToDateString(item.jobFair.attendantRegisterStartTime).split('T')[0],
              startTime: convertToDateString(item.jobFair.startTime).split('T')[0],
              endTime: convertToDateString(item.jobFair.endTime).split('T')[0],
              description: item.jobFair.description,
              layoutId: item.jobFair.layoutId,
              name: item.jobFair.name,
              estimateParticipant: item.jobFair.estimateParticipant,
              targetCompany: item.jobFair.targetCompany,
              targetAttendant: item.jobFair.targetAttendant,
              status: item.status
            }
          })
          setData([...result]);
        }
      ).catch(err => {
      notification['error']({
        message: `Error: ${err}`,
      })
    })
  }

  useLayoutEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  const handlePageChange = (page, pageSize) => {
    if (page > 0) {
      setCurrentPage(page - 1)
    } else {
      setCurrentPage(page)
    }
    setPageSize(pageSize)
  }

  const handleViewDetailPage = (id) => {
    history.push(PATH_ADMIN.JOB_FAIR_DETAIL_PAGE, {
      jobFair: data.find(item => item.id === id)
    })
  }


  return (
    <>
      <JobFairForAdminComponent
        data={data}
        editable
        extra={{
          title: 'Actions',
          key: 'action',
          render: (text, record) => {
            return (
              <Space size="middle">
                <a
                  onClick={() => handleViewDetailPage(record.id)}
                >
                  View detail
                </a>
              </Space>
            )
          }
        }}
      />
      <Space>
        <PaginationComponent data={data} handlePageChange={handlePageChange} totalRecord={totalRecord}/>
      </Space>
    </>
  );
};

export default JobFairHappeningContainer;