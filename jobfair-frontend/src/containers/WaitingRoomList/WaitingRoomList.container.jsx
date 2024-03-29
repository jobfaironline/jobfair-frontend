import { Button, Modal, notification } from 'antd';
import { INTERVIEW_SCHEDULE_STATUS } from '../../constants/InterviewScheduleConst';
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
import { fetchInterviewingApplicationData } from '../../redux-flow/interviewRoom/interview-room-action';
import { generatePath } from 'react-router-dom';
import { interviewRoomAction } from '../../redux-flow/interviewRoom/interview-room-slice';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';

export const WaitingRoomListForInterviewerContainer = ({ channelId, scheduleId, agoraUserListRef }) => {
  const rerender = useSelector((state) => state?.interviewRoom?.rerender);
  const newJoinedUserName = useSelector((state) => state?.interviewRoom?.newJoinedUserName);
  const rerenderUserJoin = useSelector((state) => state?.interviewRoom?.rerenderUserJoin);
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
    if (newJoinedUserName === undefined) return;
    notification['info']({
      message: `${newJoinedUserName} joined`,
      duration: 2
    });
  }, [rerenderUserJoin]);

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
        Modal.confirm({
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

      if (data?.status === 'DONE') {
        return (
          <Button type='primary' shape='round' disabled style={{ background: 'green', color: 'white' }}>
            Done
          </Button>
        );
      }

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
      ) {
        return (
          <Button
            type='primary'
            shape='round'
            disabled={!data?.inWaitingRoom} //TODO: remove later
            onClick={handleInvite}>
            {!data?.inWaitingRoom ? 'Not in waiting room' : 'invite'}
          </Button>
        );
      }

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
              Interviewing
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
          message: `Remove user successfully`,
          duration: 2
        });
      } catch (e) {
        notification['error']({
          message: `Something went wrong! Try again latter!`,
          description: `There is problem while removing, try again later`,
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
  const [userSchedule, setUserSchedule] = useState([]);

  const webSocketClient = useSelector(selectWebSocket);

  const cleanUp = () => {
    leaveWaitingRoom(channelId);
    webSocketClient.removeEvent('get-invitation', getInvitaion);
  };

  useEffect(() => {
    fetchData();
    visitWaitingRoom(channelId);
    webSocketClient.addEvent('get-invitation', getInvitaion);
    window.addEventListener('beforeunload', cleanUp);
    return () => {
      window.removeEventListener('beforeunload', cleanUp);
      cleanUp();
    };
  }, []);

  const fetchData = async () => {
    const { data } = await getWaitingRoomInfo(channelId);
    const result = data
      .filter((schedule) => schedule.status === INTERVIEW_SCHEDULE_STATUS.NOT_YET)
      .sort((a, b) => a.beginTime - b.beginTime);
    setUserSchedule(result);
  };

  const getInvitaion = (notificationData) => {
    if (notificationData.notificationType === NotificationType.INTERVIEW_ROOM) {
      const messageObject = JSON.parse(notificationData.message);

      const key = `open${Date.now()}`;
      const btn = (
        <Button
          type='primary'
          size='small'
          onClick={() => {
            const url = generatePath(`/attendant/interview/${scheduleId}/${messageObject.interviewRoomId}`);
            //use href here rather than history to force unmount page
            window.location.href = url;
            notification.close(key);
          }}>
          Let's go!
        </Button>
      );

      notification.open({
        message: 'New invitation',
        description: 'Start your interview now!',
        btn,
        key,
        duration: 0
      });
    }
  };

  return <WaitingRoomListForIntervieweeComponent userSchedules={userSchedule} />;
};
