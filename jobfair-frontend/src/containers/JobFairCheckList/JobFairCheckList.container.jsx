import './JobFairCheckList.styles.scss';

import { Button, Modal, Progress, notification } from 'antd';
import { DateFormat, MinuteFormat } from '../../constants/ApplicationConst';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JOB_FAIR_STATUS } from '../../constants/JobFairConst';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory } from 'react-router-dom';
import { getJobFairByIDAPI, publishJobFairAPI } from '../../services/jobhub-api/JobFairControllerService';
import { getLayoutByJobFairId } from '../../services/jobhub-api/LayoutControllerService';
import { getStatisticsByJobFair } from '../../services/jobhub-api/AssignmentControllerService';
import { green } from '@ant-design/colors';
import { useEffect, useState } from 'react';
import PublishJobFairContainer from '../PublishJobFairContainer/PublishJobFair.container';
import moment from 'moment';

const organizeJobFairStep = 5;

const mapJobFairData = (jobFairData) => {
  const startOfDate = moment().startOf('day');
  return {
    ...jobFairData,
    morningShift: [
      jobFairData.shifts?.[0]?.beginTime !== undefined
        ? moment(startOfDate.valueOf() + jobFairData.shifts[0].beginTime)
        : undefined,
      jobFairData.shifts?.[0]?.endTime !== undefined
        ? moment(startOfDate.valueOf() + jobFairData.shifts[0].endTime)
        : undefined
    ],
    afternoonShift: [
      jobFairData.shifts?.[1]?.beginTime !== undefined
        ? moment(startOfDate.valueOf() + jobFairData.shifts[1].beginTime)
        : undefined,
      jobFairData.shifts?.[1]?.endTime !== undefined
        ? moment(startOfDate.valueOf() + jobFairData.shifts[1].endTime)
        : undefined
    ]
  };
};

export const JobFairCheckListContainer = ({ jobFairId }) => {
  const [state, setState] = useState({
    jobFairData: undefined,
    layoutData: undefined,
    statisticsData: undefined
  });

  const [progress, setProgress] = useState(0);
  const history = useHistory();
  const [publishModalVisible, setPublishModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const calculateProgressPercentage = (jobFairData, layoutData, statistics) => {
    const progressStep = 100 / organizeJobFairStep;
    let progress = 0;
    if (jobFairData.decorateStartTime !== undefined) progress += progressStep;
    if (layoutData !== undefined) progress += progressStep;
    if (jobFairData.thumbnailUrl !== undefined) progress += progressStep;
    if (jobFairData.status === JOB_FAIR_STATUS.PUBLISH) progress += progressStep;
    if (statistics.assignedBoothNum !== 0) progress += progressStep;
    setProgress(progress);
  };

  const fetchData = async () => {
    let { data: jobFairData } = await getJobFairByIDAPI(jobFairId);
    jobFairData = mapJobFairData(jobFairData);
    const { data: layoutData } = await getLayoutByJobFairId(jobFairId);
    const { data: statistics } = await getStatisticsByJobFair(jobFairId);
    calculateProgressPercentage(jobFairData, layoutData, statistics);
    setState((prevState) => ({ ...prevState, jobFairData, layoutData, statistics }));
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

  const publishJobFairEvent = async () => {
    try {
      await publishJobFairAPI(state.jobFairData?.id);
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

  if (state.jobFairData === undefined || state.layoutData === undefined || state.statistics === undefined)
    return <LoadingComponent isWholePage={true} />;

  return (
    <>
      <div className={'job-fair-check-list-container'}>
        <Button
          type={'link'}
          onClick={() => {
            history.push(PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE);
          }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to my events
        </Button>
        <div>
          <Progress percent={progress} steps={organizeJobFairStep} strokeColor={green[6]} />
        </div>
        <div className={'step-container'}>
          <div className={'step'}>
            <div>Step 1: choosing your template</div>
            <Button onClick={handleReviewLayout}>Enter map</Button>
            <Button onClick={handleEditLayout}>Change layout</Button>
          </div>
          <div className={'step'}>
            <div>Step 2: schedule job fair</div>
            <div>
              <div>
                Decorate start time:{' '}
                {state.jobFairData.decorateStartTime
                  ? moment(state.jobFairData.decorateStartTime).format(DateFormat)
                  : 'Not enter'}
              </div>
              <div>
                Decorate end time:{' '}
                {state.jobFairData.decorateEndTime
                  ? moment(state.jobFairData.decorateEndTime).format(DateFormat)
                  : 'Not enter'}
              </div>
              <div>
                Public start time:{' '}
                {state.jobFairData.publicStartTime
                  ? moment(state.jobFairData.publicStartTime).format(DateFormat)
                  : 'Not enter'}
              </div>
              <div>
                Public end time:{' '}
                {state.jobFairData.publicEndTime
                  ? moment(state.jobFairData.publicEndTime).format(DateFormat)
                  : 'Not enter'}
              </div>
              <div>
                Morning shift: {state.jobFairData.morningShift[0]?.format(MinuteFormat)}{' '}
                {state.jobFairData.morningShift[1]?.format(MinuteFormat)}
              </div>
              <div>
                Afternoon shift: {state.jobFairData.afternoonShift[0]?.format(MinuteFormat)}{' '}
                {state.jobFairData.afternoonShift[1]?.format(MinuteFormat)}
              </div>
              <Button onClick={handleEditSchedule}>Edit</Button>
            </div>
          </div>
          <div className={'step'}>
            <div>Step 3: assign employee</div>
            <Button>Review</Button>
            <Button onClick={handleEditAssignEmployee}>Edit</Button>
          </div>
          <div className={'step'}>
            <div>Step 4: create landing page</div>
            <Button>Review</Button>
            <Button onClick={handleEditLandingPage}>Edit</Button>
          </div>
          <div className={'step'}>
            <div>Publish your job fair</div>
            <Button
              onClick={() => {
                setPublishModalVisible(true);
              }}>
              Publish
            </Button>
            <Modal visible={publishModalVisible} footer={null} closable={false}>
              <PublishJobFairContainer
                onHandlePrev={() => {
                  setPublishModalVisible(false);
                }}
                onFinish={() => {
                  publishJobFairEvent(state.jobFairData.id);
                }}
                jobFairId={state.jobFairData.id}
              />
            </Modal>
          </div>
        </div>
        <div>Share or review landing page</div>
        <div>Delete event</div>
      </div>
    </>
  );
};
