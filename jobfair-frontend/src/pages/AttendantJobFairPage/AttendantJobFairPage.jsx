import React, {Fragment, useEffect, useRef} from "react";
import RTMClient from "../../services/RTMClient";
import {createClient} from "agora-rtc-react";
import {useHistory, useParams} from "react-router-dom";
import AttendantJobFairCompanyInformationTabsComponent from "../../components/AttendantJobFair/AttendantJobFairCompanyInformationTabs.component";
import {CommunicationContainer} from "../../containers/AttendantJobFair/CommunicationPanel.container";
import {useDispatch} from "react-redux";
import {agoraAction} from "../../redux-flow/agora/agora-slice";
import {AttendantJobFairBoothContainer} from "../../containers/AttendantJobFair/AttendantJobFairBooth.container";


const config = {
    mode: "rtc", codec: "vp8",
};

const {REACT_APP_AGORA_APP_ID} = process.env

const useClient = createClient(config);
const rtm = new RTMClient();
rtm.init(REACT_APP_AGORA_APP_ID);


const AttendantJobFairPage = () => {

    const {companyBoothId} = useParams();
    //channelId is the booth's id
    const channelId = companyBoothId;
    const history = useHistory();
    const audioTrackRef = useRef();
    const cameraTrackRef = useRef();
    const dispatch = useDispatch();
    dispatch(agoraAction.setRTMClient(rtm));
    dispatch(agoraAction.setRTCClient(useClient()));
    dispatch(agoraAction.setChannelId(channelId));


    useEffect(() => {
        return () => {
            audioTrackRef.current?.close();
            cameraTrackRef.current?.close();

            const RTCClient = useClient();
            RTCClient.unpublish(audioTrackRef.current)
            RTCClient.unpublish(cameraTrackRef.current)
            RTCClient.leave();
            RTCClient.removeAllListeners();

            rtm.logout();
            rtm.removeAllListeners();
        }
    })

    const communicationProps = {
        history,
        audioTrackRef,
        cameraTrackRef,
    }


    return (<Fragment>
        <CommunicationContainer {...communicationProps}/>
        <AttendantJobFairCompanyInformationTabsComponent/>
        <AttendantJobFairBoothContainer companyBoothId={companyBoothId}/>
    </Fragment>);
}

export default AttendantJobFairPage;