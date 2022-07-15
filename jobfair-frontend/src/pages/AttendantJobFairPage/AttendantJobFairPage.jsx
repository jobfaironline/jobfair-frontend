import { AttendantJobFairBoothViewContainer } from '../../containers/3D/JobFairBooth/AttendantJobFairBoothView.container';
import { GeckoClient } from '../../services/gecko-client/gecko-client';
import { agoraAction } from '../../redux-flow/agora/agora-slice';
import { createClient } from 'agora-rtc-react';
import { leaveJobFairBooth, visitJobFairBooth } from '../../services/jobhub-api/VisitControllerService';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PageLayoutWrapper from '../../components/commons/PageLayoutWrapper/PageLayoutWrapper.component';
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

  useEffect(() => cleanUp);

  useEffect(() => {
    visitJobFairBooth(companyBoothId);
    const leaveBooth = () => {
      leaveJobFairBooth(companyBoothId);
      window.removeEventListener(leaveBooth);
    };
    window.addEventListener('beforeunload', leaveBooth);
    return () => {
      leaveJobFairBooth(companyBoothId);
    };
  }, []);

  const cleanUp = async () => {
    audioTrackRef.current?.close();
    cameraTrackRef.current?.close();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const RTCClient = useClient();
    await RTCClient.unpublish(audioTrackRef.current);
    await RTCClient.unpublish(cameraTrackRef.current);
    await RTCClient.leave();
    await RTCClient.removeAllListeners();

    await rtm.leaveChannel(channelId);
    await rtm.logout();
    await rtm.removeAllListeners();
    geckoClientRef.current.close();
  };

  const communicationProps = {
    audioTrackRef,
    cameraTrackRef
  };

  return (
    <PageLayoutWrapper className={'page fullscreen-page'} style={{ overflow: 'hidden' }}>
      <AttendantJobFairBoothViewContainer
        companyBoothId={companyBoothId}
        geckoClientRef={geckoClientRef}
        communicationProps={communicationProps}
      />
    </PageLayoutWrapper>
  );
};

export default AttendantJobFairPage;
