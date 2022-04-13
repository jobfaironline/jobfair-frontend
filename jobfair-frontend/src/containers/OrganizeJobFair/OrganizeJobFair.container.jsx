import './OrganizeJobFair.styles.scss';
import { AssignEmployeeContainer } from '../3D/AssignEmployee/AssignEmployee.container';
import { Form, Steps, notification } from 'antd';
import { convertToDateValue } from '../../utils/common';
import {
  draftJobFairAPI,
  publishJobFairAPI,
  updateJobFairAPI
} from '../../services/jobhub-api/JobFairConTrollerService';
import { loadGLBModel } from '../../utils/ThreeJS/threeJSUtil';
import { pickLayoutForJobFair } from '../../services/jobhub-api/LayoutControllerService';
import ChooseTemplateJobFairContainer from '../ChooseTemplateJobFair/ChooseTemplateJobFair.container';
import JobFairLandingPageContainer from '../JobFairLandingPage/JobFairLandingPage.container';
import JobFairParkMapComponent from '../../components/3D/JobFairParkMap/JobFairParkMap.component';
import PublishJobFairContainer from '../PublishJobFairContainer/PublishJobFair.container';
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
      hostName: values.hostName,
      description: values.description,
      targetAttendant: values.targetAttendant
    };
    const res = await updateJobFairAPI(body);
    if (res.status === 200) return true;
  };

  const publishJobFairEvent = async () => {
    const res = await publishJobFairAPI(jobFairData?.id);
    if (res.status === 200) {
      notification['success']({
        message: 'Publish job fair successfully'
      });
    }
  };

  const nextStepButtonActions = (step) => {
    switch (step) {
      case 0:
        return async () => {
          await chooseLayoutForJobFair();
          setCurrentStep(currentStep + 1);
        };
      case 1:
        return async () => {
          try {
            await form.validateFields();
            await updateJobFairAtScheduleScreen(form.getFieldsValue(true));
            setCurrentStep(currentStep + 1);
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
      case 3:
        return async () => {
          try {
            await form.validateFields();
            await updateJobFairAtLandingPage(form.getFieldsValue(true));
            setCurrentStep(currentStep + 1);
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
      case 4:
        return async () => {
          await publishJobFairEvent();
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

  const chooseLayoutForJobFair = async () => {
    if (jobFairData === undefined || layoutData.id === '') return;
    const body = {
      jobFairId: jobFairData.id,
      layoutId: layoutData.id
    };
    try {
      await pickLayoutForJobFair(body);
    } catch (e) {
      notification['error']({
        message: 'Error is created'
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
        onHandleNext={nextStepButtonActions(currentStep)}
        onHandlePrev={handleOnPrev(currentStep)}
        form={form}
        onFinish={updateJobFairAtScheduleScreen}
        onValueChange={onValueChange}
        isError={isError}
      />
    </>,
    <>
      {jobFairData !== undefined ? (
        <AssignEmployeeContainer
          jobFairId={jobFairData.id}
          onHandleNext={nextStepButtonActions(currentStep)}
          onHandlePrev={handleOnPrev(currentStep)}
        />
      ) : null}
    </>,
    <>
      <JobFairLandingPageContainer
        form={form}
        onHandleNext={nextStepButtonActions(currentStep)}
        onHandlePrev={handleOnPrev(currentStep)}
        onFinish={updateJobFairAtLandingPage}
        templateId={layoutData.id}
      />
    </>,
    <>
      <PublishJobFairContainer
        data={form.getFieldsValue(true)}
        onFinish={publishJobFairEvent}
        onHandlePrev={handleOnPrev(currentStep)}
      />
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
