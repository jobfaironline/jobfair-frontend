import { ChooseBoothPageContainer } from '../../containers/ChooseBooth/ChooseBooth.container';
import { useParams } from 'react-router-dom';
import React from 'react';

export const ChooseBoothPage = () => {
  const { jobFairId } = useParams();
  return <ChooseBoothPageContainer jobFairId={jobFairId} />;
};
