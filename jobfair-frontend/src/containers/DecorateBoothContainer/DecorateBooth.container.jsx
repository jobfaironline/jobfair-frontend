import { Decorate3DBoothContainer } from '../3D/DecorateBooth/Decorate3DBooth.container';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import { decorateBoothAction } from '../../redux-flow/decorateBooth/decorate-booth-slice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export const DecorateBoothContainer = () => {
  const { companyBoothId, jobFairId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => () => {
    dispatch(decorateBoothAction.reset({}));
  });
  //management step
  const [currentStep, setCurrentStep] = useState(0);

  const onNext = (step) => {
    switch (step) {
      default:
        return () => setCurrentStep(currentStep + 1);
    }
  };

  const onPrev = (currentStep) => () => {
    if (currentStep !== 0) setCurrentStep(currentStep - 1);
  };

  const stepComponentList = [
    <SideBarComponent
      leftSide={<Decorate3DBoothContainer companyBoothId={companyBoothId} jobFairId={jobFairId} />}
      rightSide={<div>Hello mr Son ga</div>}
      nextButtonContent={'Choose template'}
      onNext={onNext(currentStep)}
      onPrev={onPrev(currentStep)}
      isNextButtonDisable={false}
      isPrevButtonDisable={true}
      ratio={3 / 4}
      isDisplayPrevButton={false}
    />
  ];

  return <div>{stepComponentList[currentStep]}</div>;
};
