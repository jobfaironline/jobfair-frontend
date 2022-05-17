import React, { useState, useRef, useEffect } from 'react';
import WaitingRoomListComponent from '../../components/customized-components/WaitingRoomList/WaitingRoomList.component';
import { Typography, Row, Col, Card, Button, notification } from 'antd';
import { useSelector } from 'react-redux';
import {
  visitWaitingRoom,
  leaveWaitingRoom,
  getSchedule,
  inviteInterviewee,
  getScheduleByInterviewRoomId,
  getWaitingRoomInfo
} from '../../services/jobhub-api/InterviewControllerService';
import moment from 'moment';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { NotificationType } from '../../constants/NotificationType';

//TODO: implemnt interviewer get interviewee component
const WaitingRoomListContainer = ({ channelId }) => {
  const [intervieweeList, setIntervieweeList] = useState([]);
  const intervieweeListRef = useRef(intervieweeList);
  const [scheduleInfo, setScheduleInfo] = useState({});
  const [pivotDate, setPivotDate] = useState(moment());
  const webSocketClient = useSelector(selectWebSocket);

  const fetchScheduleInfo = async () => {
    try {
      let { data } = await getScheduleByInterviewRoomId(channelId);

      setScheduleInfo(data);
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchScheduleInfo();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const beginTime = pivotDate.clone().subtract(30, 'd').unix() * 1000;
      const endTime = pivotDate.clone().add(30, 'd').unix() * 1000;

      scheduleInfo?.waitingRoomId &&
        (await mappingTodayScheduleAndWaitingRoomList(
          setIntervieweeList,
          beginTime,
          endTime,
          scheduleInfo?.waitingRoomId,
          intervieweeListRef,
          channelId
        ));
    };

    fetchData();
  }, [scheduleInfo]);

  useEffect(() => {
    webSocketClient.addEvent('change-waiting-room-list', changeWaitingRoomList);
    return () => {
      webSocketClient.removeEvent('change-waiting-room-list', changeWaitingRoomList);
    };
  }, []);

  const changeWaitingRoomList = (notificationData) => {
    if (!intervieweeListRef.current || !notificationData) return;
    if (notificationData.notificationType === NotificationType.WAITING_ROOM) {
      //get both new schedule and waiting room
      const beginTime = pivotDate.clone().subtract(30, 'd').unix() * 1000;
      const endTime = pivotDate.clone().add(30, 'd').unix() * 1000;

      const fetch = async () =>
        mappingTodayScheduleAndWaitingRoomList(
          setIntervieweeList,
          beginTime,
          endTime,
          scheduleInfo?.waitingRoomId,
          intervieweeListRef,
          channelId
        );
      scheduleInfo?.waitingRoomId && fetch();
    }
  };

  return <WaitingRoomListComponent waitingList={intervieweeList} />;
};

const mappingTodayScheduleAndWaitingRoomList = async (
  setIntervieweeList,
  beginTime,
  endTime,
  waitingRoomId,
  intervieweeListRef,
  interviewRoomId
) => {
  const handleInvite = (attendantId) => {
    inviteInterviewee(attendantId, interviewRoomId).catch((err) => {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while sending invitation, try again later`,
        duration: 2
      });
    });
  };

  try {
    //TODO: get schedule
    const { data: scheduleList } = await getSchedule({ beginTime, endTime });

    const { data: waitingRoomList } = await getWaitingRoomInfo(waitingRoomId);

    const waitingRoomUserIdList = waitingRoomList.map((a) => a.attendantId);

    const intervieweeListData = scheduleList.map((item) => {
      const date = moment.unix(item.beginTime / 1000);
      const tmp = {
        ...item,
        day: date.date(),
        month: date.month(),
        year: date.year(),
        title: item.name,
        timeStart: item.beginTime,
        timeEnd: item.endTime,
        interviewLink: item.url,
        badgeType: item.status,
        handleInvite: () => handleInvite(item.attendantId)
      };

      if (waitingRoomUserIdList.includes(item.attendantId)) {
        tmp.inRoom = true;
      } else {
        tmp.inRoom = false;
      }
      return tmp;
    });

    intervieweeListRef.current = intervieweeListData;
    setIntervieweeList(intervieweeListData);
  } catch (e) {
    notification['error']({
      message: `Something went wrong! Try again latter!`,
      description: `There is problem while fetching data, try again later`,
      duration: 2
    });
  }
};

export default WaitingRoomListContainer;
