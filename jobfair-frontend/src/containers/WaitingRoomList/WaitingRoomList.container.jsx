import { Button, Modal, notification } from 'antd';
import { NotificationType } from '../../constants/NotificationConstant';
import {
  WaitingRoomListForIntervieweeComponent,
  WaitingRoomListForInterviewerComponent
} from '../../components/customized-components/WaitingRoomList/WaitingRoomList.component';
import {
  endInterview,
  getScheduleById,
  getWaitingRoomInfo,
  inviteInterviewee,
  kickUser,
  leaveWaitingRoom,
  startInterview,
  swapSchedule,
  visitWaitingRoom
} from '../../services/jobhub-api/InterviewControllerService';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { interviewRoomAction } from '../../redux-flow/interviewRoom/interview-room-slice';
import { fetchInterviewingApplicationData } from '../../redux-flow/interviewRoom/interview-room-action';

export const WaitingRoomListForInterviewerContainer = ({ channelId, scheduleId, agoraUserListRef }) => {
  const rerender = useSelector((state) => state?.interviewRoom?.rerender);
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
      if (scheduleInfo?.waitingRoomId) {
        await mappingTodayScheduleAndWaitingRoomList(
          setIntervieweeList,
          scheduleInfo?.waitingRoomId,
          intervieweeListRef,
          channelId,
          agoraUserListRef
        );
      }
    };

    fetchData();
  }, [scheduleInfo, rerender]);

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
            channelId,
            agoraUserListRef
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
  interviewRoomId,
  agoraUserListRef
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
                interviewRoomId,
                agoraUserListRef
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
    // eslint-disable-next-line no-unused-vars
    const InterviewStatusButton = ({ data, scheduleInfo, channelId, handleInvite }) => {
      const dispatch = useDispatch();

      useEffect(() => {
        if (data?.status && data?.status === 'INTERVIEWING') {
          dispatch(interviewRoomAction.setCurrentInterviewingApplicationId(data?.id));
          dispatch(fetchInterviewingApplicationData({ applicationId: data?.id }));
        }
      }, []);

      const handleEndInterview = async () => {
        try {
          await endInterview(data?.attendantId, data?.interviewRoomId);
          waitingRoomId &&
            (await mappingTodayScheduleAndWaitingRoomList(
              setIntervieweeList,
              waitingRoomId,
              intervieweeListRef,
              interviewRoomId,
              agoraUserListRef
            ));
          dispatch(interviewRoomAction.resetApplicationData());
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
          dispatch(interviewRoomAction.setCurrentInterviewingApplicationId(data?.id));
          dispatch(fetchInterviewingApplicationData({ applicationId: data?.id }));
          waitingRoomId &&
            (await mappingTodayScheduleAndWaitingRoomList(
              setIntervieweeList,
              waitingRoomId,
              intervieweeListRef,
              interviewRoomId,
              agoraUserListRef
            ));
        } catch (e) {
          notification['error']({
            message: `Something went wrong! Try again latter!`,
            description: `There is problem while starting interview, try again later`,
            duration: 2
          });
        }
      };

      if (data?.status === 'DONE')
        return (
          <Button type='primary' shape='round' disabled style={{ background: 'green', color: 'white' }}>
            Done
          </Button>
        );

      if (
        agoraUserListRef?.current?.length &&
        agoraUserListRef.current.length > 0 &&
        agoraUserListRef.current[0].uid !== data?.attendantId
      )
        return null;

      if (
        data?.status !== 'INTERVIEWING' &&
        data?.status !== 'SUBMITTED_REPORT' &&
        agoraUserListRef?.current?.length <= 0
      )
        return (
          <Button
            type='primary'
            shape='round'
            disabled={!data?.inWaitingRoom} //TODO: remove later
            onClick={handleInvite}>
            {!data?.inWaitingRoom ? 'Not in waiting room' : 'invite'}
          </Button>
        );

      switch (data.status) {
        case 'NOT_YET':
          return (
            <Button type='primary' shape='round' onClick={() => handleStartInterview()}>
              Start
            </Button>
          );
        case 'INTERVIEWING':
          return (
            <Button type='primary' shape='round' disabled>
              Is interviewing
            </Button>
          );
        case 'SUBMITTED_REPORT':
          return (
            <Button type='primary' shape='round' onClick={() => handleEndInterview()}>
              End
            </Button>
          );
        case 'FAIL':
          return (
            <Button type='primary' shape='round' disabled style={{ background: 'red', color: 'white' }}>
              Changing
            </Button>
          );
        default:
          return null;
      }
    };

    const handleKickUser = async (channelId, userId) => {
      try {
        await kickUser(userId, channelId);
        notification['success']({
          message: `Kick user successfully`,
          duration: 2
        });
      } catch (e) {
        notification['error']({
          message: `Something went wrong! Try again latter!`,
          description: `There is problem while kicking, try again later`,
          duration: 2
        });
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
          buttonStatus: () => (
            <InterviewStatusButton data={item} handleInvite={() => handleInvite(item.attendantId, item.id)} />
          ),
          handleInvite: () => handleInvite(item.attendantId, item.id),
          kickButton: () =>
            agoraUserListRef?.current?.length &&
            agoraUserListRef.current.length > 0 &&
            agoraUserListRef.current[0].uid === item?.attendantId ? (
              <Button
                onClick={() => {
                  handleKickUser(interviewRoomId, item?.attendantId);
                }}
                shape='round'>
                Remove
              </Button>
            ) : null
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
