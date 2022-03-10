import React from 'react'
import ConfirmComponent from '../../components/Confirm/Confirm.component'

const ConfirmContainer = props => {
  const { data, companyInfo } = props
  return (
    <>
      <ConfirmComponent data={data} companyInfo={companyInfo} />
    </>
  )
}

export default ConfirmContainer
