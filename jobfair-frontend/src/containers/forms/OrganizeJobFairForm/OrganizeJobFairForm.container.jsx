import { Checkbox, Form, Steps } from 'antd';
import PolicyComponent from '../../../components/customized-components/Policy/Policy.component';
import React, { useState } from 'react';
import './OrganizeJobFairForm.styles.scss';
import ChooseTemplateJobFairContainer from '../../ChooseTemplateJobFair/ChooseTemplateJobFair.container';
import JobFairParkMapComponent from '../../../components/3D/JobFairParkMap/JobFairParkMap.component';
import { loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import OrganizeJobFairFormComponent from '../../../components/forms/OrganizeJobFairForm/OrganizeJobFairForm.component';

const { Step } = Steps;
const OrganizeJobFairFormContainer = () => {
  const [form] = Form.useForm();
  const [agreeStatus, setAgreeStatus] = useState(false);

  //management step
  const [currentStep, setCurrentStep] = useState(0);

  const [layoutData, setLayoutData] = useState({
    glb: undefined,
    id: ''
  });

  const handleLoad3DMap = async (url, id) => {
    const glb = await loadGLBModel(url);
    setLayoutData({
      glb: glb.scene,
      id: id
    });
  };

  const nextStepButtonActions = (step) => {
    switch (step) {
      case 3:
        return () => {
          onSubmit(form.getFieldsValue(true));
        };
      case 2:
        return () => {
          form
            .validateFields()
            .then(() => {
              setCurrentStep(currentStep + 1);
            })
            .catch(() => {
              // notification['error']({
              //   message: 'job position must not be empty'
              // })
              const errorsArray = form.getFieldsError();
              for (const error of errorsArray) {
                if (error.errors.length > 0) {
                  form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
                  break;
                }
              }
            });
        };
      default:
        return () => setCurrentStep(currentStep + 1);
    }
  };
  const handleOnPrev = (currentStep) => {
    return () => {
      if (currentStep !== 0) {
        setCurrentStep(currentStep - 1);
      }
    };
  };

  const stepComponentList = [
    <>
      <div style={{ width: '75%' }}>{layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : null}</div>
      <ChooseTemplateJobFairContainer
        onHandleNext={nextStepButtonActions(currentStep)}
        templateId={layoutData.id}
        handleLoad3DMap={handleLoad3DMap}
      />
    </>,
    <>
      <PolicyComponent
        onHandleNext={nextStepButtonActions(currentStep)}
        agreeStatus={agreeStatus}
        onHandlePrev={handleOnPrev(currentStep)}
      />
      <Checkbox checked={agreeStatus} onChange={(e) => setAgreeStatus(e.target.checked)}>
        I have read and accept the Job fair Policy
      </Checkbox>
    </>,
    <>
      <div style={{ width: '75%' }}>{layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : null}</div>
      <OrganizeJobFairFormComponent
        onHandleNext={nextStepButtonActions(currentStep)}
        onHandlePrev={handleOnPrev(currentStep)}
        form={form}
        handleLoad3DMap={handleLoad3DMap}
      />
    </>,
    <>Step 4</>
  ];

  const onSubmit = (values) => {
    // eslint-disable-next-line no-console
    console.log(values);
  };

  return (
    <div>
      <Steps
        current={currentStep}
        style={{
          marginBottom: '3rem',
          position: 'sticky',
          top: '80px',
          background: '#FFF',
          zIndex: '1000',
          padding: '1rem',
          display: 'none'
        }}>
        <Step title='Choose template' />
        <Step title='Policy agreement' />
        <Step title='Schedule job fair event' />
        <Step title='Confirm registration' />
      </Steps>
      {stepComponentList[currentStep]}
    </div>
  );
};

export default OrganizeJobFairFormContainer;
