import { agoraAction } from '../../redux-flow/agora/agora-slice';
import { createClient } from 'agora-rtc-react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import InterviewRoomContainer from '../../containers/InterviewRoom/InterviewRoom.container';
import RTMClient from '../../services/agora/RTMClient';
import React, { useEffect, useRef } from 'react';

const config = {
  mode: 'rtc',
  codec: 'vp8'
};

const { REACT_APP_AGORA_APP_ID } = process.env;

const useClient = createClient(config);
const rtm = new RTMClient();
rtm.init(REACT_APP_AGORA_APP_ID);

const InterviewRoomPage = () => {
  const { roomId } = useParams();
  //channelId is the booth's id
  const channelId = roomId;
  const audioTrackRef = useRef();
  const cameraTrackRef = useRef();
  const dispatch = useDispatch();
  dispatch(agoraAction.setRTMClient(rtm));
  dispatch(agoraAction.setRTCClient(useClient()));
  dispatch(agoraAction.setChannelId(channelId));

  useEffect(() => initializeRoomChat(), []);

  const initializeRoomChat = () => {
    //close all audio and camera tracks
    audioTrackRef.current?.close();
    cameraTrackRef.current?.close();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const RTCClient = useClient();
    RTCClient.unpublish(audioTrackRef.current);
    RTCClient.unpublish(cameraTrackRef.current);
    RTCClient.leave();
    RTCClient.removeAllListeners();

    rtm.logout();
    rtm.removeAllListeners();
  };

  const communicationProps = {
    audioTrackRef,
    cameraTrackRef
  };
  return (
    <div className='page'>
      <InterviewRoomContainer communicationProps={communicationProps} />
    </div>
  );
};

export default InterviewRoomPage;
