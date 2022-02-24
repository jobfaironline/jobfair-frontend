import {Button, Form, Input, Tabs} from "antd";
import React, {Fragment, useEffect, useState} from "react";
import RTMClient from "./rtm_client";
import {
    AgoraVideoPlayer,
    createCameraVideoTrack,
    createClient,
    createMicrophoneAndCameraTracks,
    createMicrophoneAudioTrack
} from "agora-rtc-react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, Stage} from "@react-three/drei";
import {ChildMesh} from "../JobFairPackPage/components/model/Final_booth_model";
import {useSelector} from "react-redux";
import {getAgoraRTCToken, getAgoraRTMToken} from "../../services/agoraTokenService";
import {useHistory} from "react-router-dom";
import {loadModel} from "../../utils/model_loader";


const {TabPane} = Tabs;
const config = {
    mode: "rtc", codec: "vp8",
};
//the appid should belong to .env
const appId = "c99b02ecc0b940fe90959c6490af4d06";
const useClient = createClient(config);

//const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
const useMicrophoneTrack = createMicrophoneAudioTrack();
const useCameraTrack = createCameraVideoTrack();
//the rtm should be initialize at loading and store in redux
const rtm = new RTMClient();
rtm.init(appId);
//channelId is the booth's id
const channelId = "1234";




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
            </p> : <p>Audio not found</p> }


            {cameraTrack ? <p className={muteState.video ? "on" : ""}
                              onClick={() => mute("video")}>
                {!muteState.video ? "MuteVideo" : "UnmuteVideo"}
            </p> : <p>Camera not found</p> }


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
    if (!cameraReady) return null;
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
                {!muteState.video ?
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

        await rtcClient.join(appId, channelId, rtcToken, userId);
    }

    useEffect(async () => {
        const rtcToken = await getAgoraRTCToken(channelId).then(value => value.data).then(value => value.token);
        const rtcClient = useClient();
        await initializeRTCClient(rtcClient, rtcToken, userId);
        setIsRTCClientReady(true);
    }, [])

    useEffect(async () => {
        const rtcClient = useClient();
        if (isRTCClientReady && audioReady && audioTrack) await rtcClient.publish(audioTrack);
        if (isRTCClientReady && cameraReady && cameraTrack) {
            await rtcClient.publish(cameraTrack);
        }
    }, [cameraReady, audioReady, cameraTrack, audioTrack, isRTCClientReady]);





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
    const userId = useSelector(state => state.authentication.user.userId);
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
    const userId = useSelector(state => state.authentication.user.userId);
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
        const rtmToken = await getAgoraRTMToken().then(value => value.data).then(value => value.token);
        await initializeRtmClient(rtm, rtmToken, userId);
        setIsChatReady(true);
    }, [])


    const chatFeedProps = {
        messageList
    }
    const formProps = {
        setMessageList,
        isChatReady
    }

    return (
        <Fragment>
            <ChatFeedComponent {...chatFeedProps}/>
            <MessageForm {...formProps}/>
        </Fragment>
    )
}

const CommunicationContainer = (props) => {
    const {history} = props;
    const {ready: audioReady, track: audioTrack} = useMicrophoneTrack();
    const {ready: cameraReady, track: cameraTrack} = useCameraTrack();

    const leaveChannel = async () => {
        const RTCClient = useClient();
        await RTCClient.leave();
        RTCClient.removeAllListeners();

        await rtm.leaveChannel(channelId);
        await rtm.logout();
        await rtm.removeAllListeners();
        // we close the tracks to perform cleanup
        if (audioReady) audioTrack.close();
        if (cameraReady) cameraTrack.close();
        history.goBack();

    };

    const videoProps = {audioReady, audioTrack, cameraReady, cameraTrack}

    return (
        <Fragment>
            <MessageChatComponent/>
            <VideoCallComponent {...videoProps}/>
            {<p onClick={() => leaveChannel()}>Leave</p>}
        </Fragment>
    )
}

const CompanyBoothCanvasComponent = (props) => {
    const {boothMesh} = props;
    return (
        <Canvas
            dpr={[1, 2]}
            camera={{fov: 45, position: [-75, 30, -10]}}
            style={{width: '100%', height: '850px'}}
        >
            <OrbitControls/>
            <Stage preset="rembrandt" intensity={0.4} environment="city"
                   contactShadow={false}>
                <ChildMesh mesh={boothMesh}/>
            </Stage>
        </Canvas>
    )
}


const CompanyBoothCanvasContainer = (props) => {
    const {url} = props;
    const [boothMesh, setBoothMesh] = useState(null);
    useEffect(async () => {
        const glb = await loadModel(url);
        setBoothMesh(glb.scene);
    }, []);
    if (boothMesh === null) return null;
    return (
        <CompanyBoothCanvasComponent boothMesh={boothMesh}/>
    )
}


const JobFairInformationTabs = (props) => {
    const {companyDescription, companyJobPostion} = props;

    return (
        <Tabs defaultActiveKey="1" tabPosition={"left"} type="card">
            <TabPane tab={"Company Description"} key={1}>
                <div>
                    What is Lorem Ipsum?
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                    Why do we use it?
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                    default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                </div>
            </TabPane>
            <TabPane tab={"Job Position"} key={2}>
                <div>
                    What is Lorem Ipsum?
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                    industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                    and scrambled it to make a type specimen book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                    publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                    Why do we use it?
                    It is a long established fact that a reader will be distracted by the readable content of a page
                    when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
                    distribution of letters, as opposed to using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their
                    default model text, and a search for 'lorem ipsum' will uncover many web sites still in their
                    infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                </div>
            </TabPane>
        </Tabs>
    )
}


const AttendantJobFairPage = () => {
    const history = useHistory();

    return (<Fragment>
        <CommunicationContainer history={history}/>
        {/*<JobFairInformationTabs />*/}
        {/*<CompanyBoothCanvasContainer url={'https://d3polnwtp0nqe6.cloudfront.net/booths/untitled.glb'}/>*/}
    </Fragment>);
}

export default AttendantJobFairPage;