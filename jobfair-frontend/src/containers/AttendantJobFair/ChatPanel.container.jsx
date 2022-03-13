import { useSelector } from 'react-redux'
import { Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { getAgoraRTMToken } from '../../services/agora-token-controller/AgoraTokenControllerService'
import { ChatFeed } from '../../components/AttendantJobFair/ChatFeed.component'
import { ChatForm } from '../../components/AttendantJobFair/ChatForm.component'

class Message {
  constructor(accountName, content, isMyMessage) {
    this.accountName = accountName
    this.content = content
    this.isMyMessage = isMyMessage
  }
}

export const ChatPanelContainer = props => {
  const rtm = useSelector(state => state.agora.rtmClient)
  const userId = useSelector(state => state.authentication.user.userId)
  const channelId = useSelector(state => state.agora.channelId)
  const [messageList, setMessageList] = useState([])
  const [isChatReady, setIsChatReady] = useState(false)

  async function initializeRtmClient(rtmClient, rtmToken, userId) {
    rtmClient.on('ConnectionStateChanged', (newState, reason) => {
      console.log('reason', reason)
    })
    rtmClient.on('MessageFromPeer', async (message, peerId) => {
      if (message.messageType === 'IMAGE') {
        const blob = await rtm.client.downloadMedia(message.mediaId)
        /*blobToImage(blob, (image) => {
                })*/
      } else {
        console.log('message ' + message.text + ' peerId' + peerId)
      }
    })
    rtmClient.on('MemberJoined', ({ channelName, args }) => {
      const memberId = args[0]
      console.log('channel ', channelName, ' member: ', memberId, ' joined')
    })
    rtmClient.on('MemberLeft', ({ channelName, args }) => {
      const memberId = args[0]
      console.log('channel ', channelName, ' member: ', memberId, ' joined')
    })
    rtmClient.on('ChannelMessage', async ({ channelName, args }) => {
      const [message, memberId] = args
      if (message.messageType === 'IMAGE') {
        const blob = await rtmClient.client.downloadMedia(message.mediaId)
        /*blobToImage(blob, (image) => {
                })*/
      } else {
        console.log('channel ', channelName, ', messsage: ', message.text, ', memberId: ', memberId)
        setMessageList(prevState => {
          return [...prevState, new Message(memberId, message.text, false)]
        })
      }
    })
    await rtmClient.login(userId, rtmToken)
    await rtmClient.joinChannel(channelId)
  }

  useEffect(async () => {
    console.log('initializeRtmClient')
    const rtmToken = await getAgoraRTMToken()
      .then(value => value.data)
      .then(value => value.token)
    await initializeRtmClient(rtm, rtmToken, userId)
    setIsChatReady(true)
  }, [])

  const [form] = Form.useForm()
  const onSubmit = values => {
    rtm.sendChannelMessage(values.message, channelId)

    setMessageList(prevState => {
      return [...prevState, new Message(userId, values.message, true)]
    })
    form.resetFields()
  }

  const chatFeedProps = {
    messageList
  }
  const formProps = {
    isChatReady,
    form,
    onSubmit
  }

  return (
    <Fragment>
      <ChatFeed {...chatFeedProps} />
      <ChatForm {...formProps} />
    </Fragment>
  )
}
