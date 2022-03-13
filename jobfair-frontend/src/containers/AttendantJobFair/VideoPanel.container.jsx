import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAgoraRTCToken } from '../../services/agora-token-controller/AgoraTokenControllerService'
import { VideoScreens } from '../../components/AttendantJobFair/VideoScreens.component'
import { VideoControl } from '../../components/AttendantJobFair/VideoControl.component'

const { REACT_APP_AGORA_APP_ID } = process.env

export const VideoPanelContainer = props => {
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

  const videoProps = {
    muteState,
    users,
    cameraTrack,
    cameraReady
  }

  const controlProps = {
    muteState,
    audioTrack,
    cameraTrack,
    handleMute
  }

  return (
    <Fragment>
      <VideoScreens {...videoProps} />
      <VideoControl {...controlProps} />
    </Fragment>
  )
}
