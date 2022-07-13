import { AssignEmployeeDetailModalContainer } from './AssignEmployeeDetailModal.container';
import { Button, Progress, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JOB_FAIR_STATUS } from '../../constants/JobFairConst';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { MinuteFormat } from '../../constants/ApplicationConst';
import { PATH, PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { PublishJobFairConfirmModal } from '../../components/customized-components/PublishJobFairConfirmModal/PublishJobFairConfirmModal.component';
import { Step1Component } from '../../components/customized-components/JobFairCheckList/Step1.component';
import { Step2Component } from '../../components/customized-components/JobFairCheckList/Step2.component';
import { Step3Component } from '../../components/customized-components/JobFairCheckList/Step3.component';
import { Step4Component } from '../../components/customized-components/JobFairCheckList/Step4.component';
import { Step5Component } from '../../components/customized-components/JobFairCheckList/Step5.component';
import {
  checkJobFairPublishAPI,
  deleteJobFairDraftAPI,
  getJobFairByIDAPI,
  publishJobFairAPI
} from '../../services/jobhub-api/JobFairControllerService';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory } from 'react-router-dom';
import { getLayoutByJobFairId } from '../../services/jobhub-api/LayoutControllerService';
import { getStatisticsByJobFair } from '../../services/jobhub-api/AssignmentControllerService';
import { green } from '@ant-design/colors';
import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import RoleType from '../../constants/RoleType';
import moment from 'moment';

const organizeJobFairStep = 5;

const mapJobFairData = (jobFairData) => {
  const startOfDate = moment().startOf('day');
  return {
    ...jobFairData,
    morningShift: [
      jobFairData.shifts?.[0]?.beginTime !== undefined
        ? moment(startOfDate.valueOf() + jobFairData.shifts[0].beginTime).format(MinuteFormat)
        : undefined,
      jobFairData.shifts?.[0]?.endTime !== undefined
        ? moment(startOfDate.valueOf() + jobFairData.shifts[0].endTime).format(MinuteFormat)
        : undefined
    ],
    afternoonShift: [
      jobFairData.shifts?.[1]?.beginTime !== undefined
        ? moment(startOfDate.valueOf() + jobFairData.shifts[1].beginTime).format(MinuteFormat)
        : undefined,
      jobFairData.shifts?.[1]?.endTime !== undefined
        ? moment(startOfDate.valueOf() + jobFairData.shifts[1].endTime).format(MinuteFormat)
        : undefined
    ]
  };
};

const calculateProgressPercentage = (jobFairData, layoutData, statistics) => {
  const progressData = {
    choosingLayout: false,
    schedule: false,
    assign: false,
    landing: false,
    publish: false,
    score: 0
  };
  const progressStep = 100 / organizeJobFairStep;
  if (jobFairData.decorateStartTime !== undefined && jobFairData.decorateStartTime !== null) {
    progressData.schedule = true;
    progressData.score += progressStep;
  }
  if (layoutData !== undefined && layoutData !== null) {
    progressData.choosingLayout = true;
    progressData.score += progressStep;
  }
  if (jobFairData.thumbnailUrl && jobFairData.description && jobFairData.targetAttendant) {
    progressData.score += progressStep;
    progressData.landing = true;
  }
  if (jobFairData.status === JOB_FAIR_STATUS.PUBLISH) {
    progressData.score += progressStep;
    progressData.publish = true;
  }
  if (statistics.assignedBoothNum !== 0) {
    progressData.score += progressStep;
    progressData.assign = true;
  }
  return progressData;
};

const { Text } = Typography;

