import './InterviewScheduleContainer.styles.scss';
import { Badge, Button, Form, Typography, notification } from 'antd';
import { INTERVIEW_SCHEDULE_STATUS } from '../../constants/InterviewScheduleConst';
import { InterviewScheduleCalendar } from '../../components/customized-components/InterviewScheduleCalendar/InterviewScheduleCalendar.component';
import { PATH_COMPANY_EMPLOYEE } from '../../constants/Paths/Path';
import { ScheduleDetailDrawer } from '../../components/customized-components/InterviewScheduleCalendar/ScheduleDetailDrawer.component';
import { generatePath } from 'react-router-dom';
import { getSchedule, requestChangeSchedule } from '../../services/jobhub-api/InterviewControllerService';
import { useSelector } from 'react-redux';
import InterviewScheduleModalDetailComponent from '../../components/customized-components/InterviewScheduleModalDetail/InterviewScheduleModalDetail.component';
import InterviewScheduleModalRequestChangeComponent from '../../components/customized-components/InterviewScheduleModalRequestChange/InterviewScheduleModalRequestChange.component';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const { Title } = Typography;

const InterviewScheduleContainer = () => {
  const role = useSelector((state) => state.authentication.user.roles);

  const [pivotDate, setPivotDate] = useState(moment());
  const [interviewSchedule, setInterviewSchedule] = useState([]);
  //modals state
  const [scheduleDetailModalVisible, setScheduleDetailModalVisible] = useState(false);
  const [requestChangeModalVisible, setRequestChangeModalVisible] = useState(false);
  //modal detail
  const [modalDetail, setModalDetail] = useState();
  const [reRender, setReRender] = useState(true);

  const [requestChangeError, setRequestChangeError] = useState(undefined);
  const [scheduleDetailDrawer, setScheduleDetailDrawer] = useState({
    visible: false,
    date: undefined,
    scheduleData: undefined
  });

  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, [pivotDate, reRender]);

  const getBadgeType = (status) => {
    switch (status) {
      case INTERVIEW_SCHEDULE_STATUS.NOT_YET:
        return 'warning';
      case INTERVIEW_SCHEDULE_STATUS.DONE:
        return 'success';
      case INTERVIEW_SCHEDULE_STATUS.REQUEST_CHANGE:
        return 'error';
      case INTERVIEW_SCHEDULE_STATUS.INTERVIEWING:
        return 'processing';
      default:
        return 'default';
    }
  };

  const fetchData = async () => {
    const beginTime = pivotDate.clone().subtract(30, 'd').unix() * 1000;
    const endTime = pivotDate.clone().add(30, 'd').unix() * 1000;
    try {
      const response = await getSchedule({
        beginTime,
        endTime
      });
      if (response.status === 204) return;

      let data = response.data;

      data = data?.map((item) => {
        const date = moment.unix(item.beginTime / 1000);
        return {
          ...item,
          day: date.date(),
          month: date.month(),
          year: date.year(),
          title: item.name,
          timeStart: item.beginTime,
          timeEnd: item.endTime,
          interviewLink: item.url,
          badgeType: getBadgeType(item.status)
        };
      });

      setInterviewSchedule(data);
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  const onCancelModal = () => {
    setScheduleDetailModalVisible(false);
  };

  const onCancelRequestChangeModal = () => {
    setRequestChangeModalVisible(false);
  };

  const handleRequestChange = () => {
    setScheduleDetailModalVisible(false);
    setRequestChangeModalVisible(true);
  };

  const buttonAction = (data) => {
    switch (role) {
      case 'ATTENDANT':
        return (
          <Button
            type='primary'
            style={{ borderRadius: 8 }}
            onClick={() => {
              if (data?.waitingRoomId)
                window.location.href = `/attendant/waiting-room/${data.id}/${data.waitingRoomId}`;
            }}>
            Join waiting room
          </Button>
        );
      case 'COMPANY_EMPLOYEE':
        return (
          <Button
            type='primary'
            style={{ borderRadius: 8 }}
            onClick={() => {
              if (data?.interviewRoomId)
                window.location.href = `/employee/interview/${data.id}/${data.interviewRoomId}`; //TODO: replace with real data later
            }}>
            Join interview room
          </Button>
        );
      default:
        return null;
    }
  };

  const onFinish = async (values, scheduleData) => {
    const { interviewDate, timeStart, timeEnd, reason } = values;
    const beginTime = (interviewDate.unix() + (timeStart.unix() - timeStart.startOf('day').unix())) * 1000;
    const endTime = (interviewDate.unix() + (timeEnd.unix() - timeEnd.startOf('day').unix())) * 1000;
    const requestMessage = reason;
    const applicationId = scheduleData.id;
    try {
      await requestChangeSchedule(applicationId, beginTime, endTime, requestMessage);
      notification['success']({
        message: `Request successfully`,
        description: `Your request has been sent to company`
      });
      setRequestChangeError(undefined);
      setRequestChangeModalVisible(false);
      setReRender((prevState) => !prevState);
    } catch (e) {
      if (e.response.status === 400) {
        setRequestChangeError(e.response.data.message);
        return;
      }
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  const onPanelChange = (value) => {
    setPivotDate(value);
  };

  const onOpenScheduleDetail = (date, scheduleData) => {
    setScheduleDetailDrawer((prevState) => ({ ...prevState, date, scheduleData, visible: true }));
  };

  const onCloseScheduleDetail = () => {
    setScheduleDetailDrawer((prevState) => ({
      ...prevState,
      visible: false,
      date: undefined,
      scheduleData: undefined
    }));
  };

  const handleViewApplication = (applicationId) => {
    const url = generatePath(PATH_COMPANY_EMPLOYEE.RESUME_DETAIL_PAGE, { id: applicationId });
    const src = `${window.location.origin}${url}?review`;
    window.open(src);
  };

  return (
    <>
      <ScheduleDetailDrawer
        visible={scheduleDetailDrawer.visible}
        date={scheduleDetailDrawer.date}
        scheduleData={scheduleDetailDrawer.scheduleData}
        setScheduleModalVisible={setScheduleDetailModalVisible}
        onClose={onCloseScheduleDetail}
        setScheduleModalDetail={setModalDetail}
      />
      <div className={'interview-schedule-container'}>
        <InterviewScheduleModalDetailComponent
          visible={scheduleDetailModalVisible}
          onCancel={onCancelModal}
          data={modalDetail}
          handleRequestChange={handleRequestChange}
          buttonAction={buttonAction}
          role={role}
          handleViewApplication={handleViewApplication}
        />
        <InterviewScheduleModalRequestChangeComponent
          data={modalDetail}
          visible={requestChangeModalVisible}
          onCancel={onCancelRequestChangeModal}
          form={form}
          onFinish={onFinish}
          requestChangeError={requestChangeError}
        />
        <InterviewScheduleCalendar
          data={interviewSchedule}
          onPanelChange={onPanelChange}
          onOpenScheduleDetail={onOpenScheduleDetail}
        />
        <div className={'legend'}>
          <Title level={4}>Legend</Title>
          <div className={'container'}>
            <Badge status='warning' text={'Not yet'} />
            <Badge status='success' text={'Done'} />
            <Badge status='error' text={'Request change'} />
            <Badge status='processing' text={'Happening'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewScheduleContainer;
