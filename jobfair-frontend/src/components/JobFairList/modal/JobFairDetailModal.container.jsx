import React, { useEffect, useState } from 'react'
import CompanyRegistrationDetailModalComponent from '../../ApprovalRegistration/modal/CompanyRegistrationDetailModal.component'
import JobFairDetailModalComponent from './JobFairDetailModal.component'
import { getAccountByIdAPI } from '../../../services/account-controller/AccountControllerService'
import { notification } from 'antd'
import {evaluateJobFairPlanAPI} from "../../../services/job-fair-controller/JobFairConTrollerService";
import {
  getRegistrationByJobFairId
} from "../../../services/company-registration-controller/CompanyRegistrationControllerService";
import {CompanyRegistrationStatus} from "../../../constants/CompanyRegistrationConst";
import {getLayoutDetail} from "../../../services/layout-controller/LayoutControllerService";
import {convertEnumToString} from "../../../utils/common";

const JobFairDetailModalContainer = ({ jobFairId, creatorId, visible, setModalVisible, jobFairList }) => {
  const [jobFairDetail, setJobFairDetail] = useState({})
  const [creatorInfo, setCreatorInfo] = useState('')
  const [totalApproval,setTotalApproval] = useState(0)
  const [totalRegistration,setTotalRegistration] = useState(0)
  const [totalBooth, setTotalBooth] = useState(0)

  const fetchData = async () => {
    const jobFair = jobFairList?.find(item => item.id === jobFairId)
    setJobFairDetail(jobFair)
    //get creator name by creatorId
    getAccountByIdAPI(creatorId)
      .then(res => {
        setCreatorInfo(
          `Full name: ${res.data.firstname} ${res.data.middlename} ${res.data.lastname}. Role: ${convertEnumToString(res.data.role)}`
        )
      })
      .catch(err => {
        //
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
    getTotalCompanyRegistrationOfJobFair()
    getTotalBoothOfJobFair()
  }, [jobFairId])

  const onFinish = values => {
    evaluateJobFairPlanAPI(values)
        .then(res => {
          notification['success']({
            message: `Your evaluation has been submitted`,
            description: `Evaluate job fair plan successfully`
          })
          history.goBack()
        })
        .catch(err => {
          notification['error']({
            message: `An error occurred while submitting`,
            description: `Evaluate job fair plan failed - ${err}`
          })
        })
  }

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
      status: jobFairDetail?.status,
      name: jobFairDetail?.name,
      estimateParticipant: jobFairDetail?.estimateParticipant,
      targetCompany: jobFairDetail?.targetCompany,
      targetAttendant: jobFairDetail?.targetAttendant,

    },
    visible: visible,
    onOk: onOk,
    onCancel: onCancel,
    onFinish: onFinish,
    totalRegistration: totalRegistration,
    totalBooth: totalBooth,
    totalApproval: totalApproval
  }


  const getTotalCompanyRegistrationOfJobFair = async () => {
    //need API for getting company registrations have status APPROVE by jobfairId
    getRegistrationByJobFairId(jobFairId, 0, 5000, 'createDate', 'DESC')
        .then(res => {
          const approvalRegistrations = res.data.content.filter(item => item.status === CompanyRegistrationStatus.APPROVE).length
          setTotalApproval(approvalRegistrations)
          const totalRegistrations = res.data.totalElements
          setTotalRegistration(totalRegistrations)
        })
        .catch(err => {
          // if (err.response.status === 404) {
          //   notification['info']({
          //     message: `No company has registered this job fair yet.`,
          //   })
          // } else {
          //   notification['error']({
          //     message: `Error at get total booth: ${err}`
          //   })
          // }
        })
  }

  const getTotalBoothOfJobFair = () => {
    //get total booth by layoutId
    getLayoutDetail(jobFairDetail?.layoutId)
        .then(res => {
          const totalBooth = res.data.booths.length
          setTotalBooth(totalBooth)
        })
        .catch(err => {
          // if (err.response.status === 404) {
          //   notification['info']({
          //     message: `No booth has been assigned for this job fair yet.`,
          //   })
          // } else {
          //   notification['error']({
          //     message: `Error at get total booth: ${err}`
          //   })
          // }
        })
  }

  return (
    <>
      <JobFairDetailModalComponent {...componentProps} />
    </>
  )
}

export default JobFairDetailModalContainer
