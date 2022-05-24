import { agoraAction } from '../../redux-flow/agora/agora-slice';
import { createClient } from 'agora-rtc-react';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
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
  const location = useLocation();
  const { roomId } = useParams();
  //channelId is the booth's id
  const channelId = roomId;
  const audioTrackRef = useRef();
  const cameraTrackRef = useRef();
  const dispatch = useDispatch();
  dispatch(agoraAction.setRTMClient(rtm));
  dispatch(agoraAction.setRTCClient(useClient()));
  dispatch(agoraAction.setChannelId(channelId));
  const webSocketClient = useSelector(selectWebSocket);

  useEffect(() => cleanUp, []);

  const cleanUp = () => {
    webSocketClient.removeEvent('is-kick');
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

  return (
    <div className='page' style={{ padding: 0 }}>
      <InterviewRoomContainer
        audioTrackRef={audioTrackRef}
        cameraTrackRef={cameraTrackRef}
        roomType={location.pathname}
        channelId={channelId}
      />
    </div>
  );
};

export default InterviewRoomPage;
