import './OrganizeJobFair.styles.scss';
import { AssignEmployeeContainer } from '../3D/AssignEmployee/AssignEmployee.container';
import { Form, notification } from 'antd';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import { convertToDateValue } from '../../utils/common';
import {
  draftJobFairAPI,
  getJobFairByIDAPI,
  publishJobFairAPI,
  updateJobFairAPI
} from '../../services/jobhub-api/JobFairControllerService';
import { getLayoutByJobFairId, pickLayoutForJobFair } from '../../services/jobhub-api/LayoutControllerService';
import { handleFieldsError } from '../../utils/handleFIeldsError';
import { loadGLBModel } from '../../utils/ThreeJS/threeJSUtil';
import { useHistory, useLocation } from 'react-router-dom';
import ChooseTemplateJobFairContainer from '../ChooseTemplateJobFair/ChooseTemplateJobFair.container';
import CreateJobFairLandingPageContainer from '../CreateJobFairLandingPage/CreateJobFairLandingPage.container';
import JobFairParkMapComponent from '../../components/3D/JobFairParkMap/JobFairParkMap.component';
import PublishJobFairContainer from '../PublishJobFairContainer/PublishJobFair.container';
import React, { useEffect, useState } from 'react';
import ScheduleJobFairFormComponent from '../../components/forms/ScheduleJobFairForm/ScheduleJobFairForm.component';
import moment from 'moment';

const generateUpdateJobFairRequestBody = (formValues, jobFairId) => {
  const startOfDate = moment().startOf('day');

  const shifts = [
    {
      beginTime: formValues.morningShift[0].unix() - startOfDate.unix(),
      endTime: formValues.morningShift[1].unix() - startOfDate.unix()
    },
    {
      beginTime: formValues.afternoonShift[0].unix() - startOfDate.unix(),
      endTime: formValues.afternoonShift[1].unix() - startOfDate.unix()
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
  const [isError, setIsError] = useState(true);
  const [isLoadMap, setIsLoadMap] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (step === 0) {
        const body = { name: 'Untitled' };
        const data = (await draftJobFairAPI(body)).data;
        setJobFairData(data);
        notification['success']({
          message: 'A job fair has been created'
        });
      } else {
        const jobFairData = (await getJobFairByIDAPI(jobFairId)).data;

        const layoutData = (await getLayoutByJobFairId(jobFairId)).data;
        const glb = await loadGLBModel(layoutData.url);
        setLayoutData({
          glb: glb.scene,
          id: layoutData.id
        });
        setJobFairData(jobFairData);
      }
    } catch (e) {
      notification['error']({
        message: `Something went wrong: ${e.response.data.message}`
      });
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

  const publishJobFairEvent = async () => {
    try {
      await publishJobFairAPI(jobFairData?.id);
      notification['success']({
        message: 'Publish job fair successfully'
      });
    } catch (e) {
      notification['error']({
        message: `Failed to publish job fair`,
        description: `${e.response.data.message}`
      });
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
            setCurrentStep(currentStep + 1);
            setIsError(false);
          } catch (e) {
            handleFieldsError(form);
          }
        };
      case 3:
        return async () => {
          try {
            await form.validateFields();
            await updateJobFairAtLandingPage(form.getFieldsValue(true));
            setCurrentStep(currentStep + 1);
            setIsError(false);
          } catch (e) {
            handleFieldsError(form);
          }
        };
      case 4:
        return async () => {
          try {
            await publishJobFairEvent();
            history.push(PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE);
          } catch (e) {
            notification['error']({
              message: `Fail to publish job fair: ${e.response.message}`
            });
          }
        };
      default:
        return () => setCurrentStep(currentStep + 1);
    }
  };

  const onPrev = (currentStep) => () => {
    if (currentStep !== 0) {
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

  const stepComponentList = [
    <SideBarComponent
      rightSide={
        layoutData.glb ? (
          <JobFairParkMapComponent mapMesh={layoutData.glb} />
        ) : isLoadMap ? (
          <LoadingComponent />
        ) : (
          <div />
        )
      }
      leftSide={
        <ChooseTemplateJobFairContainer
          handleLoad3DMap={handleLoad3DMap}
          onNext={onNext(currentStep)}
          layoutData={layoutData}
        />
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
      rightSide={layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : <div />}
      leftSide={
        <ScheduleJobFairFormComponent
          jobFairData={jobFairData}
          onFinish={updateJobFairAtScheduleScreen}
          form={form}
          onValueChange={onValueChange}
        />
      }
      nextButtonContent={'Start assign employee'}
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
        />
      ) : null}
    </>,
    <SideBarComponent
      rightSide={layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : <div />}
      leftSide={
        jobFairData !== undefined ? (
          <CreateJobFairLandingPageContainer
            jobFairData={jobFairData}
            form={form}
            onFinish={updateJobFairAtLandingPage}
            jobFairId={jobFairData.id}
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
    />,
    <>
      {jobFairData !== undefined ? (
        <PublishJobFairContainer
          jobFairId={jobFairData.id}
          onFinish={onNext(currentStep)}
          onHandlePrev={onPrev(currentStep)}
        />
      ) : null}
    </>
  ];

  return <div>{stepComponentList[currentStep]}</div>;
};

export default OrganizeJobFairContainer;
