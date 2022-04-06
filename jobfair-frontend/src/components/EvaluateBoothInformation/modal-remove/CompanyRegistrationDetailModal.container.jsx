import React, { useEffect, useState } from 'react'
import { notification } from 'antd'
import CompanyRegistrationDetailModalComponent from './CompanyRegistrationDetailModal.component'
import { getCompanyProfileAPI } from '../../../services/company-controller/CompanyControllerService'

const CompanyRegistrationDetailModalContainer = ({
  registrationId,
  visible,
  setModalVisible,
  registrationList
}) => {
  const [registrationDetail, setRegistrationDetail] = useState({})
  const [companyName, setCompanyName] = useState('')

  const fetchData = async () => {
    const registration = registrationList?.find(
      item => item.id === registrationId
    )
    setRegistrationDetail(registration)
    const companyId = registration?.companyId
    // eslint-disable-next-line no-unused-expressions
    companyId
      ? getCompanyProfileAPI(companyId)
          .then(res => {
            setCompanyName(res.data.name)
          })
          .catch(() => {
            notification['error']({
              message: `Fail to process`,
              description: `Get company profile failed with ID: ${companyId}`,
              duration: 2
            })
          })
      : null
  }

  const onOk = () => {
    setModalVisible(false)
  }

  const onCancel = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    fetchData()
  }, [registrationId])

  const componentProps = {
    data: {
      id: registrationDetail?.id,
      createDate: registrationDetail?.createDate,
      description: registrationDetail?.description,
      companyName: companyName,
      registrationJobPositions: () => {
        if (
          registrationDetail !== undefined &&
          registrationDetail.registrationJobPositions !== undefined
        ) {
          return [...registrationDetail.registrationJobPositions]
        } else {
          return []
        }
      }
    },
    visible: visible,
    onOk: onOk,
    onCancel: onCancel
  }

  return (
    <>
      <CompanyRegistrationDetailModalComponent {...componentProps} />
    </>
  )
}

export default CompanyRegistrationDetailModalContainer
