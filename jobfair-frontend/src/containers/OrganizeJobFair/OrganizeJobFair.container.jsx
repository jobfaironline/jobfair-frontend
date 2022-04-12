import './OrganizeJobFair.styles.scss';
import { Form, Steps, notification } from 'antd';
import { convertToDateValue } from '../../utils/common';
import { draftJobFairAPI, updateJobFairAPI } from '../../services/jobhub-api/JobFairConTrollerService';
import { loadGLBModel } from '../../utils/ThreeJS/threeJSUtil';
import ChooseTemplateJobFairContainer from '../ChooseTemplateJobFair/ChooseTemplateJobFair.container';
import JobFairLandingPageContainer from '../JobFairLandingPage/JobFairLandingPage.container';
import JobFairParkMapComponent from '../../components/3D/JobFairParkMap/JobFairParkMap.component';
import React, { useEffect, useState } from 'react';
import ScheduleJobFairFormContainer from '../forms/ScheduleJobFairForm/ScheduleJobFairForm.container';

const { Step } = Steps;
const OrganizeJobFairContainer = () => {
  const [form] = Form.useForm();
  const [jobFairData, setJobFairData] = useState();
  //management step
  const [currentStep, setCurrentStep] = useState(0);
  const [layoutData, setLayoutData] = useState({
    glb: undefined,
    id: ''
  });
  const [isError, setIsError] = useState(true);

  const handleLoad3DMap = async (url, id) => {
    const glb = await loadGLBModel(url);
    setLayoutData({
      glb: glb.scene,
      id
    });
  };

  const onValueChange = () => {
    const isHasError =
      !form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0;
    setIsError(isHasError);
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
    if (res.status === 200) return true;
  };

  const updateJobFairAtLandingPage = async (values) => {
    const body = {
      id: jobFairData?.id,
      hostName: values.hostname,
      description: values.description,
      targetAttendant: values.targetAttendant
    };
    const res = await updateJobFairAPI(body);
    if (res.status === 200) return true;
  };

  const nextStepButtonActions = (step) => {
    switch (step) {
      case 1:
        return () => {
          form
            .validateFields()
            .then(() => {
              updateJobFairAtScheduleScreen(form.getFieldsValue(true));
              setCurrentStep(currentStep + 1);
            })
            .catch(() => {
              const errorsArray = form.getFieldsError();
              for (const error of errorsArray) {
                if (error.errors.length > 0) {
                  form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
                  break;
                }
              }
            });
        };
      case 2:
        return () => {
          form
            .validateFields()
            .then(() => {
              updateJobFairAtLandingPage(form.getFieldsValue(true));
              setCurrentStep(currentStep + 1);
            })
            .catch(() => {
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
      <div style={{ width: '75%' }}>{layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : null}</div>
      <ScheduleJobFairFormContainer
        form={form}
        onHandleNext={nextStepButtonActions(currentStep)}
        onHandlePrev={handleOnPrev(currentStep)}
        onValueChange={onValueChange}
        isError={isError}
        onFinish={updateJobFairAtScheduleScreen}
      />
    </>,
    <>
      <JobFairLandingPageContainer
        form={form}
        onHandleNext={nextStepButtonActions(currentStep)}
        onHandlePrev={handleOnPrev(currentStep)}
        onFinish={updateJobFairAtLandingPage}
      />
    </>,
    <>screen 5</>
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
        <Step title='Our policy' />
        <Step title='Choose template' />
        <Step title='Jobfair registration form' />
        <Step title='Confirm registration' />
      </Steps>
      {stepComponentList[currentStep]}
    </div>
  );
};

export default OrganizeJobFairContainer;
