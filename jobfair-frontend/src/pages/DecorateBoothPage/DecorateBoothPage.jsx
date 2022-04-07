import { DecorateBoothContainer } from '../../containers/3D/DecorateBooth/DecorateBooth.container';
import { decorateBoothAction } from '../../redux-flow/decorateBooth/decorate-booth-slice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';

const DecorateBoothPage = () => {
  const { companyBoothId, jobFairId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => () => {
    dispatch(decorateBoothAction.reset({}));
  });
  return (
    <div className={'page'}>
      <DecorateBoothContainer companyBoothId={companyBoothId} jobFairId={jobFairId} />
    </div>
  );
};

export default DecorateBoothPage;
