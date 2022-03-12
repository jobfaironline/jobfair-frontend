import { Button, Tooltip } from 'antd'
import { PATH } from '../../constants/Paths/Path'
import React from 'react'
import { COMPANY_JOB_FAIR_STATUS } from '../../constants/CompanyJobFairStatus'

export const RegistrableButton = props => {
  const { onClick } = props
  return (
    <Tooltip title="This event is open. Register now" color="green">
      <Button type="primary" onClick={onClick}>
        REGISTER NOW
      </Button>
    </Tooltip>
  )
}

export const SubmittedButton = props => {
  const { onClick } = props
  return (
    <Tooltip title="You registration is still in progress. Please wait!" color="gold">
      <Button type="primary" onClick={onClick}>
        PENDING
      </Button>
    </Tooltip>
  )
}

export const ApproveButton = props => {
  const { onClick } = props
  return (
    <Tooltip title="Your registration was approved!" color="gold">
      <Button type="primary" onClick={onClick}>
        APPROVED
      </Button>
    </Tooltip>
  )
}

export const UnavailableButton = props => {
  const { onClick } = props
  return (
    <Tooltip title="This event was delayed. Please comeback later." color="red">
      <Button type="primary" disabled onClick={onClick}>
        SUSPENDED
      </Button>
    </Tooltip>
  )
}

export const DecorateBoothButton = props => {
  const { onClick } = props
  return (
    <Tooltip title="You chose a booth in this event. Decorate it now" color="geekblue">
      <Button type="primary" onClick={onClick}>
        DECORATE BOOTH
      </Button>
    </Tooltip>
  )
}

export const ChooseBoothButton = props => {
  const { onClick } = props
  return (
    <Tooltip title="You registration has been approved. Now you can choose booth" color="blue">
      <Button type="primary" onClick={onClick}>
        CHOOSE BOOTH
      </Button>
    </Tooltip>
  )
}

export const GenericButton = props => {
  const { onClick, status } = props
  return (
    <Tooltip title="Other status" color="blue">
      <Button type="primary" onClick={onClick}>
        {status}
      </Button>
    </Tooltip>
  )
}

const CompanyJobFairActionButton = props => {
  const { getCompanyBoothId, item, handleRedirect } = props

  switch (item.status) {
    case COMPANY_JOB_FAIR_STATUS.REGISTRABLE:
    case COMPANY_JOB_FAIR_STATUS.REJECT:
      return <RegistrableButton onClick={() => handleRedirect(`${PATH.JOB_FAIR_REGISTRATION_PAGE}${item.id}`)} />
    case COMPANY_JOB_FAIR_STATUS.SUBMITTED:
      return <SubmittedButton />
    case COMPANY_JOB_FAIR_STATUS.APPROVE:
      return <ApproveButton />
    case COMPANY_JOB_FAIR_STATUS.UNAVAILABLE:
      return <UnavailableButton />
    case COMPANY_JOB_FAIR_STATUS.DECORATE_BOOTH:
      return <DecorateBoothButton onClick={() => getCompanyBoothId(item.id)} />
    case COMPANY_JOB_FAIR_STATUS.CHOOSE_BOOTH:
      return <ChooseBoothButton onClick={() => handleRedirect(`${PATH.CHOOSE_BOOTH_PATH}${item.id}`)} />
    default:
      return <GenericButton status={item.status} />
  }
}

export default CompanyJobFairActionButton
