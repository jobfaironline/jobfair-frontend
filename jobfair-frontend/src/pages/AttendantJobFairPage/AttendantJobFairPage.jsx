import { AttendantJobFairBoothViewContainer } from '../../containers/3D/JobFairBooth/AttendantJobFairBoothView.container';
import { GeckoClient } from '../../services/gecko-client/gecko-client';
import { agoraAction } from '../../redux-flow/agora/agora-slice';
import { createClient } from 'agora-rtc-react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
const geckoClient = new GeckoClient();
window.addEventListener('beforeunload', () => {
  geckoClient.close();
});

const AttendantJobFairPage = () => {
  const { companyBoothId } = useParams();
  //channelId is the booth's id
  const channelId = companyBoothId;
  const audioTrackRef = useRef();
  const cameraTrackRef = useRef();
  const geckoClientRef = useRef();
  const dispatch = useDispatch();
  dispatch(agoraAction.setRTMClient(rtm));
  dispatch(agoraAction.setRTCClient(useClient()));
  dispatch(agoraAction.setChannelId(channelId));
  geckoClientRef.current = geckoClient;

  useEffect(() => () => {
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
    geckoClientRef.current.close();
  });

  const communicationProps = {
    audioTrackRef,
    cameraTrackRef
  };

  return (
    <div className={'page'} style={{ overflow: 'hidden' }}>
      <AttendantJobFairBoothViewContainer
        companyBoothId={companyBoothId}
        geckoClientRef={geckoClientRef}
        communicationProps={communicationProps}
      />
    </div>
  );
};

export default AttendantJobFairPage;
