import { Card, Form } from 'antd';
import { CompactResumeDetail } from '../../components/customized-components/CompactResumeDetail/CompactResumeDetail.component';
import { InterviewReportForm } from '../../components/forms/InterviewReportForm/InterviewReportForm.component';
import { SideBarComponent } from '../../components/commons/SideBar/SideBar.component';
import {
  WaitingRoomListForIntervieweeContainer,
  WaitingRoomListForInterviewerContainer
} from '../WaitingRoomList/WaitingRoomList.container';
import { getApplicationById } from '../../services/jobhub-api/ApplicationControllerService';
import { submitReport } from '../../services/jobhub-api/InterviewControllerService';
import { useLocation, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-react';
import ChatBoxContainer from '../Agora/ChatBox/ChatBox.container';
import React, { useEffect, useRef, useState } from 'react';
import VideoCallContainer from '../Agora/VideoCall/VideoCall.container';

const InterviewRoomContainer = (props) => {
  const role = useSelector((state) => state.authentication.user.roles);
  const location = useLocation();

  const { scheduleId, roomId: channelId } = useParams();

  const { audioTrackRef, cameraTrackRef, roomType } = props;
  const userListRef = useRef([]);
  const [audioReady, setAudioReady] = useState(false);
  const [audioTrack, setAudioTrack] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraTrack, setCameraTrack] = useState(null);
  const [interviewingData, setInterviewingData] = useState({
    isInterviewing: false,
    applicationData: undefined,
    invitingApplicationId: undefined,
    invitingAttendantId: undefined
  });

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

  useEffect(() => {
    if (interviewingData.isInterviewing) fetchApplicationData();
  }, [interviewingData.isInterviewing]);

  const fetchApplicationData = async () => {
    const response = await getApplicationById(interviewingData.invitingApplicationId);
    const data = response.data;
    setInterviewingData((prevState) => ({ ...prevState, applicationData: data }));
  };

  const handleSubmitReport = (values) => {
    submitReport({
      advantage: values.advantage ?? '',
      disadvantage: values.disadvantage ?? '',
      note: values.note ?? '',
      applicationId: interviewingData.applicationData.id
    });
  };

  if (role === 'COMPANY_EMPLOYEE') {
    return (
      <SideBarComponent
        rightSide={
          <SideBarComponent
            rightSide={
              <>
                <VideoCallContainer
                  audioReady={audioReady}
                  audioTrack={audioTrack}
                  cameraReady={cameraReady}
                  cameraTrack={cameraTrack}
                  type={'INTERVIEW_ROOM'}
                  height={'40%'}
                  width={'100%'}
                  userListRef={userListRef}
                  layoutMode={location.pathname.includes('waiting-room') ? 'WAITINGROOM' : 'INTERVIEWROOM'}
                  setInterviewingData={setInterviewingData}
                />
                {interviewingData.isInterviewing && interviewingData.applicationData !== undefined ? (
                  <div>
                    <CompactResumeDetail data={interviewingData.applicationData} />
                  </div>
                ) : null}
              </>
            }
            leftSide={
              interviewingData.isInterviewing ? (
                <div style={{ padding: '2rem' }}>
                  <InterviewReportForm form={form} onFinish={handleSubmitReport} />
                </div>
              ) : (
                <div />
              )
            }
            ratio={3 / 5}
            isOrganizeJobFair={false}
          />
        }
        leftSide={
          <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: '1' }}>
            {/* TODO: dynamic this based on role */}
            {roomType.includes('waiting-room') ? (
              <WaitingRoomListForIntervieweeContainer
                channelId={channelId}
                scheduleId={scheduleId}
                agoraUserListRef={userListRef}
              />
            ) : null}
            {roomType.includes('interview') && role === 'COMPANY_EMPLOYEE' ? (
              <WaitingRoomListForInterviewerContainer
                channelId={channelId}
                scheduleId={scheduleId}
                setInterviewingData={setInterviewingData}
              />
            ) : null}
            <Card>
              <ChatBoxContainer type={'INTERVIEW_ROOM'} />
            </Card>
          </div>
        }
        ratio={2 / 7}
        isOrganizeJobFair={false}
      />
    );
  }

  return (
    <SideBarComponent
      rightSide={
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
      }
      leftSide={
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', flex: '1' }}>
          {/* TODO: dynamic this based on role */}
          {roomType.includes('waiting-room') ? (
            <WaitingRoomListForIntervieweeContainer
              channelId={channelId}
              scheduleId={scheduleId}
              agoraUserListRef={userListRef}
            />
          ) : null}
          {roomType.includes('interview') && role === 'COMPANY_EMPLOYEE' ? (
            <WaitingRoomListForInterviewerContainer channelId={channelId} scheduleId={scheduleId} />
          ) : null}
          <Card>
            <ChatBoxContainer type={'INTERVIEW_ROOM'} />
          </Card>
        </div>
      }
      ratio={1 / 4.5}
      isOrganizeJobFair={false}
    />
  );
};

export default InterviewRoomContainer;
