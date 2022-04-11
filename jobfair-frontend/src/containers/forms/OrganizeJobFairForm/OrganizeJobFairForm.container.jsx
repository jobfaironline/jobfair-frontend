import './OrganizeJobFairForm.styles.scss';
import { Checkbox, Form, Steps } from 'antd';
import { loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import ChooseTemplateJobFairContainer from '../../ChooseTemplateJobFair/ChooseTemplateJobFair.container';
import JobFairParkMapComponent from '../../../components/3D/JobFairParkMap/JobFairParkMap.component';
import PolicyComponent from '../../../components/customized-components/Policy/Policy.component';
import React, { useState } from 'react';

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
      id
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
  const handleOnPrev = (currentStep) => () => {
    if (currentStep !== 0) setCurrentStep(currentStep - 1);
  };

  const stepComponentList = [
    <div>
      <div style={{ width: '75%' }}>{layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : null}</div>
      <ChooseTemplateJobFairContainer
        onHandleNext={nextStepButtonActions(currentStep)}
        templateId={layoutData.id}
        handleLoad3DMap={handleLoad3DMap}
      />
    </div>,
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
    <>Step 3</>,
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
        <Step title='Our policy' />
        <Step title='Choose template' />
        <Step title='Jobfair registration form' />
        <Step title='Confirm registration' />
      </Steps>
      {stepComponentList[currentStep]}
    </div>
  );
};

export default OrganizeJobFairFormContainer;
