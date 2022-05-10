import './styles.scss';
import { Form } from 'antd';
import { INTERVIEW_SCHEDULE_STATUS } from '../../constants/InterviewScheduleConst';
import { InterviewScheduleCalendar } from '../../components/customized-components/InterviewScheduleCalendar/InterviewScheduleCalendar.component';
import { getSchedule } from '../../services/jobhub-api/InterviewControllerService';
import InterviewScheduleModalDetailComponent from '../../components/customized-components/InterviewScheduleModalDetail/InterviewScheduleModalDetail.component';
import InterviewScheduleModalRequestChangeComponent from '../../components/customized-components/InterviewScheduleModalRequestChange/InterviewScheduleModalRequestChange.component';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

const InterviewScheduleContainer = () => {
  const [pivotDate, setPivotDate] = useState(moment());
  const [interviewSchedule, setInterviewSchedule] = useState([]);
  //modals state
  const [scheduleDetailModalVisible, setScheduleDetailModalVisible] = useState(false);
  const [requestChangeModalVisible, setRequestChangeModalVisible] = useState(false);
  //modal detail
  const [modalDetail, setModalDetail] = useState();

  const [form] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, [pivotDate]);

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
    let data = (
      await getSchedule({
        beginTime: pivotDate.subtract(15, 'd').unix() * 1000,
        endTime: pivotDate.add(15, 'd').unix() * 1000
      })
    ).data;

    data = data.map((item) => {
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

  const disabledDate = (current) => current && current < moment().startOf('day');

  const onFinish = null;

  const onPanelChange = (value) => {
    setPivotDate(value);
  };

  return (
    <div>
      <InterviewScheduleModalDetailComponent
        visible={scheduleDetailModalVisible}
        onCancel={onCancelModal}
        data={modalDetail}
        handleRequestChange={handleRequestChange}
      />
      <InterviewScheduleModalRequestChangeComponent
        data={modalDetail}
        visible={requestChangeModalVisible}
        onCancel={onCancelRequestChangeModal}
        disabledDate={disabledDate}
        form={form}
        onFinish={onFinish}
      />
      <InterviewScheduleCalendar
        setScheduleModalVisible={setScheduleDetailModalVisible}
        setScheduleModalDetail={setModalDetail}
        data={interviewSchedule}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};

export default InterviewScheduleContainer;
