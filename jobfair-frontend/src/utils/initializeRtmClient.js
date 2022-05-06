class Message {
  constructor(accountName, content, isMyMessage) {
    this.accountName = accountName;
    this.content = content;
    this.isMyMessage = isMyMessage;
  }
}

export async function initializeRtmClient(channelId, setMessageList, rtmClient, rtmToken, userId) {
  rtmClient.on('ConnectionStateChanged', (newState, reason) => {
    // eslint-disable-next-line no-console
    console.log('reason', reason);
  });
  rtmClient.on('MessageFromPeer', async (message, peerId) => {
    if (message.messageType === 'IMAGE') {
      // eslint-disable-next-line no-unused-vars
      const blob = await rtmClient.client.downloadMedia(message.mediaId);
      /*blobToImage(blob, (image) => {
              })*/
      // eslint-disable-next-line no-console
    } else console.log(`message ${message.text} peerId${peerId}`);
  });
  rtmClient.on('MemberJoined', ({ channelName, args }) => {
    const memberId = args[0];
    // eslint-disable-next-line no-console
    console.log('channel ', channelName, ' member: ', memberId, ' joined');
  });
  rtmClient.on('MemberLeft', ({ channelName, args }) => {
    const memberId = args[0];
    // eslint-disable-next-line no-console
    console.log('channel ', channelName, ' member: ', memberId, ' joined');
  });
  rtmClient.on('ChannelMessage', async ({ channelName, args }) => {
    const [message, memberId] = args;
    if (message.messageType === 'IMAGE') {
      // eslint-disable-next-line no-unused-vars
      const blob = await rtmClient.client.downloadMedia(message.mediaId);
      /*blobToImage(blob, (image) => {
              })*/
    } else {
      // eslint-disable-next-line no-console
      console.log('channel ', channelName, ', messsage: ', message.text, ', memberId: ', memberId);
      setMessageList((prevState) => [...prevState, new Message(memberId, message.text, false)]);
    }
  });
  await rtmClient.login(userId, rtmToken);
  await rtmClient.joinChannel(channelId);
}
