import './OrganizeJobFair.styles.scss';
import { AssignEmployeeContainer } from '../3D/AssignEmployee/AssignEmployee.container';
import { Col, Form, Row, notification } from 'antd';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import { convertToDateValue } from '../../utils/common';
import {
  draftJobFairAPI,
  publishJobFairAPI,
  updateJobFairAPI
} from '../../services/jobhub-api/JobFairControllerService';
import { loadGLBModel } from '../../utils/ThreeJS/threeJSUtil';
import { pickLayoutForJobFair } from '../../services/jobhub-api/LayoutControllerService';
import { useHistory } from 'react-router-dom';
import ChooseTemplateJobFairContainer from '../ChooseTemplateJobFair/ChooseTemplateJobFair.container';
import JobFairLandingPageContainer from '../JobFairLandingPage/JobFairLandingPage.container';
import JobFairParkMapComponent from '../../components/3D/JobFairParkMap/JobFairParkMap.component';
import PublishJobFairContainer from '../PublishJobFairContainer/PublishJobFair.container';
import React, { useEffect, useState } from 'react';
import ScheduleJobFairFormComponent from '../../components/forms/ScheduleJobFairForm/ScheduleJobFairForm.component';

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
  const history = useHistory();

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
          try {
            await publishJobFairEvent();
            history.push(PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE);
          } catch (e) {
            notification['error']({
              message: 'Error is created'
            });
          }
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
    const body = { name: 'Untitled' };
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
    <SideBarComponent
      leftSide={layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : <div />}
      rightSide={<ChooseTemplateJobFairContainer handleLoad3DMap={handleLoad3DMap} />}
      nextButtonContent={'Choose template'}
      onNext={nextStepButtonActions(currentStep)}
      isNextButtonDisable={layoutData.id === ''}
      isPrevButtonDisable={true}
      ratio={3 / 4}
      isDisplayPrevButton={false}
    />,
    <SideBarComponent
      leftSide={layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : <div />}
      rightSide={
        <ScheduleJobFairFormComponent
          onFinish={updateJobFairAtScheduleScreen}
          form={form}
          onValueChange={onValueChange}
        />
      }
      nextButtonContent={'Start assign employee'}
      prevButtonContent={'Back to choose job fair layout'}
      onNext={nextStepButtonActions(currentStep)}
      isNextButtonDisable={isError}
      isPrevButtonDisable={false}
      onPrev={handleOnPrev(currentStep)}
      ratio={3 / 4}
    />,
    <>
      {jobFairData !== undefined ? (
        <AssignEmployeeContainer
          jobFairId={jobFairData.id}
          onHandleNext={nextStepButtonActions(currentStep)}
          onHandlePrev={handleOnPrev(currentStep)}
        />
      ) : null}
    </>,
    <SideBarComponent
      leftSide={layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : <div />}
      rightSide={
        jobFairData !== undefined ? (
          <JobFairLandingPageContainer
            form={form}
            onHandleNext={nextStepButtonActions(currentStep)}
            onHandlePrev={handleOnPrev(currentStep)}
            onFinish={updateJobFairAtLandingPage}
            jobFairId={jobFairData.id}
          />
        ) : null
      }
      nextButtonContent={'Start assign employee'}
      prevButtonContent={'Back to choose job fair layout'}
      onNext={nextStepButtonActions(currentStep)}
      isNextButtonDisable={isError}
      isPrevButtonDisable={false}
      onPrev={handleOnPrev(currentStep)}
      ratio={3 / 4}
    />,
    <>
      {jobFairData !== undefined ? (
        <PublishJobFairContainer
          jobFairId={jobFairData.id}
          onFinish={nextStepButtonActions(currentStep)}
          onHandlePrev={handleOnPrev(currentStep)}
        />
      ) : null}
    </>
  ];

  return <div>{stepComponentList[currentStep]}</div>;
};

export default OrganizeJobFairContainer;
