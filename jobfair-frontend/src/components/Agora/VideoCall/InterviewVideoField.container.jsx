import { getAgoraRTCToken } from '../../../services/jobhub-api/AgoraTokenControllerService';
import { useSelector } from 'react-redux';
import AgoraRTC from 'agora-rtc-react';
import InterviewVideoFieldComponent from './InterviewVideoField.component';
import React, { useEffect, useState } from 'react';

const { REACT_APP_AGORA_APP_ID } = process.env;

const InterviewVideoFieldContainer = ({ audioTrackRef, cameraTrackRef }) => {
  const [audioReady, setAudioReady] = useState(false);
  const [audioTrack, setAudioTrack] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraTrack, setCameraTrack] = useState(null);
  const [isRTCClientReady, setIsRTCClientReady] = useState(false);
  const [users, setUsers] = useState([]);
  const [muteState, setMuteState] = useState({ video: false, audio: false });
  const userId = useSelector((state) => state.authentication.user.userId);

  async function initializeRTCClient(rtcClient, rtcToken, userId) {
    rtcClient.on('user-published', async (user, mediaType) => {
      await rtcClient.subscribe(user, mediaType);
      // eslint-disable-next-line no-console
      console.log('subscribe success');
      if (mediaType === 'video') setUsers((prevUsers) => [...prevUsers, user]);

      if (mediaType === 'audio') user.audioTrack?.play();
    });

    rtcClient.on('user-unpublished', (user, type) => {
      // eslint-disable-next-line no-console
      console.log('unpublished', user, type);
      if (type === 'audio') user.audioTrack?.stop();

      if (type === 'video') setUsers((prevUsers) => prevUsers.filter((User) => User.uid !== user.uid));
    });

    rtcClient.on('user-left', (user) => {
      // eslint-disable-next-line no-console
      console.log('leaving', user);
      setUsers((prevUsers) => prevUsers.filter((User) => User.uid !== user.uid));
    });

    await rtcClient.join(REACT_APP_AGORA_APP_ID, channelId, rtcToken, userId);
  }

  const rtcClient = useSelector((state) => state.agora.rtcClient);
  const channelId = useSelector((state) => state.agora.channelId);
  useEffect(async () => {
    const rtcToken = await getAgoraRTCToken(channelId)
      .then((value) => value.data)
      .then((value) => value.token);
    await initializeRTCClient(rtcClient, rtcToken, userId);
    setIsRTCClientReady(true);
  }, []);

  useEffect(async () => {
    if (isRTCClientReady && audioReady && audioTrack) await rtcClient.publish(audioTrack);
    if (isRTCClientReady && cameraReady && cameraTrack) await rtcClient.publish(cameraTrack);
  }, [cameraReady, audioReady, isRTCClientReady]);

  useEffect(() => {
    AgoraRTC.createMicrophoneAudioTrack().then((track) => {
      audioTrackRef.current = track;
      setAudioTrack(track);
      setAudioReady(true);
    });
    AgoraRTC.createCameraVideoTrack().then((track) => {
      cameraTrackRef.current = track;
      setCameraTrack(track);
      setCameraReady(true);
    });
  }, []);

  const handleMute = async (type) => {
    if (type === 'audio') {
      await audioTrack.setMuted(!muteState.audio);
      setMuteState((ps) => ({ ...ps, audio: !ps.audio }));
    } else if (type === 'video') {
      await cameraTrack.setMuted(!muteState.video);
      setMuteState((ps) => ({ ...ps, video: !ps.video }));
    }
  };

  return (
    <InterviewVideoFieldComponent
      cameraReady={cameraReady}
      muteState={muteState}
      users={users}
      audioTrack={audioTrack}
      cameraTrack={audioTrack}
      handleMute={handleMute}
    />
  );
};

export default InterviewVideoFieldContainer;
