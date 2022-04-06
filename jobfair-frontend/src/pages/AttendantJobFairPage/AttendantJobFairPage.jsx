import React, { useEffect, useRef } from 'react'
import RTMClient from '../../services/RTMClient'
import { createClient } from 'agora-rtc-react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { agoraAction } from '../../redux-flow/agora/agora-slice'
import { AttendantJobFairContainer } from '../../containers/AttendantJobFair/AttendantJobFair.container'
import { GeckoClient } from '../../services/gecko-client/gecko-client'

const config = {
  mode: 'rtc',
  codec: 'vp8'
}

const { REACT_APP_AGORA_APP_ID } = process.env

const useClient = createClient(config)
const rtm = new RTMClient()
rtm.init(REACT_APP_AGORA_APP_ID)
const geckoClient = new GeckoClient()
window.addEventListener('beforeunload', () => {
  geckoClient.close()
})

const AttendantJobFairPage = () => {
  const { companyBoothId } = useParams()
  //channelId is the booth's id
  const channelId = companyBoothId
  const audioTrackRef = useRef()
  const cameraTrackRef = useRef()
  const geckoClientRef = useRef()
  const dispatch = useDispatch()
  dispatch(agoraAction.setRTMClient(rtm))
  dispatch(agoraAction.setRTCClient(useClient()))
  dispatch(agoraAction.setChannelId(channelId))
  geckoClientRef.current = geckoClient

  useEffect(() => {
    return () => {
      audioTrackRef.current?.close()
      cameraTrackRef.current?.close()

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const RTCClient = useClient()
      RTCClient.unpublish(audioTrackRef.current)
      RTCClient.unpublish(cameraTrackRef.current)
      RTCClient.leave()
      RTCClient.removeAllListeners()

      rtm.logout()
      rtm.removeAllListeners()
      geckoClientRef.current.close()
    }
  })

  const communicationProps = {
    audioTrackRef,
    cameraTrackRef
  }

  return (
    <div className={'page'} style={{ overflow: 'hidden' }}>
      <AttendantJobFairContainer
        companyBoothId={companyBoothId}
        geckoClientRef={geckoClientRef}
        communicationProps={communicationProps}
      />
    </div>
  )
}

export default AttendantJobFairPage
