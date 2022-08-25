import { Card, Form, Typography, notification } from 'antd';
import { CompactResumeDetail } from '../../components/customized-components/CompactResumeDetail/CompactResumeDetail.component';
import { InterviewReportForm } from '../../components/forms/InterviewReportForm/InterviewReportForm.component';
import { NAVBAR_HEIGHT } from '../../styles/custom-theme';
import {
  WaitingRoomListForIntervieweeContainer,
  WaitingRoomListForInterviewerContainer
} from '../WaitingRoomList/WaitingRoomList.container';
import { interviewRoomAction } from '../../redux-flow/interviewRoom/interview-room-slice';
import { submitReport } from '../../services/jobhub-api/InterviewControllerService';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import AgoraRTC from 'agora-rtc-react';
import ChatBoxContainer from '../Agora/ChatBox/ChatBox.container';
import React, { useEffect, useRef, useState } from 'react';
import RoleType from '../../constants/RoleType';
import VideoCallContainer from '../Agora/VideoCall/VideoCall.container';

const CompanyEmployeeInterviewRoomContainer = (props) => {
  const { audioReady, audioTrack, cameraReady, cameraTrack, userListRef, form, handleSubmitReport, roomType } = props;

  const location = useLocation();
  const { scheduleId, roomId: channelId } = useParams();
  const interviewingData = useSelector((state) => state?.interviewRoom?.currentInterviewingApplication);
  const role = useSelector((state) => state.authentication.user.roles);

  const firstColumn = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between'
      }}>
      {roomType.includes('interview') && role === RoleType.COMPANY_EMPLOYEE ? (
        <WaitingRoomListForInterviewerContainer
          channelId={channelId}
          scheduleId={scheduleId}
          agoraUserListRef={userListRef}
        />
      ) : null}
      <Card>
        <ChatBoxContainer type={'INTERVIEW_ROOM'} width={'100%'} />
      </Card>
    </div>
  );

  const secondColumn =
    interviewingData?.applicationData?.interviewStatus &&
    interviewingData.applicationData.interviewStatus === 'INTERVIEWING' ? (
      <div style={{ padding: '1.5rem 0 2rem 1rem', flex: 1 }}>
        <InterviewReportForm
          form={form}
          onFinish={handleSubmitReport}
          applicationData={interviewingData?.applicationData}
        />
      </div>
    ) : (
      <div />
    );

  const thirdColumn = (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '40%' }}>
        <VideoCallContainer
          audioReady={audioReady}
          audioTrack={audioTrack}
          cameraReady={cameraReady}
          cameraTrack={cameraTrack}
          type={'INTERVIEW_ROOM'}
          height={'100%'}
          width={'100%'}
          userListRef={userListRef}
          layoutMode={location.pathname.includes('waiting-room') ? 'WAITINGROOM' : 'INTERVIEWROOM'}
        />
      </div>

      {interviewingData.applicationData !== undefined ? (
        <div style={{ flex: 1 }}>
          <CompactResumeDetail data={interviewingData.applicationData} />
        </div>
      ) : null}
    </div>
  );

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', minHeight: `calc(100vh - ${NAVBAR_HEIGHT}` }}>
      <div style={{ gridColumn: 'span 3', display: 'flex' }}>{firstColumn}</div>
      <div style={{ gridColumn: 'span 4', display: 'flex' }}>{secondColumn}</div>
      <div style={{ gridColumn: 'span 3', display: 'flex' }}>{thirdColumn}</div>
    </div>
  );
};

const AttendantInterviewRoomContainer = (props) => {
  const { audioReady, audioTrack, cameraReady, cameraTrack, userListRef, roomType } = props;
  const location = useLocation();
  const { scheduleId, roomId: channelId } = useParams();

  const secondColumn = (
    <>
      <VideoCallContainer
        audioReady={audioReady}
        audioTrack={audioTrack}
        cameraReady={cameraReady}
        cameraTrack={cameraTrack}
        type={'INTERVIEW_ROOM'}
        height={'87vh'}
        width={'100%'}
        userListRef={userListRef}
        layoutMode={location.pathname.includes('waiting-room') ? 'WAITINGROOM' : 'INTERVIEWROOM'}
      />
    </>
  );
  const firstColumn = (
    <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: '1' }}>
      {roomType.includes('interview') ? (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Typography.Title level={3}>Interview room</Typography.Title>
        </div>
      ) : null}

      {roomType.includes('waiting-room') ? (
        <WaitingRoomListForIntervieweeContainer
          channelId={channelId}
          scheduleId={scheduleId}
          agoraUserListRef={userListRef}
        />
      ) : null}
      <Card>
        <ChatBoxContainer type={'INTERVIEW_ROOM'} width={'100%'} />
      </Card>
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', minHeight: `calc(100vh - ${NAVBAR_HEIGHT}` }}>
      <div style={{ gridColumn: 'span 1', display: 'flex' }}>{firstColumn}</div>
      <div style={{ gridColumn: 'span 3', display: 'flex' }}>{secondColumn}</div>
    </div>
  );
};

const InterviewRoomContainer = (props) => {
  const role = useSelector((state) => state.authentication.user.roles);
  const interviewingData = useSelector((state) => state?.interviewRoom?.currentInterviewingApplication);
  const dispatch = useDispatch();

  const { audioTrackRef, cameraTrackRef, roomType } = props;
  const userListRef = useRef([]);
  const [audioReady, setAudioReady] = useState(false);
  const [audioTrack, setAudioTrack] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraTrack, setCameraTrack] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    AgoraRTC.createMicrophoneAudioTrack().then((track) => {
      audioTrackRef.current = track;
      setAudioTrack(track);
      setAudioReady(true);
    });
    AgoraRTC.createCameraVideoTrack({
      encoderConfig: '120p'
    }).then((track) => {
      cameraTrackRef.current = track;
      setCameraTrack(track);
      setCameraReady(true);
    });
  }, []);

  const handleSubmitReport = async (values) => {
    try {
      await submitReport({
        advantage: values.advantage ?? '',
        disadvantage: values.disadvantage ?? '',
        note: values.note ?? '',
        applicationId: interviewingData.applicationData.id,
        isQualified: values.isQualified ?? false
      });
      notification['success']({
        message: 'Submit report successfully',
        duration: 2
      });
      dispatch(interviewRoomAction.resetCurrentInterviewingApplication());
      dispatch(interviewRoomAction.setRerender());
    } catch (e) {
      notification['error']({
        message: 'Found error when submitting report',
        description: 'Please try again later!',
        duration: 2
      });
    }
  };

  const companyEmployeeInterviewingRoomProps = {
    audioReady,
    audioTrack,
    cameraReady,
    cameraTrack,
    userListRef,
    form,
    handleSubmitReport,
    roomType
  };

  const attendantInterviewingRoomProps = {
    audioReady,
    audioTrack,
    cameraReady,
    cameraTrack,
    userListRef,
    roomType
  };

  if (role === 'COMPANY_EMPLOYEE')
    return <CompanyEmployeeInterviewRoomContainer {...companyEmployeeInterviewingRoomProps} />;

  return <AttendantInterviewRoomContainer {...attendantInterviewingRoomProps} />;
};

export default InterviewRoomContainer;
