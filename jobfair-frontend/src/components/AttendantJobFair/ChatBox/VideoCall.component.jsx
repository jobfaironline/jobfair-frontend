import { Tag } from 'antd'
import { MailOutlined } from '@ant-design/icons'

import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { AgoraVideoPlayer } from 'agora-rtc-react'

import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import PowerOffIcon from '@mui/icons-material/PowerOff'
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import VideocamIcon from '@mui/icons-material/Videocam'
import NoPhotographyIcon from '@mui/icons-material/NoPhotography'

import styles from './VideoCall.module.scss'
import { getAgoraRTCToken } from '../../../services/agora-token-controller/AgoraTokenControllerService'

const { REACT_APP_AGORA_APP_ID } = process.env
const VideoCall = props => {
  const { audioReady, audioTrack, cameraReady, cameraTrack } = props
  const [isRTCClientReady, setIsRTCClientReady] = useState(false)
  const [users, setUsers] = useState([])
  const [muteState, setMuteState] = useState({ video: false, audio: false })
  const userId = useSelector(state => state.authentication.user.userId)

  async function initializeRTCClient(rtcClient, rtcToken, userId) {
    rtcClient.on('user-published', async (user, mediaType) => {
      await rtcClient.subscribe(user, mediaType)
      console.log('subscribe success')
      if (mediaType === 'video') {
        setUsers(prevUsers => {
          return [...prevUsers, user]
        })
      }
      if (mediaType === 'audio') {
        user.audioTrack?.play()
      }
    })

    rtcClient.on('user-unpublished', (user, type) => {
      console.log('unpublished', user, type)
      if (type === 'audio') {
        user.audioTrack?.stop()
      }
      if (type === 'video') {
        setUsers(prevUsers => {
          return prevUsers.filter(User => User.uid !== user.uid)
        })
      }
    })

    rtcClient.on('user-left', user => {
      console.log('leaving', user)
      setUsers(prevUsers => {
        return prevUsers.filter(User => User.uid !== user.uid)
      })
    })

    await rtcClient.join(REACT_APP_AGORA_APP_ID, channelId, rtcToken, userId)
  }

  const rtcClient = useSelector(state => state.agora.rtcClient)
  const channelId = useSelector(state => state.agora.channelId)
  useEffect(async () => {
    const rtcToken = await getAgoraRTCToken(channelId)
      .then(value => value.data)
      .then(value => value.token)
    await initializeRTCClient(rtcClient, rtcToken, userId)
    setIsRTCClientReady(true)
  }, [])

  useEffect(async () => {
    if (isRTCClientReady && audioReady && audioTrack) await rtcClient.publish(audioTrack)
    if (isRTCClientReady && cameraReady && cameraTrack) {
      await rtcClient.publish(cameraTrack)
    }
  }, [cameraReady, audioReady, isRTCClientReady])

  const handleMute = async type => {
    if (type === 'audio') {
      await audioTrack.setMuted(!muteState.audio)
      setMuteState(ps => {
        return { ...ps, audio: !ps.audio }
      })
    } else if (type === 'video') {
      await cameraTrack.setMuted(!muteState.video)
      setMuteState(ps => {
        return { ...ps, video: !ps.video }
      })
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.topVideoCall}>
        <div className={styles.iconMail}>
          <Tag color="default">
            <MailOutlined /> 90
          </Tag>
        </div>
        <div className={styles.videoCall}>
          {cameraReady && !muteState.video ? (
            <AgoraVideoPlayer style={{ height: '95%', width: '95%' }} className="vid" videoTrack={cameraTrack} />
          ) : (
            <div style={{ height: '95%', width: '95%', backgroundColor: 'yellow' }} />
          )}
        </div>
      </div>
      <div className={styles.mainVideo}>
        {users.length > 0 ? (
          <div style={{ height: '100%' }}>
            {users.length > 0 &&
              users.map(user => {
                if (user.videoTrack) {
                  return (
                    <AgoraVideoPlayer
                      style={{ height: '100%', width: '100%' }}
                      className="vid"
                      videoTrack={user.videoTrack}
                      key={user.uid}
                    />
                  )
                } else return null
              })}
          </div>
        ) : (
          <img
            src="https://i.ytimg.com/vi/w6geNk3QnBQ/maxresdefault.jpg"
            alt="Girl in a jacket"
            width="100%"
            height="100%"
          />
        )}
        <div className={styles.videoIcon}>
          {audioTrack ? (
            <div className={muteState.audio ? 'on' : ''} onClick={() => handleMute('audio')}>
              {!muteState.audio ? <MicIcon /> : <MicOffIcon />}
            </div>
          ) : (
            <PowerOffIcon />
          )}
          {cameraTrack ? (
            <div className={muteState.video ? 'on' : ''} onClick={() => handleMute('video')}>
              {!muteState.video ? <VideocamIcon /> : <VideocamOffIcon />}
            </div>
          ) : (
            <NoPhotographyIcon />
          )}
        </div>
      </div>
    </div>
  )
}
export default VideoCall
