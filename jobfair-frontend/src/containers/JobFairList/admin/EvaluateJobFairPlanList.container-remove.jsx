import React, { useLayoutEffect, useState } from 'react'
import JobFairListEvaluateComponent from '../../components/JobFairList/JobFairList.evaluate.component'
import {
  evaluateJobFairPlanAPI,
  getAllJobFairAPI
} from '../../../services/job-fair-controller/JobFairConTrollerService'
import { notification, Pagination, Space } from 'antd'
import { convertToDateString } from '../../../utils/common'
import { Link } from 'react-router-dom'
import JobFairDetailModalContainer from '../../../components/JobFairList/modal/JobFairDetailModal.container'
import EvaluationFormComponent from '../../../components/EvaluationForm/EvaluationForm.component'

const EvaluateJobFairPlanListContainer = () => {
  const [data, setData] = useState([])
  const [jobFairId, setJobFairId] = useState('')
  const [creatorId, setCreatorId] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  //pagination
  const [totalRecord, setTotalRecord] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const fetchData = async () => {
    getAllJobFairAPI(currentPage, pageSize, 'startTime', 'DESC')
      .then(res => {
        const totalRecord = res.data.totalElements
        setTotalRecord(totalRecord)

        const dataSet = res.data.content.map(item => {
          return {
            ...item,
            attendantRegisterStartTime: convertToDateString(item.attendantRegisterStartTime),
            companyBuyBoothEndTime: convertToDateString(item.companyBuyBoothEndTime),
            companyBuyBoothStartTime: convertToDateString(item.companyBuyBoothStartTime),
            companyRegisterEndTime: convertToDateString(item.companyRegisterEndTime),
            companyRegisterStartTime: convertToDateString(item.companyRegisterStartTime),
            endTime: convertToDateString(item.endTime),
            startTime: convertToDateString(item.startTime)
          }
        })
        setData([...dataSet])
        // notification['success']({
        //     message: `Get job fair list successfully`,
        //     duration: 2
        // })
      })
      .catch(err => {
        notification['error']({
          message: `Get job fair list failed`,
          description: `There is problem while fetching, try again later: ${err}`,
          duration: 2
        })
      })
  }

  const modalProps = {
    jobFairId: jobFairId,
    creatorId: creatorId,
    visible: modalVisible,
    setModalVisible: setModalVisible,
    jobFairList: [...data]
  }

  const onFinish = values => {
    evaluateJobFairPlanAPI(values)
      .then(() => {
        notification['success']({
          message: `Your evaluation has been submitted`,
          description: `Evaluate job fair plan successfully`
        })
        fetchData()
      })
      .catch(err => {
        notification['error']({
          message: `An error occurred while submitting`,
          description: `Evaluate job fair plan failed - ${err}`
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

  return (
    <>
      <JobFairDetailModalContainer {...modalProps} />
      <JobFairListEvaluateComponent
        data={data}
        editable
        extra={{
          title: 'Actions',
          key: 'action',
          render: (text, record) => {
            return (
              <Space size="middle">
                <a
                  onClick={() => {
                    setModalVisible(true)
                    setJobFairId(record.id)
                    setCreatorId(record.creatorId)
                  }}
                >
                  View detail
                </a>
                {record.status === 'PENDING' ? (
                  <EvaluationFormComponent onFinish={onFinish} id={record.id} name="jobFairId" />
                ) : null}
                {record.status === 'APPROVE' ? (
                  <Link to={`/approval-registration/${record.id}`}>View registrations</Link>
                ) : null}
              </Space>
            )
          }
        }}
      />
      <Pagination
        total={totalRecord}
        onChange={(page, pageSize) => handlePageChange(page, pageSize)}
        showSizeChanger
        showQuickJumper
        showTotal={total => `Total ${total} items`}
        pageSizeOptions={[5, 10, 15, 20]}
      />
      ,
    </>
  )
}

export default EvaluateJobFairPlanListContainer
