import { Decorate3DBoothContainer } from '../3D/DecorateBooth/Decorate3DBooth.container';
import { decorateBoothAction } from '../../redux-flow/decorateBooth/decorate-booth-slice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

export const DecorateBoothContainer = () => {
  const { companyBoothId, jobFairId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => () => {
    dispatch(decorateBoothAction.reset({}));
  });

  return (
    <div>
      <Decorate3DBoothContainer companyBoothId={companyBoothId} jobFairId={jobFairId} />
    </div>
  );
};
