import { Decorate3DBoothContainer } from '../3D/DecorateBooth/Decorate3DBooth.container';
import { Form } from 'antd';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import { decorateBoothAction } from '../../redux-flow/decorateBooth/decorate-booth-slice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PickJobPositionFormContainer from '../forms/PickJobPositionForm/PickJobPositionForm.container';
import React, { useEffect, useState } from 'react';

export const DecorateBoothContainer = () => {
  const { companyBoothId, jobFairId } = useParams();
  const [form] = Form.useForm();
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => () => {
    dispatch(decorateBoothAction.reset({}));
  });
  //management step
  const [currentStep, setCurrentStep] = useState(0);

  const onNext = (step) => {
    switch (step) {
      case 1:
        return async () => {
          try {
            await form.validateFields();
            //TODO: call API create draft
            setCurrentStep(currentStep + 1);
            setIsError(false);
          } catch (e) {
            const errorsArray = form.getFieldsError();
            for (const error of errorsArray) {
              if (error.errors.length > 0) {
                form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
                break;
              }
            }
          }
        };
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
      nextButtonContent={'Pick job position'}
      onNext={onNext(currentStep)}
      onPrev={onPrev(currentStep)}
      isNextButtonDisable={false}
      isPrevButtonDisable={true}
      ratio={3 / 4}
      isDisplayPrevButton={false}
    />,
    <SideBarComponent
      leftSide={<div></div>}
      rightSide={<PickJobPositionFormContainer form={form} />}
      nextButtonContent={'Next'}
      onNext={onNext(currentStep)}
      onPrev={onPrev(currentStep)}
      isNextButtonDisable={isError}
      isPrevButtonDisable={false}
      ratio={0}
      isDisplayPrevButton={false}
    />
  ];

  return <div>{stepComponentList[currentStep]}</div>;
};
