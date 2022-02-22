import {Button, Form, Input, Tabs} from "antd";
import React, {Children, Fragment, useEffect, useState} from "react";
import RTMClient from "./rtx_client";
import {AgoraVideoPlayer, createClient, createMicrophoneAndCameraTracks} from "agora-rtc-react";
import {Canvas} from "@react-three/fiber";
import {OrbitControls, useGLTF} from "@react-three/drei";
import {ChildMesh} from "../JobFairPackPage/components/model/Final_booth_model";


const {TabPane} = Tabs;
const config = {
    mode: "rtc", codec: "vp8",
};
//the appid should belong to .env
const appId = "c99b02ecc0b940fe90959c6490af4d06";
const useClient = createClient(config);
const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
//the rtm should be initialize at loading and store in redux
const rtm = new RTMClient();
rtm.init(appId);
//accountName will be get from Redux
const uid = "tien";
//channelId is the booth's id
const channelId = "1234";

class Message {
    constructor(accountName, content, isMyMessage) {
        this.accountName = accountName;
        this.content = content;
        this.isMyMessage = isMyMessage;
    }
}

function MessageForm(props) {
    const {setMessageList, isChatReady} = props;
    const [form] = Form.useForm();
    const onFinish = (values) => {

        rtm.sendChannelMessage(values.message, channelId);

        setMessageList(prevState => {
            return [...prevState, new Message(uid, values.message, true)]
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

export const Controls = (props) => {
    const {setIsMuteCamera, tracks} = props;
    const [trackState, setTrackState] = useState({video: true, audio: true});

    const mute = async (type) => {
        console.log(tracks[0]);
        if (type === "audio") {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState((ps) => {
                return {...ps, audio: !ps.audio};
            });
        } else if (type === "video") {
            setIsMuteCamera(trackState.video)
            await tracks[1].setEnabled(!trackState.video);
            setTrackState((ps) => {
                return {...ps, video: !ps.video};
            });
        }
    };

    return (
        <div>
            <p className={trackState.audio ? "on" : ""}
               onClick={() => mute("audio")}>
                {trackState.audio ? "MuteAudio" : "UnmuteAudio"}
            </p>
            <p className={trackState.video ? "on" : ""}
               onClick={() => mute("video")}>
                {trackState.video ? "MuteVideo" : "UnmuteVideo"}
            </p>

        </div>
    );
};

const Videos = (props) => {
    const {users, isMuteCamera} = props;
    const {ready, tracks} = useMicrophoneAndCameraTracks();
    return (
        <div>
            <div id="videos" style={{
                height: "40vh",
                width: "40vw",
                margin: "auto",
                alignSelf: "flex-start",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
                justifyItems: "center",
                alignItems: "center",
            }}>
                {/* AgoraVideoPlayer component takes in the video track to render the stream,
            you can pass in other props that get passed to the rendered div */}
                {!isMuteCamera ? <AgoraVideoPlayer style={{height: '95%', width: '95%'}} className='vid' videoTrack={tracks[1]}/> : <div style={{height: '95%', width: '95%', backgroundColor: "black"}}/>}
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

function VideoChatComponent(props) {
    const {isVideoReady, users, ready, tracks} = props;

    const [isMuteCamera, setIsMuteCamera] = useState(false);

    const controlProps = {
        setIsMuteCamera,
        tracks
    }

    const videoProps = {
        isMuteCamera,
        users
    }

    return (
        <div>
            {ready && tracks && (
                <Controls {...controlProps}/>
            )}
            {isVideoReady && tracks && <Videos {...videoProps}/>}
        </div>
    );
}

function MessageChatComponent(props) {
    const {isChatReady, messageList, setMessageList } = props;


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


function CommunicationComponent(props) {
    const [isChatReady, setIsChatReady] = useState(false);
    const [isVideoReady, setIsVideoReady] = useState(false);
    const {ready, tracks} = useMicrophoneAndCameraTracks();
    const [users, setUsers] = useState([]);
    const [messageList, setMessageList] = useState([]);


    //token will be taken from BE
    const chatToken = "006c99b02ecc0b940fe90959c6490af4d06IAC2C1+BXG76t7u+3hs8UM/KY1C2I2nYovsf2+qGArgu1cXLnzAAAAAAEABgoz26wMoVYgEA6ANQhxRi";
    const videoToken = "006c99b02ecc0b940fe90959c6490af4d06IADAH11y5+0Z/pvXbuipMGmXMnT20jeq7xX22fMG+gkqYqPg45vFy58wIgAP2P/oTdsVYgQAAQDdlxRiAgDdlxRiAwDdlxRiBADdlxRi";

    async function initializeRtmClient(rtmClient) {
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
        await rtmClient.login(uid, chatToken)
        await rtmClient.joinChannel(channelId);
        setIsChatReady(true);
    }

    async function initializeRTCClient(rtcClient) {
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

        await rtcClient.join(appId, channelId, videoToken, uid);
        if (tracks) await rtcClient.publish([tracks[0], tracks[1]]);
        setIsVideoReady(true);
    }


    useEffect(async () => {
        if (tracks && ready){
            await initializeRtmClient(rtm);
            const rtcClient = useClient();

            await initializeRTCClient(rtcClient);

        }

    }, [tracks, ready]);


    const videoProps = {
        channelId,
        token: videoToken,
        accountName: uid,
        isVideoReady,
        setIsVideoReady,
        users,
        ready,
        tracks
    }

    const messsageProps = {
        isChatReady,
        messageList,
        setMessageList
    }

    const RTCClient = useClient();
    const leaveChannel = async () => {
        await RTCClient.leave();
        RTCClient.removeAllListeners();

        await rtm.leaveChannel(channelId);
        await rtm.logout();
        await rtm.removeAllListeners();
        // we close the tracks to perform cleanup
        tracks[0].close();
        tracks[1].close();
        setIsChatReady(false);
        setIsVideoReady(false);

    };

    return (
        <Fragment>
            <VideoChatComponent {...videoProps}/>
            <MessageChatComponent {...messsageProps}/>
            {<p onClick={() => leaveChannel()}>Leave</p>}
        </Fragment>
    );
}

function Booth(props){

    const {nodes, materials} = useGLTF('https://d3polnwtp0nqe6.cloudfront.net/booths/untitled.glb');
    const [items, setItems] = useState([]);

    useEffect(() => {
        const result = [];
        for (const mesh in nodes) {
            if (nodes[mesh].parent?.name === 'Scene') result.push(nodes[mesh])
        }
        setItems(prevState => {
            return [...prevState, ...result];
        });
    }, []);


    return (
        <group dispose={null}>
            {items.map((item) => (<ChildMesh key={item.uuid} mesh={item}/>))}
        </group>
    );
}

useGLTF.preload('https://d3polnwtp0nqe6.cloudfront.net/booths/untitled.glb')



const AttendantJobFairPage = () => {



    return (<Fragment>
        <CommunicationComponent/>

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
        <Canvas
            dpr={[1, 2]}
            camera={{ fov: 45, position: [-75, 30, -10] }}
            style={{ width: '100%', height: '850px' }}
        >
            <directionalLight intensity={0.5} />
            <ambientLight intensity={0.2} />
            <Booth/>
        </Canvas>
    </Fragment>);
}

export default AttendantJobFairPage;