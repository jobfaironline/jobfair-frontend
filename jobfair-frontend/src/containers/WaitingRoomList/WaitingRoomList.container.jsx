import { Button, Modal, notification } from 'antd';
import { NotificationType } from '../../constants/NotificationType';
import {
  WaitingRoomListForIntervieweeComponent,
  WaitingRoomListForInterviewerComponent
} from '../../components/customized-components/WaitingRoomList/WaitingRoomList.component';
import {
  endInterview,
  getScheduleById,
  getWaitingRoomInfo,
  inviteInterviewee,
  leaveWaitingRoom,
  startInterview,
  swapSchedule,
  visitWaitingRoom
} from '../../services/jobhub-api/InterviewControllerService';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';

export const WaitingRoomListForInterviewerContainer = ({ channelId, scheduleId }) => {
  const [intervieweeList, setIntervieweeList] = useState([]);
  const intervieweeListRef = useRef(intervieweeList);
  const [scheduleInfo, setScheduleInfo] = useState({});
  const webSocketClient = useSelector(selectWebSocket);

  const fetchScheduleInfo = async () => {
    try {
      const { data } = await getScheduleById(scheduleId);

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
      scheduleInfo?.waitingRoomId &&
        (await mappingTodayScheduleAndWaitingRoomList(
          setIntervieweeList,
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
      const fetch = async () => {
        await fetchScheduleInfo();
        scheduleInfo?.waitingRoomId &&
          (await mappingTodayScheduleAndWaitingRoomList(
            setIntervieweeList,
            scheduleInfo?.waitingRoomId,
            intervieweeListRef,
            channelId
          ));
      };

      fetch();
    }
  };

  return <WaitingRoomListForInterviewerComponent waitingList={intervieweeList} />;
};

const mappingTodayScheduleAndWaitingRoomList = async (
  setIntervieweeList,
  waitingRoomId,
  intervieweeListRef,
  interviewRoomId
) => {
  const handleInvite = async (attendantId, applicationId) => {
    try {
      const res = await inviteInterviewee(attendantId, interviewRoomId);

      if (res?.status === 202) {
        const swapHandle = async () => {
          //need to swap
          const curInterviewee = intervieweeListRef.current.filter(
            (interviewee) =>
              new Date(interviewee.beginTime) <= Date.now() && new Date(interviewee.endTime) >= Date.now()
          );

          try {
            await swapSchedule(applicationId, curInterviewee[0].id);
            waitingRoomId &&
              (await mappingTodayScheduleAndWaitingRoomList(
                setIntervieweeList,
                waitingRoomId,
                intervieweeListRef,
                interviewRoomId
              ));
            //invite again
            await inviteInterviewee(attendantId, interviewRoomId);
          } catch (e) {
            notification['error']({
              message: `Something went wrong! Try again latter!`,
              description: `There is problem while swaping, try again later`,
              duration: 2
            });
          }
        };

        //show confirm popup
        Modal.info({
          title: 'Are you sure you wanna swap this schedule?',
          onOk: () => swapHandle()
        });
      }
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while inviting, try again later`,
        duration: 2
      });
    }
  };

  try {
    const { data: waitingRoomList } = await getWaitingRoomInfo(waitingRoomId);

    const InterviewStatusButton = ({ data, scheduleInfo, channelId }) => {
      const handleEndInterview = async () => {
        try {
          await endInterview(data?.attendantId, data?.interviewRoomId);
          waitingRoomId &&
            (await mappingTodayScheduleAndWaitingRoomList(
              setIntervieweeList,
              waitingRoomId,
              intervieweeListRef,
              interviewRoomId
            ));
        } catch (e) {
          notification['error']({
            message: `Something went wrong! Try again latter!`,
            description: `There is problem while ending interview, try again later`,
            duration: 2
          });
        }
      };

      const handleStartInterview = async () => {
        try {
          await startInterview(data?.attendantId, data?.interviewRoomId);
          waitingRoomId &&
            (await mappingTodayScheduleAndWaitingRoomList(
              setIntervieweeList,
              waitingRoomId,
              intervieweeListRef,
              interviewRoomId
            ));
        } catch (e) {
          notification['error']({
            message: `Something went wrong! Try again latter!`,
            description: `There is problem while starting interview, try again later`,
            duration: 2
          });
        }
      };

      switch (data.status) {
        case 'NOT_YET':
          return (
            <Button type='primary' shape='round' onClick={() => handleStartInterview()}>
              Start
            </Button>
          );
        case 'INTERVIEWING':
          return (
            <Button type='primary' shape='round' onClick={() => handleEndInterview()}>
              End
            </Button>
          );
        case 'DONE':
          return (
            <Button type='primary' shape='round' disabled={true}>
              Done
            </Button>
          );
        case 'REQUEST_CHANGE':
          return (
            <Button type='primary' shape='round' disabled={true}>
              Changing
            </Button>
          );
        default:
          return null;
      }
    };

    const intervieweeListData = waitingRoomList
      .map((item) => {
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
          inRoom: item.inWaitingRoom,
          buttonStatus: () => <InterviewStatusButton data={item} />,
          handleInvite: () => handleInvite(item.attendantId, item.id)
        };
        return tmp;
      })
      .sort((a, b) => a.timeStart - b.timeStart);

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

export const WaitingRoomListForIntervieweeContainer = ({ channelId, scheduleId }) => {
  const [interviewTurn, setInterviewTurn] = useState(0);
  const interviewTurnRef = useRef(interviewTurn);
  // const [userSchedule, setUserSchedule] = useState({}); //TODO: will fetch data later

  const webSocketClient = useSelector(selectWebSocket);
  const history = useHistory();

  useEffect(() => {
    visitWaitingRoom(channelId);
    webSocketClient.addEvent('get-invitation', getInvitaion);
    return () => {
      leaveWaitingRoom(channelId);
      webSocketClient.removeEvent('get-invitation', getInvitaion);
    };
  }, []);

  const getInvitaion = (notificationData) => {
    if (notificationData.notificationType === NotificationType.INTERVIEW_ROOM) {
      const messageObject = JSON.parse(notificationData.message);

      const key = `open${Date.now()}`;
      const btn = (
        <Button
          type='primary'
          size='small'
          onClick={() => {
            history.push(`/attendant/interview/${scheduleId}/${messageObject.interviewRoomId}`);
            notification.close(key);
          }}>
          Let's go!
        </Button>
      );

      notification.open({
        message: 'New invitation',
        description: 'Start your interview now!',
        btn,
        key
      });
    } else if (notificationData.notificationType === NotificationType.WAITING_ROOM)
      checkTurn(setInterviewTurn, channelId, interviewTurnRef);
  };

  return (
    <WaitingRoomListForIntervieweeComponent
      turn={interviewTurn}
      userSchedule={{
        fullName: 'Kim Anh',
        beginTime: 1556175797428,
        endTime: 1556175797428
      }} //TODO: replace dynamic later
    />
  );
};

const checkTurn = async (setInterviewTurn, waitingRoomId, interviewTurnRef) => {
  try {
    const { data } = await getWaitingRoomInfo(waitingRoomId);

    interviewTurnRef.current = data.turn;
    setInterviewTurn(data.turn);
  } catch (e) {
    notification['error']({
      message: `Something went wrong! Try again latter!`,
      description: `There is problem while fetching data, try again later`,
      duration: 2
    });
  }
};
