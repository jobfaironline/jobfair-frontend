import React from "react";

export const VideoControl = (props) => {
  const {handleMute, muteState, audioTrack, cameraTrack} = props;
  return (
    <div>
      {audioTrack ? <p className={muteState.audio ? "on" : ""}
                       onClick={() => handleMute("audio")}>
        {!muteState.audio ? "MuteAudio" : "UnmuteAudio"}
      </p> : <p>Audio not found</p>}


      {cameraTrack ? <p className={muteState.video ? "on" : ""}
                        onClick={() => handleMute("video")}>
        {!muteState.video ? "MuteVideo" : "UnmuteVideo"}
      </p> : <p>Camera not found</p>}


    </div>
  );
};