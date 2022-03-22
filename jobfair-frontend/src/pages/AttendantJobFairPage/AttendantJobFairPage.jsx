import React, {useEffect, useRef, useState} from 'react'
import RTMClient from '../../services/RTMClient'
import {createClient} from 'agora-rtc-react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {agoraAction} from '../../redux-flow/agora/agora-slice'
import {AttendantJobFairBoothContainer} from '../../containers/AttendantJobFair/AttendantJobFairBooth.container'
import SideBar from './components/SideBar/SideBar.component'
import styles from './AttendantJobFairPage.module.scss'
import {Stats} from "@react-three/drei";
import {ControlTipsModalContainer} from "../../containers/AttendantJobFair/ControlTipsModal.container";
import {GeckoClient} from "../../services/gecko-client/gecko-client";

const config = {
  mode: 'rtc',
  codec: 'vp8'
}

const {REACT_APP_AGORA_APP_ID} = process.env

const useClient = createClient(config)
const rtm = new RTMClient()
rtm.init(REACT_APP_AGORA_APP_ID)
const geckoClient = new GeckoClient();
window.addEventListener("beforeunload", (ev) =>
{
  geckoClient.close();
});



const AttendantJobFairPage = () => {
  console.log("render page")
  const {companyBoothId} = useParams()
  const {userId} = useSelector(state => state.authentication.user)

  //channelId is the booth's id
  const channelId = companyBoothId
  const audioTrackRef = useRef()
  const cameraTrackRef = useRef()
  const geckoClientRef = useRef()
  const dispatch = useDispatch()
  dispatch(agoraAction.setRTMClient(rtm))
  dispatch(agoraAction.setRTCClient(useClient()))
  dispatch(agoraAction.setChannelId(channelId))
  geckoClientRef.current = geckoClient;


  useEffect(() => {
    return () => {
      audioTrackRef.current?.close()
      cameraTrackRef.current?.close()

      const RTCClient = useClient()
      RTCClient.unpublish(audioTrackRef.current)
      RTCClient.unpublish(cameraTrackRef.current)
      RTCClient.leave()
      RTCClient.removeAllListeners()

      rtm.logout()
      rtm.removeAllListeners()
      geckoClientRef.current.close();
    }
  })

  const communicationProps = {
    audioTrackRef,
    cameraTrackRef,
  }

  return (
    <div className={"page"} style={{overflow: "hidden"}}>
      <div className={styles.container}>
        <div className={styles.sideBar}>
          <SideBar/>
        </div>
        <div className={styles.booth}>
          <Stats/>
          <ControlTipsModalContainer/>
          <AttendantJobFairBoothContainer companyBoothId={companyBoothId} geckoClientRef={geckoClientRef}/>

        </div>
          {/*<div>
                <ChatBox {...communicationProps} />
              </div>*/}
      </div>
    </div>
  )
}

export default AttendantJobFairPage