export const JobFairCheckListContainer = ({ jobFairId }) => {
  const role = useSelector((state) => state?.authentication?.user?.roles);
  const [state, setState] = useState({
    jobFairData: undefined,
    layoutData: undefined,
    statistics: undefined,
    progressData: {
      choosingLayout: false,
      schedule: false,
      assign: false,
      landing: false,
      publish: false,
      score: 0
    },
    isLoading: true,
    hasAnotherPublishJobFair: false
  });
  const [rerender, setRerender] = useState(true);

  const history = useHistory();
  const [publishModalVisible, setPublishModalVisible] = useState(false);
  const [assignEmployeeModalVisible, setAssignEmployeeModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, [rerender]);

  const fetchData = async () => {
    let jobFairData;
    let layoutData;
    let statistics;
    try {
      const { data } = await getJobFairByIDAPI(jobFairId);
      jobFairData = data;
    } catch (e) {
      //ignore
    }
    jobFairData = mapJobFairData(jobFairData);

    try {
      const { data } = await getLayoutByJobFairId(jobFairId);
      layoutData = data;
    } catch (e) {
      //ignore
    }

    try {
      const { data } = await getStatisticsByJobFair(jobFairId);
      statistics = data;
    } catch (e) {
      //ignore
    }
    let hasAnotherPublishJobFair = false;
    try {
      const { data } = await checkJobFairPublishAPI(jobFairId);
      hasAnotherPublishJobFair = data?.error.includes('published') ?? false;
    } catch (e) {
      //ignore
    }

    const progressData = calculateProgressPercentage(jobFairData, layoutData, statistics);
    setState((prevState) => ({
      ...prevState,
      jobFairData,
      layoutData,
      statistics,
      progressData,
      isLoading: false,
      hasAnotherPublishJobFair
    }));
  };

  const handleReviewLayout = () => {
    const url = generatePath(PATH_COMPANY_MANAGER.REVIEW_MAP, {
      layoutId: state.layoutData.id
    });
    const src = `${window.location.origin}${url}`;
    window.open(src);
  };

  const handleEditLayout = () => {
    history.push(PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE, { step: 0, jobFairId: state.jobFairData.id });
  };

  const handleEditSchedule = () => {
    history.push(PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE, { step: 1, jobFairId: state.jobFairData.id });
  };

  const handleEditAssignEmployee = () => {
    history.push(PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE, { step: 2, jobFairId: state.jobFairData.id });
  };

  const handleEditLandingPage = () => {
    history.push(PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE, { step: 3, jobFairId: state.jobFairData.id });
  };

  const handleReviewLandingPage = () => {
    const url = generatePath(PATH.JOB_FAIR_LANDING_PAGE, {
      jobFairId,
      review: 'review'
    });
    const src = `${window.location.origin}${url}?review`;
    window.open(src);
  };

  const publishJobFairEvent = async () => {
    try {
      await publishJobFairAPI(state.jobFairData?.id);
      notification['success']({
        message: 'Publish job fair successfully'
      });
      setPublishModalVisible(false);
      setRerender((prevState) => !prevState);
    } catch (e) {
      notification['error']({
        message: `Failed to publish job fair`,
        description: `${e.response.data.message}`
      });
    }
  };

  const handlePublishJobFair = () => {
    setPublishModalVisible(true);
  };

  const onCloseAssignEmployeeModal = () => {
    setAssignEmployeeModalVisible(false);
  };

  const handleViewAssignmentDetail = () => {
    setAssignEmployeeModalVisible(true);
  };

  const onCancelPublish = () => {
    setPublishModalVisible(false);
  };

  const handleDeleteJobFairDraft = async () => {
    try {
      await deleteJobFairDraftAPI(jobFairId);
      history.push(PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE);
      notification['success']({
        message: 'Delete job fair successfully'
      });
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while deleting job fair draft, try again later`,
        duration: 2
      });
    }
  };

  if (state.isLoading) return <LoadingComponent isWholePage={true} />;

  return (
    <>
      <AssignEmployeeDetailModalContainer
        visible={assignEmployeeModalVisible}
        onClose={onCloseAssignEmployeeModal}
        jobFairId={jobFairId}
      />
      <PublishJobFairConfirmModal
        publishModalVisible={publishModalVisible}
        publishJobFairEvent={publishJobFairEvent}
        onCancel={onCancelPublish}
        jobFairData={state.jobFairData}
        statistics={state.statistics}
      />

      <div className={'job-fair-check-list-container'}>
        {role === RoleType.COMPANY_MANAGER ? (
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '1rem' }}>
            <Button
              type={'link'}
              onClick={() => {
                history.push(PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE);
              }}
              style={{ fontSize: '1.2rem' }}>
              <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 5 }} />
              Back to my job fair
            </Button>
            <Button
              type={'primary'}
              className={'button'}
              style={{ marginLeft: 'auto', display: state.progressData.score === 100 ? 'none' : 'block' }}
              onClick={handleDeleteJobFairDraft}>
              Delete job fair
            </Button>
          </div>
        ) : null}

        <div className={'progress-bar'}>
          <Progress percent={state.progressData.score} strokeColor={green[6]} />
        </div>
        {state.progressData.score === 100 ? (
          <div style={{ marginLeft: '1rem', fontSize: '1rem' }}>
            <Text>
              This job fair has been <Text strong>published</Text>. You <Text strong>cannot</Text> edit the following
              information:
            </Text>
            <Typography.Paragraph>
              <ul>
                <li>3D layout</li>
                <li>Schedule</li>
                <li>Employee assignment</li>
                <li>Landing page</li>
              </ul>
            </Typography.Paragraph>
          </div>
        ) : null}
        <div className={'step-container'}>
          <Step1Component
            isFinish={state.progressData.choosingLayout}
            isPublish={state.jobFairData.status === JOB_FAIR_STATUS.PUBLISH}
            handleReviewLayout={handleReviewLayout}
            handleEditLayout={handleEditLayout}
            layoutData={state.layoutData}
          />
          <Step2Component
            isFinish={state.progressData.schedule}
            isPublish={state.jobFairData.status === JOB_FAIR_STATUS.PUBLISH}
            jobFairData={state.jobFairData}
            handleEditSchedule={handleEditSchedule}
          />
          <Step3Component
            isFinish={state.progressData.assign}
            isPublish={state.jobFairData.status === JOB_FAIR_STATUS.PUBLISH}
            statistics={state.statistics}
            isChooseLayout={state.progressData.choosingLayout}
            handleEditAssignEmployee={handleEditAssignEmployee}
            handleViewDetail={handleViewAssignmentDetail}
          />
          <Step4Component
            isFinish={state.progressData.landing}
            isPublish={state.jobFairData.status === JOB_FAIR_STATUS.PUBLISH}
            handleEditLandingPage={handleEditLandingPage}
            handleReviewLandingPage={handleReviewLandingPage}
          />
          <Step5Component
            isFinish={state.progressData.publish}
            progressScore={state.progressData.score}
            hasAnotherPublishJobFair={state.hasAnotherPublishJobFair}
            handlePublishJobFair={handlePublishJobFair}
          />
        </div>
      </div>
    </>
  );
};
