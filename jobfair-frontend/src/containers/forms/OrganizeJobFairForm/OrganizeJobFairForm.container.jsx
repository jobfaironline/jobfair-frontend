import { Button, Checkbox, Form, notification, Steps } from 'antd';
import PolicyComponent from '../../../components/customized-components/Policy/Policy.component';
import React, { useEffect, useState } from 'react';
import './OrganizeJobFairForm.styles.scss';
import ChooseTemplateJobFairContainer from '../../ChooseTemplateJobFair/ChooseTemplateJobFair.container';
import JobFairParkMapComponent from '../../../components/3D/JobFairParkMap/JobFairParkMap.component';
import { loadGLBModel } from '../../../utils/ThreeJS/threeJSUtil';
import OrganizeJobFairFormComponent from '../../../components/forms/OrganizeJobFairForm/OrganizeJobFairForm.component';
import { convertToDateValue } from '../../../utils/common';
import { draftJobFairAPI, updateJobFairAPI } from '../../../services/jobhub-api/JobFairConTrollerService';

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

  const [jobFairData, setJobFairData] = useState();

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
          // onSubmit(form.getFieldsValue(true));
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
          updateJobFairAtScheduleScreen(form.getFieldsValue(true));
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
  useEffect(() => {
    onDraftJobFair();
  }, []);

  const onDraftJobFair = async () => {
    const body = {};
    const res = await draftJobFairAPI(body);
    if (res.status === 200) {
      setJobFairData(res.data);
      notification['success']({
        message: 'A job fair has been created'
      });
    }
  };

  const updateJobFairAtScheduleScreen = async (values) => {
    const body = {
      id: jobFairData?.id,
      name: values.name,
      decorateStartTime: convertToDateValue(values.decorateRange[0].format()),
      decorateEndTime: convertToDateValue(values.decorateRange[1].format()),
      publicEndTime: convertToDateValue(values.publicRange[0].format()),
      publicStartTime: convertToDateValue(values.publicRange[1].format())
    };
    const res = await updateJobFairAPI(body);
    if (res.status === 200) {
      return true;
    }
  };

  const updateJobFairAtLandingPage = async (values) => {
    const body = {
      id: jobFairData?.id,
      description: values.description,
      hostName: values.hostName,
      targetAttendant: values.targetAttendant
    };
    const res = await updateJobFairAPI(body);
    if (res.status === 200) {
      return true;
    }
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
        onFinish={onDraftJobFair}
        handleLoad3DMap={handleLoad3DMap}
      />
    </>,
    <>
      <Button type='primary' onClick={handleOnPrev(currentStep)}>
        Previous
      </Button>
    </>
  ];

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
