import './OrganizeJobFair.styles.scss';
import { AssignEmployeeContainer } from '../3D/AssignEmployee/AssignEmployee.container';
import { Button, Form, notification } from 'antd';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import { convertToDateValue } from '../../utils/common';
import {
  draftJobFairAPI,
  getJobFairByIDAPI,
  updateJobFairAPI
} from '../../services/jobhub-api/JobFairControllerService';
import { generatePath, useHistory, useLocation } from 'react-router-dom';
import { getLayoutByJobFairId, pickLayoutForJobFair } from '../../services/jobhub-api/LayoutControllerService';
import { handleFieldsError } from '../../utils/handleFIeldsError';
import { loadGLBModel } from '../../utils/ThreeJS/threeJSUtil';
import ChooseTemplateJobFairContainer from '../ChooseTemplateJobFair/ChooseTemplateJobFair.container';
import CreateJobFairLandingPageContainer from '../CreateJobFairLandingPage/CreateJobFairLandingPage.container';
import JobFairParkMapComponent from '../../components/3D/JobFairParkMap/JobFairParkMap.component';
import React, { useEffect, useState } from 'react';
import ScheduleJobFairFormComponent from '../../components/forms/ScheduleJobFairForm/ScheduleJobFairForm.component';
import moment from 'moment';

const generateUpdateJobFairRequestBody = (formValues, jobFairId) => {
  const startOfDate = moment().startOf('day');

  const shifts = [
    {
      beginTime: (formValues.morningShift[0].unix() - startOfDate.unix()) * 1000,
      endTime: (formValues.morningShift[1].unix() - startOfDate.unix()) * 1000
    },
    {
      beginTime: (formValues.afternoonShift[0].unix() - startOfDate.unix()) * 1000,
      endTime: (formValues.afternoonShift[1].unix() - startOfDate.unix()) * 1000
    }
  ];
  return {
    id: jobFairId,
    name: formValues.name,
    decorateStartTime: convertToDateValue(formValues.decorateRange[0].format()),
    decorateEndTime: convertToDateValue(formValues.decorateRange[1].format()),
    publicStartTime: convertToDateValue(formValues.publicRange[0].format()),
    publicEndTime: convertToDateValue(formValues.publicRange[1].format()),
    shifts
  };
};

const OrganizeJobFairContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const step = location.state?.step ?? 0;
  const jobFairId = location.state?.jobFairId;

  const [form] = Form.useForm();
  //management step
  const [currentStep, setCurrentStep] = useState(step);
  const [jobFairData, setJobFairData] = useState();
  const [layoutData, setLayoutData] = useState({
    glb: undefined,
    id: ''
  });
  const [isError, setIsError] = useState(false);
  const [isLoadMap, setIsLoadMap] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (step === 0) {
      let jobFairData;
      try {
        jobFairData = (await getJobFairByIDAPI(jobFairId)).data;
        setJobFairData(jobFairData);
        return;
      } catch (e) {
        //ignore error
      }
      if (jobFairData === undefined) {
        const body = { name: 'Untitled' };
        const data = (await draftJobFairAPI(body)).data;
        setJobFairData(data);
        setIsError(true);
        notification['success']({
          message: 'A job fair has been created'
        });
        return;
      }
    }
    try {
      const jobFairData = (await getJobFairByIDAPI(jobFairId)).data;
      if (step === 1 && jobFairData.decorateStartTime === null) setIsError(true);
      if (step === 3 && jobFairData.thumbnailUrl === null) setIsError(true);

      setJobFairData(jobFairData);
    } catch (e) {
      //ignore
    }
    try {
      const layoutData = (await getLayoutByJobFairId(jobFairId)).data;
      const glb = await loadGLBModel(layoutData.url);
      setLayoutData({
        glb: glb.scene,
        id: layoutData.id
      });
    } catch (e) {
      if (e.result.status !== 404) {
        notification['error']({
          message: `Something went wrong: ${e.response.data.message}`
        });
      }
    }
  };

  const handleLoad3DMap = async (url, id) => {
    setIsLoadMap(true);
    setLayoutData({
      glb: undefined,
      id: ''
    });
    const glb = await loadGLBModel(url);
    setLayoutData({
      glb: glb.scene,
      id
    });
  };

  const onValueChange = async () => {
    try {
      await form.validateFields();
      setIsError(false);
    } catch (e) {
      handleFieldsError(form);
      const isHasError = form.getFieldsError().filter(({ errors }) => errors.length).length > 0;
      setIsError(isHasError);
    }
  };

  const updateJobFairAtScheduleScreen = async (values) => {
    try {
      const body = generateUpdateJobFairRequestBody(values, jobFairData?.id);
      const res = await updateJobFairAPI(body);
      if (res.status === 200) return true;
    } catch (e) {
      notification['error']({
        message: `${e.response.data.message}`
      });
      return false;
    }
  };

  const updateJobFairAtLandingPage = async (values) => {
    try {
      const body = {
        id: jobFairData?.id,
        hostName: values.hostName,
        description: values.description,
        targetAttendant: values.targetAttendant
      };
      const res = await updateJobFairAPI(body);
      if (res.status === 200) return true;
    } catch (e) {
      notification['error']({
        message: `${e.response.data.message}`
      });
      return false;
    }
  };

  const onNext = (step) => {
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
            if (layoutData.glb !== undefined) {
              setCurrentStep(currentStep + 1);
              setIsError(false);
            } else {
              notification['success']({
                message: 'Save schedule successfully'
              });
            }
          } catch (e) {
            handleFieldsError(form);
          }
        };
      case 2:
        return async () => {
          if (jobFairData.thumbnailUrl) setIsError(false);
          setIsError(true);
          setCurrentStep(currentStep + 1);
        };
      case 3:
        return async () => {
          try {
            await form.validateFields();
            await updateJobFairAtLandingPage(form.getFieldsValue(true));
            const url = generatePath(PATH_COMPANY_MANAGER.CHECKLIST, { jobFairId });
            history.push(url);
          } catch (e) {
            handleFieldsError(form);
          }
        };
      default:
        return () => setCurrentStep(currentStep + 1);
    }
  };

  const onPrev = (currentStep) => () => {
    if (currentStep !== 0) {
      if (currentStep === 3 && layoutData.glb === undefined) {
        notification['warn']({
          message: 'Please go to check list and select a layout'
        });
        return;
      }
      setCurrentStep(currentStep - 1);
      setIsError(false);
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

  const handleGotoChecklist = () => {
    const url = generatePath(PATH_COMPANY_MANAGER.CHECKLIST, {
      jobFairId: jobFairData.id ? jobFairData.id : jobFairId
    });
    history.push(url);
  };

  const stepComponentList = [
    <SideBarComponent
      rightSide={
        <>
          <Button
            style={{
              position: 'absolute',
              zIndex: 1000,
              right: 0
            }}
            onClick={handleGotoChecklist}>
            Go to checklist
          </Button>
          {layoutData.glb ? (
            <JobFairParkMapComponent mapMesh={layoutData.glb} />
          ) : isLoadMap ? (
            <LoadingComponent />
          ) : (
            <div className={'no-layout'}>No layout is chosen</div>
          )}
        </>
      }
      leftSide={
        <>
          <ChooseTemplateJobFairContainer
            handleLoad3DMap={handleLoad3DMap}
            onNext={onNext(currentStep)}
            layoutData={layoutData}
          />
        </>
      }
      nextButtonContent={'Choose template'}
      onNext={onNext(currentStep)}
      isNextButtonDisable={layoutData.id === ''}
      isPrevButtonDisable={true}
      ratio={450 / 1728}
      isDisplayPrevButton={false}
      isDisplayNextButton={false}
      currentStep={currentStep}
    />,
    <SideBarComponent
      rightSide={
        <>
          <Button
            onClick={handleGotoChecklist}
            style={{
              position: 'absolute',
              zIndex: 1000,
              right: 0
            }}>
            Go to checklist
          </Button>
          {layoutData.glb ? (
            <JobFairParkMapComponent mapMesh={layoutData.glb} />
          ) : (
            <div className={'no-layout'}>No layout is chosen</div>
          )}
        </>
      }
      leftSide={
        <>
          <ScheduleJobFairFormComponent
            jobFairData={jobFairData}
            onFinish={updateJobFairAtScheduleScreen}
            form={form}
            onValueChange={onValueChange}
          />
        </>
      }
      nextButtonContent={layoutData.glb === undefined ? 'Save' : 'Start assign employee'}
      prevButtonContent={'Back to choose job fair layout'}
      onNext={onNext(currentStep)}
      isNextButtonDisable={isError}
      isPrevButtonDisable={false}
      onPrev={onPrev(currentStep)}
      ratio={450 / 1728}
      currentStep={currentStep}
    />,
    <>
      {jobFairData !== undefined ? (
        <AssignEmployeeContainer
          jobFairId={jobFairData.id}
          onHandleNext={onNext(currentStep)}
          onHandlePrev={onPrev(currentStep)}
          currentStep={currentStep}
          handleGotoChecklist={handleGotoChecklist}
        />
      ) : null}
    </>,
    <SideBarComponent
      rightSide={
        <>
          <Button
            onClick={handleGotoChecklist}
            style={{
              position: 'absolute',
              zIndex: 100000,
              right: 0
            }}>
            Go to checklist
          </Button>
          {layoutData.glb ? (
            <>
              <JobFairParkMapComponent mapMesh={layoutData.glb} />{' '}
            </>
          ) : (
            <div className={'no-layout'}>No layout is chosen</div>
          )}
        </>
      }
      leftSide={
        jobFairData !== undefined ? (
          <CreateJobFairLandingPageContainer
            jobFairData={jobFairData}
            form={form}
            onFinish={updateJobFairAtLandingPage}
            jobFairId={jobFairData.id}
            onValueChange={onValueChange}
          />
        ) : null
      }
      nextButtonContent={'Publish'}
      prevButtonContent={'Back to assign employee'}
      onNext={onNext(currentStep)}
      isNextButtonDisable={isError}
      isPrevButtonDisable={false}
      onPrev={onPrev(currentStep)}
      ratio={450 / 1728}
      currentStep={currentStep}
    />
  ];

  if (jobFairData === undefined) return <LoadingComponent isWholePage={true} />;

  return <div className={'organize-job-fair-container'}>{stepComponentList[currentStep]}</div>;
};

export default OrganizeJobFairContainer;
