import AgoraRTC from "agora-rtc-react";
import React, {Fragment, useEffect, useState} from "react";
import {VideoPanelContainer} from "./VideoPanel.container";
import {ChatPanelContainer} from "./ChatPanel.container";
import {useHistory} from "react-router-dom";

export const CommunicationContainer = (props) => {
    const history = useHistory();
    const {audioTrackRef, cameraTrackRef} = props;

    const [audioReady, setAudioReady] = useState(false);
    const [audioTrack, setAudioTrack] = useState(null);
    const [cameraReady, setCameraReady] = useState(false);
    const [cameraTrack, setCameraTrack] = useState(null);

    useEffect(() => {
        AgoraRTC.createMicrophoneAudioTrack().then(track => {
            audioTrackRef.current = track;
            setAudioTrack(track);
            setAudioReady(true);
        })
        AgoraRTC.createCameraVideoTrack().then(track => {
            cameraTrackRef.current = track;
            setCameraTrack(track)
            setCameraReady(true);
        })
    }, [])


    const videoProps = {audioReady, audioTrack, cameraReady, cameraTrack}

    return (
        <Fragment>
            <ChatPanelContainer/>
            <VideoPanelContainer {...videoProps}/>
            {<p onClick={async () => {
                history.goBack();
            }}>Leave</p>}
        </Fragment>
    )
}
