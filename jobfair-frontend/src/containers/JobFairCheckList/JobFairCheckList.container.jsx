import './JobFairCheckList.styles.scss';

import { Button, Col, Empty, Image, Modal, Progress, Row, Tag, Tooltip, Typography, notification } from 'antd';
import { DateFormat, MinuteFormat } from '../../constants/ApplicationConst';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JOB_FAIR_STATUS } from '../../constants/JobFairConst';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { PATH, PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { faArrowLeft, faCircleCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { generatePath, useHistory } from 'react-router-dom';
import { getJobFairByIDAPI, publishJobFairAPI } from '../../services/jobhub-api/JobFairControllerService';
import { getLayoutByJobFairId } from '../../services/jobhub-api/LayoutControllerService';
import { getStatisticsByJobFair } from '../../services/jobhub-api/AssignmentControllerService';
import { getTimeZoneCode } from '../../utils/common';
import { green } from '@ant-design/colors';
import { useEffect, useState } from 'react';
import moment from 'moment';

const organizeJobFairStep = 5;

const { Text } = Typography;

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

const StepComponent = (props) => {
  const { isFinish, children } = props;

  return (
    <div className={'step'}>
      <div className={'status'}>
        <FontAwesomeIcon icon={faCircleCheck} color={isFinish ? 'green' : 'gray'} size={'2x'} />
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};

export const JobFairCheckListContainer = ({ jobFairId }) => {
  const [state, setState] = useState({
    jobFairData: undefined,
    layoutData: undefined,
    statisticsData: undefined,
    progressData: {
      choosingLayout: false,
      schedule: false,
      assign: false,
      landing: false,
      publish: false,
      score: 0
    },
    isLoading: true
  });

  const history = useHistory();
  const [publishModalVisible, setPublishModalVisible] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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
    if (jobFairData.thumbnailUrl !== undefined && jobFairData.thumbnailUrl !== null) {
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
    const progressData = calculateProgressPercentage(jobFairData, layoutData, statistics);
    setState((prevState) => ({ ...prevState, jobFairData, layoutData, statistics, progressData, isLoading: false }));
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
    } catch (e) {
      notification['error']({
        message: `Failed to publish job fair`,
        description: `${e.response.data.message}`
      });
    }
  };

  if (state.isLoading) return <LoadingComponent isWholePage={true} />;

  return (
    <>
      <Modal
        title='Publish job fair'
        visible={publishModalVisible}
        onOk={publishJobFairEvent}
        centered
        onCancel={() => {
          setPublishModalVisible(false);
        }}>
        Are you sure to publish <Text strong>{state.jobFairData.name}</Text>?
      </Modal>
      <div className={'job-fair-check-list-container'}>
        <Button
          type={'link'}
          onClick={() => {
            history.push(PATH_COMPANY_MANAGER.JOB_FAIR_GRID_PAGE);
          }}
          style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
          <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 5 }} />
          Back to my job fair
        </Button>
        <div className={'progress-bar'}>
          <Progress percent={state.progressData.score} strokeColor={green[6]} />
        </div>
        <div className={'step-container'}>
          <StepComponent isFinish={state.progressData.choosingLayout}>
            <div className={'title'}>
              <div style={{ flex: 1 }}>
                <Row>
                  <Text className={'content'} strong>
                    Step 1: Choosing your layout
                  </Text>
                </Row>
                <Row>
                  <Text>Select your job fair layout</Text>
                </Row>
              </div>

              <div className={'button-container'}>
                <Button
                  disabled={!state.progressData.choosingLayout}
                  style={{ marginRight: '0.3rem' }}
                  className={'button'}
                  type={'primary'}
                  onClick={handleReviewLayout}>
                  Enter map
                </Button>
                <Button className={'button'} type={'primary'} onClick={handleEditLayout}>
                  Change layout
                </Button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {state.layoutData?.thumbnailUrl === undefined ? (
                <Empty />
              ) : (
                <Image
                  style={{ borderRadius: '8px' }}
                  width={'100%'}
                  height={'200px'}
                  src={state.layoutData?.thumbnailUrl}
                />
              )}
            </div>
          </StepComponent>
          <StepComponent isFinish={state.progressData.schedule}>
            <div className={'title'}>
              <div style={{ flex: 1 }}>
                <Text className={'content'} strong>
                  Step 2: Schedule job fair
                </Text>
                <Row className={'time'}>
                  <Col span={5}>
                    <Text>Decorate time ({getTimeZoneCode()}):</Text>
                  </Col>
                  <Col>
                    {state.jobFairData.decorateStartTime ? (
                      <Tag color={'green'}>{moment(state.jobFairData.decorateStartTime).format(DateFormat)}</Tag>
                    ) : (
                      <Tag color={'red'}>Not enter</Tag>
                    )}
                    <Tag color='orange'>
                      <FontAwesomeIcon icon={faMinus} />
                    </Tag>
                    {state.jobFairData.decorateEndTime ? (
                      <Tag color={'green'}>{moment(state.jobFairData.decorateEndTime).format(DateFormat)}</Tag>
                    ) : (
                      <Tag color={'red'}>Not enter</Tag>
                    )}
                  </Col>
                </Row>
                <Row className={'time'}>
                  <Col span={5}>
                    <Text>Public time ({getTimeZoneCode()}):</Text>
                  </Col>
                  <Col>
                    {state.jobFairData.publicStartTime ? (
                      <Tag color={'green'}>{moment(state.jobFairData.publicStartTime).format(DateFormat)}</Tag>
                    ) : (
                      <Tag color={'red'}>Not enter</Tag>
                    )}
                    <Tag color='orange'>
                      <FontAwesomeIcon icon={faMinus} />
                    </Tag>
                    {state.jobFairData.publicEndTime ? (
                      <Tag color={'green'}>{moment(state.jobFairData.publicEndTime).format(DateFormat)}</Tag>
                    ) : (
                      <Tag color={'red'}>Not enter</Tag>
                    )}
                  </Col>
                </Row>
                <Row className={'time'}>
                  <Col span={5}>
                    <Text>Morning shift ({getTimeZoneCode()}):</Text>
                  </Col>
                  <Col>
                    {state.jobFairData.morningShift[0] ? (
                      <Tag color={'green'}>{state.jobFairData.morningShift[0]}</Tag>
                    ) : (
                      <Tag color={'red'}>Not enter</Tag>
                    )}
                    <Tag color='orange'>
                      <FontAwesomeIcon icon={faMinus} />
                    </Tag>
                    {state.jobFairData.morningShift[1] ? (
                      <Tag color={'green'}>{state.jobFairData.morningShift[1]}</Tag>
                    ) : (
                      <Tag color={'red'}>Not enter</Tag>
                    )}
                  </Col>
                </Row>
                <Row className={'time'}>
                  <Col span={5}>
                    <Text>Afternoon shift ({getTimeZoneCode()}):</Text>
                  </Col>
                  <Col>
                    {state.jobFairData.afternoonShift[0] ? (
                      <Tag color={'green'}>{state.jobFairData.afternoonShift[0]}</Tag>
                    ) : (
                      <Tag color={'red'}>Not enter</Tag>
                    )}
                    <Tag color='orange'>
                      <FontAwesomeIcon icon={faMinus} />
                    </Tag>
                    {state.jobFairData.afternoonShift[1] ? (
                      <Tag color={'green'}>{state.jobFairData.afternoonShift[1]}</Tag>
                    ) : (
                      <Tag color={'red'}>Not enter</Tag>
                    )}
                  </Col>
                </Row>
              </div>

              <div className={'button-container'}>
                <Button className={'button'} type={'primary'} onClick={handleEditSchedule}>
                  Edit schedule
                </Button>
              </div>
            </div>
          </StepComponent>
          <StepComponent isFinish={state.progressData.assign}>
            <div className={'title'}>
              <div style={{ flex: 1 }}>
                <Text className={'content'} strong>
                  Step 3: Assign employee
                </Text>
                <Row className={'time'}>
                  <Col span={6}>
                    <Text>Number of assigned employee: </Text>
                  </Col>
                  <Col>
                    <Text strong style={{ color: state.statistics.assignedEmployeeNum === 0 ? 'red' : 'green' }}>
                      {state.statistics.assignedEmployeeNum}
                    </Text>
                  </Col>
                </Row>
                <Row className={'time'}>
                  <Col span={6}>
                    <Text>Number of assigned booth: </Text>
                  </Col>
                  <Col>
                    <Text strong style={{ color: state.statistics.assignedBoothNum === 0 ? 'red' : 'green' }}>
                      {state.statistics.assignedBoothNum}
                    </Text>
                  </Col>
                </Row>
              </div>

              <div className={'button-container'}>
                {!state.progressData.choosingLayout ? (
                  <Tooltip title={'Please choose layout for job fair first'}>
                    {/* need to wrap span outside disable button if using tool tip: https://github.com/react-component/tooltip/issues/18#issuecomment-411476678*/}
                    <span>
                      <Button
                        style={{ pointerEvents: 'none' }}
                        className={'button'}
                        type={'primary'}
                        disabled={!state.progressData.choosingLayout}
                        onClick={handleEditAssignEmployee}>
                        Assign more
                      </Button>
                    </span>
                  </Tooltip>
                ) : (
                  <Button
                    className={'button'}
                    type={'primary'}
                    disabled={!state.progressData.choosingLayout}
                    onClick={handleEditAssignEmployee}>
                    Assign more
                  </Button>
                )}
              </div>
            </div>
          </StepComponent>
          <StepComponent isFinish={state.progressData.landing}>
            <div className={'title'}>
              <div style={{ flex: 1 }}>
                <Row>
                  <Text className={'content'} strong>
                    Step 4: Create landing page
                  </Text>
                </Row>
                <Row>
                  <Text>Decorate your job fair's landing page</Text>
                </Row>
              </div>

              <div className={'button-container'}>
                <Button
                  style={{ marginRight: '0.3rem' }}
                  className={'button'}
                  type={'primary'}
                  onClick={handleEditLandingPage}>
                  Decorate landing page
                </Button>
                <Button
                  disabled={!state.progressData.landing}
                  className={'button'}
                  type={'primary'}
                  onClick={handleReviewLandingPage}>
                  Review
                </Button>
              </div>
            </div>
          </StepComponent>
          <StepComponent isFinish={state.progressData.publish}>
            <div className={'title'}>
              <div style={{ flex: 1 }}>
                <Row>
                  <Text className={'content'} strong>
                    Step 5: Publish your job fair
                  </Text>
                </Row>
                <Row>
                  <Text>Confirm and publish your job fair</Text>
                </Row>
              </div>

              <div className={'button-container'}>
                {state.progressData.score !== 80 ? (
                  <Tooltip title={'Please complete all steps to publish'}>
                    {/* need to wrap span outside disable button if using tool tip: https://github.com/react-component/tooltip/issues/18#issuecomment-411476678*/}
                    <span>
                      <Button
                        style={{ pointerEvents: 'none' }}
                        disabled={state.progressData.score !== 80}
                        className={'button'}
                        type={'primary'}
                        onClick={() => {
                          setPublishModalVisible(true);
                        }}>
                        Publish
                      </Button>
                    </span>
                  </Tooltip>
                ) : (
                  <Button
                    disabled={state.progressData.score !== 80}
                    className={'button'}
                    type={'primary'}
                    onClick={() => {
                      setPublishModalVisible(true);
                    }}>
                    Publish
                  </Button>
                )}
              </div>
            </div>
          </StepComponent>
        </div>
      </div>
    </>
  );
};
