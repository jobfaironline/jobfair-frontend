import React from 'react'
import { ChooseBoothPageContainer } from '../../containers/ChooseBooth/ChooseBooth.container'
import { useParams } from 'react-router-dom'

export const ChooseBoothPage = () => {
  const { jobFairId } = useParams()
  return <ChooseBoothPageContainer jobFairId={jobFairId} />
}
