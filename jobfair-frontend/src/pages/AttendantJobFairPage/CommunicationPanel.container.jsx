import AgoraRTC, {AgoraVideoPlayer} from "agora-rtc-react";
import React, {Fragment, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getAgoraRTCToken, getAgoraRTMToken} from "../../services/agoraTokenService";
import {Button, Form, Input} from "antd";

const { REACT_APP_AGORA_APP_ID } = process.env

export const Controls = (props) => {
    const {setMuteState, muteState, audioTrack, cameraTrack} = props;

    const mute = async (type) => {
        if (type === "audio") {
            await audioTrack.setMuted(!muteState.audio);
            setMuteState((ps) => {
                return {...ps, audio: !ps.audio};
            });
        } else if (type === "video") {
            await cameraTrack.setMuted(!muteState.video);
            setMuteState((ps) => {
                return {...ps, video: !ps.video};
            });
        }
    };

    return (
        <div>
            {audioTrack ? <p className={muteState.audio ? "on" : ""}
                             onClick={() => mute("audio")}>
                {!muteState.audio ? "MuteAudio" : "UnmuteAudio"}
            </p> : <p>Audio not found</p>}


            {cameraTrack ? <p className={muteState.video ? "on" : ""}
                              onClick={() => mute("video")}>
                {!muteState.video ? "MuteVideo" : "UnmuteVideo"}
            </p> : <p>Camera not found</p>}


        </div>
    );
};

