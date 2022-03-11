import React, {useEffect, useState} from 'react'
import JobFairDetailModalComponent from './JobFairDetailModal.component'
import {getAccountByIdAPI} from '../../../services/account-controller/AccountControllerService'
import {notification} from 'antd'

const JobFairDetailModalContainer = ({jobFairId, creatorId, visible, setModalVisible, jobFairList}) => {
  const [jobFairDetail, setJobFairDetail] = useState({})
  const [creatorInfo, setCreatorInfo] = useState('')

  const fetchData = async () => {
    const jobFair = jobFairList?.find(item => item.id === jobFairId)
    setJobFairDetail(jobFair)
    //get creator name by creatorId
    getAccountByIdAPI(creatorId)
      .then(res => {
        setCreatorInfo(
          `Full name: ${res.data.firstname} ${res.data.middlename} ${res.data.lastname}. Role: ${res.data.role}`
        )
      })
      .catch(err => {
        notification['error']({
          message: `Fail to process`,
          description: `Get account name failed with ID: ${creatorId}`,
          duration: 2
        })
      })
  }

  const onOk = () => {
    setModalVisible(false)
  }

  const onCancel = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    fetchData()
  }, [jobFairId])

  const componentProps = {
    data: {
      attendantRegisterStartTime: jobFairDetail?.attendantRegisterStartTime,
      companyBuyBoothEndTime: jobFairDetail?.companyBuyBoothEndTime,
      companyBuyBoothStartTime: jobFairDetail?.companyBuyBoothStartTime,
      companyRegisterEndTime: jobFairDetail?.companyRegisterEndTime,
      companyRegisterStartTime: jobFairDetail?.companyRegisterStartTime,
      creatorInfo: creatorInfo,
      description: jobFairDetail?.description,
      endTime: jobFairDetail?.endTime,
      id: jobFairDetail?.id,
      layoutId: jobFairDetail?.layoutId,
      startTime: jobFairDetail?.startTime,
      status: jobFairDetail?.status
    },
    visible: visible,
    onOk: onOk,
    onCancel: onCancel
  }

  return (
    <>
      <JobFairDetailModalComponent {...componentProps} />
    </>
  )
}

export default JobFairDetailModalContainer
