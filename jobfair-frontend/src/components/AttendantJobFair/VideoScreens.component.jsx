import { AgoraVideoPlayer } from 'agora-rtc-react'
import React from 'react'

export const VideoScreens = props => {
  const { muteState, users, cameraTrack, cameraReady } = props
  return (
    <div>
      <div
        id="videos"
        style={{
          height: '8vh',
          margin: 'auto',
          alignSelf: 'flex-start',
          display: 'flex',
          gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
          justifyItems: 'center',
          alignItems: 'center'
        }}
      >
        {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
        {cameraReady && !muteState.video ? (
          <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className="vid" videoTrack={cameraTrack} />
        ) : (
          <div style={{ height: '95%', width: '95%', backgroundColor: 'yellow' }} />
        )}
        {users.length > 0 &&
          users.map(user => {
            if (user.videoTrack) {
              return (
                <AgoraVideoPlayer
                  style={{ height: '95%', width: '95%' }}
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              )
            } else return null
          })}
      </div>
    </div>
  )
}