const Videos = (props) => {
    const {
        muteState,
        users,
        cameraTrack,
        cameraReady,
    } = props;
    return (
        <div>
            <div id="videos" style={{
                height: "60vh",
                margin: "auto",
                alignSelf: "flex-start",
                display: "flex",
                gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
                justifyItems: "center",
                alignItems: "center",
            }}>
                {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
                {(cameraReady && !muteState.video) ?
                    <AgoraVideoPlayer style={{height: '95%', width: '95%'}} className='vid' videoTrack={cameraTrack}/> :
                    <div style={{height: '95%', width: '95%', backgroundColor: "yellow"}}/>}
                {users.length > 0 &&
                users.map((user) => {
                    if (user.videoTrack) {
                        return (
                            <AgoraVideoPlayer style={{height: '95%', width: '95%'}} className='vid'
                                              videoTrack={user.videoTrack} key={user.uid}/>
                        );
                    } else return null;
                })}
            </div>
        </div>
    );
};

function VideoCallComponent(props) {


    const {audioReady, audioTrack, cameraReady, cameraTrack} = props;

    const [isRTCClientReady, setIsRTCClientReady] = useState(false);
    const [users, setUsers] = useState([]);
    const [muteState, setMuteState] = useState({video: false, audio: false});
    const userId = useSelector(state => state.authentication.user.userId);


    async function initializeRTCClient(rtcClient, rtcToken, userId) {
        rtcClient.on("user-published", async (user, mediaType) => {
            await rtcClient.subscribe(user, mediaType);
            console.log("subscribe success");
            if (mediaType === "video") {
                setUsers((prevUsers) => {
                    return [...prevUsers, user];
                });
            }
            if (mediaType === "audio") {
                user.audioTrack?.play();
            }
        });

        rtcClient.on("user-unpublished", (user, type) => {
            console.log("unpublished", user, type);
            if (type === "audio") {
                user.audioTrack?.stop();
            }
            if (type === "video") {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            }
        });

        rtcClient.on("user-left", (user) => {
            console.log("leaving", user);
            setUsers((prevUsers) => {
                return prevUsers.filter((User) => User.uid !== user.uid);
            });
        });

        await rtcClient.join(REACT_APP_AGORA_APP_ID, channelId, rtcToken, userId);
    }

    const rtcClient = useSelector(state => state.agora.rtcClient);
    const channelId = useSelector(state => state.agora.channelId);
    useEffect(async () => {
        const rtcToken = await getAgoraRTCToken(channelId).then(value => value.data).then(value => value.token);
        await initializeRTCClient(rtcClient, rtcToken, userId);
        setIsRTCClientReady(true);
    }, [rtcClient, channelId])

    useEffect(async () => {
        if (isRTCClientReady && audioReady && audioTrack) await rtcClient.publish(audioTrack);
        if (isRTCClientReady && cameraReady && cameraTrack) {
            await rtcClient.publish(cameraTrack);
        }
    }, [cameraReady, audioReady, isRTCClientReady, rtcClient]);

    const videoProps = {
        muteState,
        users,
        cameraTrack,
        cameraReady,
    }

    const controlProps = {
        setMuteState,
        muteState,
        audioTrack,
        cameraTrack
    }

    return (
        <Fragment>
            <Videos {...videoProps}/>
            <Controls {...controlProps}/>
        </Fragment>
    );
}

class Message {
    constructor(accountName, content, isMyMessage) {
        this.accountName = accountName;
        this.content = content;
        this.isMyMessage = isMyMessage;
    }
}

function MessageForm(props) {
    const rtm = useSelector(state => state.agora.rtmClient);
    const userId = useSelector(state => state.authentication.user.userId);
    const channelId = useSelector(state => state.agora.channelId);
    const {setMessageList, isChatReady} = props;

    const [form] = Form.useForm();
    const onFinish = (values) => {
        rtm.sendChannelMessage(values.message, channelId);

        setMessageList(prevState => {
            return [...prevState, new Message(userId, values.message, true)]
        })
        form.resetFields();

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            form={form}

            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Message"
                name="message"
                rules={[
                    {
                        required: true,
                        message: 'Please input your message!',
                    },
                ]}
            >
                <Input autoFocus/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" disabled={!isChatReady}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

function ChatFeedComponent(props) {
    const {messageList} = props;
    return (
        <div>
            {messageList.map(message => {
                if (message.isMyMessage) {
                    return <div style={{display: "flex"}}>
                        <div style={{marginLeft: "auto"}}>Sender: {message.accountName} - Text: {message.content}</div>
                    </div>;
                } else {
                    return <div>Sender: {message.accountName} - Text: {message.content}</div>;
                }
            })}
        </div>
    );
}

function MessageChatComponent(props) {
    const rtm = useSelector(state => state.agora.rtmClient);
    const userId = useSelector(state => state.authentication.user.userId);
    const channelId = useSelector(state => state.agora.channelId);
    const [messageList, setMessageList] = useState([]);
    const [isChatReady, setIsChatReady] = useState(false);

    async function initializeRtmClient(rtmClient, rtmToken, userId) {
        rtmClient.on('ConnectionStateChanged', (newState, reason) => {
            console.log('reason', reason)
        });
        rtmClient.on('MessageFromPeer', async (message, peerId) => {
            if (message.messageType === 'IMAGE') {
                const blob = await rtm.client.downloadMedia(message.mediaId)
                /*blobToImage(blob, (image) => {
                })*/
            } else {
                console.log('message ' + message.text + ' peerId' + peerId)
            }
        });
        rtmClient.on('MemberJoined', ({channelName, args}) => {
            const memberId = args[0]
            console.log('channel ', channelName, ' member: ', memberId, ' joined')
        });
        rtmClient.on('MemberLeft', ({channelName, args}) => {
            const memberId = args[0]
            console.log('channel ', channelName, ' member: ', memberId, ' joined')
        });
        rtmClient.on('ChannelMessage', async ({channelName, args}) => {
            const [message, memberId] = args
            if (message.messageType === 'IMAGE') {
                const blob = await rtmClient.client.downloadMedia(message.mediaId)
                /*blobToImage(blob, (image) => {
                })*/
            } else {
                console.log('channel ', channelName, ', messsage: ', message.text, ', memberId: ', memberId)
                setMessageList(prevState => {
                    return [...prevState, new Message(memberId, message.text, false)];
                });
            }
        });
        await rtmClient.login(userId, rtmToken)
        await rtmClient.joinChannel(channelId);
    }

    useEffect(async () => {
        console.log("initializeRtmClient")
        const rtmToken = await getAgoraRTMToken().then(value => value.data).then(value => value.token);
        await initializeRtmClient(rtm, rtmToken, userId);
        setIsChatReady(true);
    }, [rtm])


    const chatFeedProps = {
        messageList
    }
    const formProps = {
        setMessageList,
        isChatReady,
    }

    return (
        <Fragment>
            <ChatFeedComponent {...chatFeedProps}/>
            <MessageForm {...formProps}/>
        </Fragment>
    )
}

export const CommunicationContainer = (props) => {
    const { history, audioTrackRef, cameraTrackRef } = props;

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
    },[])


    const videoProps = {audioReady, audioTrack, cameraReady, cameraTrack}

    return (
        <Fragment>
            <MessageChatComponent/>
            <VideoCallComponent {...videoProps}/>
            {<p onClick={async () => {
                history.goBack();
            }}>Leave</p>}
        </Fragment>
    )
}
