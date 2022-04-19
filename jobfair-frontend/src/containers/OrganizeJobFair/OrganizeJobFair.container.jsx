import './OrganizeJobFair.styles.scss';
import { AssignEmployeeContainer } from '../3D/AssignEmployee/AssignEmployee.container';
import { Form, Steps, notification } from 'antd';
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
import { loadGLBModel } from '../../utils/ThreeJS/threeJSUtil';
import { useHistory, useLocation } from 'react-router-dom';
import ChooseTemplateJobFairContainer from '../ChooseTemplateJobFair/ChooseTemplateJobFair.container';
import JobFairLandingPageContainer from '../JobFairLandingPage/JobFairLandingPage.container';
import JobFairParkMapComponent from '../../components/3D/JobFairParkMap/JobFairParkMap.component';
import PublishJobFairContainer from '../PublishJobFairContainer/PublishJobFair.container';
import React, { useEffect, useState } from 'react';
import ScheduleJobFairFormComponent from '../../components/forms/ScheduleJobFairForm/ScheduleJobFairForm.component';

const { Step } = Steps;

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
        message: 'Something went wrong'
      });
    }
  };

  const handleLoad3DMap = async (url, id) => {
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
      const errorsArray = form.getFieldsError();
      for (const error of errorsArray) {
        if (error.errors.length > 0) {
          form.scrollToField(error.name, { behavior: 'smooth', block: 'center' });
          break;
        }
      }
      const isHasError = form.getFieldsError().filter(({ errors }) => errors.length).length > 0;
      setIsError(isHasError);
    }
  };

  const updateJobFairAtScheduleScreen = async (values) => {
    try {
      const body = {
        id: jobFairData?.id,
        name: values.name,
        decorateStartTime: convertToDateValue(values.decorateRange[0].format()),
        decorateEndTime: convertToDateValue(values.decorateRange[1].format()),
        publicStartTime: convertToDateValue(values.publicRange[0].format()),
        publicEndTime: convertToDateValue(values.publicRange[1].format())
      };
      const res = await updateJobFairAPI(body);
      if (res.status === 200) return true;
    } catch (e) {
      notification['error']({
        message: 'Error is created'
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
        message: 'Error is created'
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
        message: 'Error is created'
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

  const breadcrumbWrapper = (component) => (
    <>
      <Steps
        current={currentStep}
        style={{
          background: '#FFF',
          zIndex: '1000',
          padding: '1rem 3rem'
        }}>
        <Step />
        <Step />
        <Step />
        <Step />
      </Steps>
      {component}
    </>
  );

  const stepComponentList = [
    <SideBarComponent
      rightSide={layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : <div />}
      leftSide={breadcrumbWrapper(
        <ChooseTemplateJobFairContainer
          handleLoad3DMap={handleLoad3DMap}
          onNext={onNext(currentStep)}
          layoutData={layoutData}
        />
      )}
      nextButtonContent={'Choose template'}
      onNext={onNext(currentStep)}
      isNextButtonDisable={layoutData.id === ''}
      isPrevButtonDisable={true}
      ratio={450 / 1728}
      isDisplayPrevButton={false}
      isDisplayNextButton={false}
    />,
    <SideBarComponent
      rightSide={layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : <div />}
      leftSide={breadcrumbWrapper(
        <ScheduleJobFairFormComponent
          jobFairData={jobFairData}
          onFinish={updateJobFairAtScheduleScreen}
          form={form}
          onValueChange={onValueChange}
        />
      )}
      nextButtonContent={'Start assign employee'}
      prevButtonContent={'Back to choose job fair layout'}
      onNext={onNext(currentStep)}
      isNextButtonDisable={isError}
      isPrevButtonDisable={false}
      onPrev={onPrev(currentStep)}
      ratio={450 / 1728}
    />,
    <>
      {jobFairData !== undefined ? (
        <AssignEmployeeContainer
          jobFairId={jobFairData.id}
          onHandleNext={onNext(currentStep)}
          onHandlePrev={onPrev(currentStep)}
        />
      ) : null}
    </>,
    <SideBarComponent
      leftSide={layoutData.glb ? <JobFairParkMapComponent mapMesh={layoutData.glb} /> : <div />}
      rightSide={
        jobFairData !== undefined ? (
          <JobFairLandingPageContainer
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
      ratio={1 / 4}
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
