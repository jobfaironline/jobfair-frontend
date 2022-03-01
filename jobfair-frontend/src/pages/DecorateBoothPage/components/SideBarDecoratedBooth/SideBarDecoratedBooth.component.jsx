/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import {useEffect, useRef, useState} from 'react'
import {LeftOutlined, RightOutlined, UploadOutlined} from '@ant-design/icons'
import {Button, Descriptions, InputNumber, message, Select, Slider, Upload} from 'antd'
import {SketchPicker} from 'react-color'
import * as THREE from 'three'
import {getBase64} from "../../../../utils/common";

const IMAGE_PLANE_NAME = "image-plane"

const SideBarDecoratedBooth = ({selectedItemRef, onClick}) => {

    const vidElementRef = useRef({});

    const loadFile = {
        beforeUpload: file => {
            if (info.file.type !== 'image/png' || info.file.type !== 'image/jpg' || info.file.type !== 'video/mp4') {
                message.error(`${file.name} is not a png file`)
            }
            return false;
        },
        onChange: async info => {
            if (info.file.type !== 'image/png' || info.file.type !== 'image/jpg' || info.file.type !== 'video/mp4')
            if (selectedItemRef?.current === undefined) {
                return
            }
            let texture;
            if (info.file.type === 'video/mp4') {
                const vid = document.createElement('video')

                var reader = new FileReader();

                vid.crossOrigin = 'Anonymous'
                vid.loop = true
                vid.muted = true
                vid.play();
                texture = new THREE.VideoTexture(vid);
                const meshName = selectedItemRef.current.name;
                vidElementRef.current[meshName] = vid;
                reader.onload = function(e) {
                    vid.src = e.target.result
                }
                reader.readAsDataURL(info.file);


            } else {
                const base64Url = await getBase64(info.file);
                texture = new THREE.TextureLoader().load(base64Url);
            }

            const screenMesh = selectedItemRef.current.clone(false);
            screenMesh.clear();
            const geoBox = new THREE.Box3().setFromObject(screenMesh);

            //check if screenMesh is a plane
            if (
                (screenMesh.geometry.boundingBox.max.x - screenMesh.geometry.boundingBox.min.x === 0) ||
                (screenMesh.geometry.boundingBox.max.y - screenMesh.geometry.boundingBox.min.y === 0) ||
                (screenMesh.geometry.boundingBox.max.z - screenMesh.geometry.boundingBox.min.z === 0)
            ) {
                texture.center.x = 0.5
                texture.center.y = 0.5
                texture.center.set(0.5, 0.5)
                texture.rotation = -Math.PI / 2
                const newMaterial = selectedItemRef.current.material.clone();
                newMaterial.size = THREE.DoubleSide
                newMaterial.map = texture
                selectedItemRef.current.material = newMaterial;
                return;
            }

            //get screenSize
            const screenSize = new THREE.Vector3();
            geoBox.getSize(screenSize);

            //calculate which dimension is the length and which dimension is the width
            let width;
            if (screenSize.x > screenSize.z) {
                width = screenSize.x / screenMesh.scale.x
            } else {
                width = screenSize.z / screenMesh.scale.z
            }

            let plane;
            //create new plane
            const geometry = new THREE.PlaneGeometry(width, screenSize.y / screenMesh.scale.y);
            const material = new THREE.MeshBasicMaterial({side: THREE.DoubleSide, map: texture});
            plane = new THREE.Mesh(geometry, material);
            plane.name = IMAGE_PLANE_NAME
            //rotate plane to face the screen direction
            if (screenSize.x > screenSize.z) {
                plane.position.setZ(- screenSize.z / 2 / screenMesh.scale.z - 0.05);
            } else {
                const myAxis = new THREE.Vector3(0, 1, 0);
                plane.rotateOnAxis(myAxis, THREE.Math.degToRad(90));
                plane.position.setX(- screenSize.x / 2 / screenMesh.scale.x - 0.05);
            }

            const prevPlane = selectedItemRef.current.getObjectByName(IMAGE_PLANE_NAME);
            if (prevPlane !== undefined){
                selectedItemRef.current.remove(prevPlane);
            }
            selectedItemRef.current.add(plane);
        },
        showUploadList: false,
    }

    const [currentSelectedColor, setCurrentSelectedColor] = useState(
        selectedItemRef?.current.material.color.getHexString()
    )
    const [positionState, setPositionState] = useState({
        x: selectedItemRef?.current.position.x ?? 0,
        y: selectedItemRef?.current.position.y ?? 0,
        z: selectedItemRef?.current.position.z ?? 0
    })

    const handleOnchangePositionX = value => {
        if (selectedItemRef?.current === undefined) {
            return
        }
        selectedItemRef?.current.position.setX(value)
        setPositionState(prevState => {
            return {
                ...prevState,
                x: value
            }
        })
    }
    const handleOnchangePositionY = value => {
        if (selectedItemRef?.current === undefined) {
            return
        }
        selectedItemRef?.current.position.setY(value)
        setPositionState(prevState => {
            return {
                ...prevState,
                y: value
            }
        })
    }
    const handleOnchangePositionZ = value => {
        if (selectedItemRef?.current === undefined) {
            return
        }
        selectedItemRef?.current.position.setZ(value)
        setPositionState(prevState => {
            return {
                ...prevState,
                z: value
            }
        })
    }
    const handleOnRotationLeft = value => {
        if (selectedItemRef?.current === undefined) {
            return
        }
        const myAxis = new THREE.Vector3(0, 1, 0)
        selectedItemRef.current.rotateOnWorldAxis(myAxis, THREE.Math.degToRad(10))
    }
    const handleOnRotationRight = value => {
        if (selectedItemRef?.current === undefined) {
            return
        }
        const myAxis = new THREE.Vector3(0, 1, 0)
        selectedItemRef.current.rotateOnWorldAxis(myAxis, -THREE.Math.degToRad(10))
    }
    const handleOnChangeColor = color => {
        setCurrentSelectedColor(color)
        if (selectedItemRef?.current === undefined) {
            return
        }
        const newMaterial = selectedItemRef.current.material.clone()
        newMaterial.color.set(color.hex)
        newMaterial.transparent = true
        selectedItemRef.current.material = newMaterial
        for (const childMesh of selectedItemRef.current.children) {
            if (childMesh.name === IMAGE_PLANE_NAME){
                continue;
            }
            childMesh.material = newMaterial
        }
    }
    return (
        <>
            <div>
                <Typography variant="h2" style={{padding: '1rem'}}>
                    Booth Setting
                </Typography>
                <Divider/>
                <div style={{padding: '1rem'}}>
                    <p>
                        Name: <a>{selectedItemRef?.current.name}</a>
                    </p>
                </div>
                <Divider/>
                <Typography variant="button" style={{padding: '1rem'}}>
                    Properties
                </Typography>
                <div>

                    <Descriptions title="Position" layout="vertical" bordered size="small" style={{padding: '1rem'}}>
                        <Descriptions.Item label="Width">
                            <InputNumber
                                min={-10}
                                max={360}
                                value={selectedItemRef?.current.position.z ?? 0}
                                precision={3}
                                bordered={false}
                                onChange={handleOnchangePositionZ}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Length">
                            <InputNumber
                                min={-10}
                                max={360}
                                value={selectedItemRef?.current.position.x ?? 0}
                                precision={3}
                                bordered={false}
                                onChange={handleOnchangePositionX}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label="Height">
                            <InputNumber
                                min={-10}
                                max={360}
                                value={selectedItemRef?.current.position.y ?? 0}
                                precision={3}
                                bordered={false}
                                onChange={handleOnchangePositionY}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions
                        title="Rotation"
                        layout="vertical"
                        size="small"
                        bordered
                        style={{padding: '1rem'}}
                        contentStyle={{alignItems: 'center'}}
                    >
                        <Descriptions.Item label="Left">
                            <LeftOutlined onClick={handleOnRotationLeft}/>
                        </Descriptions.Item>
                        <Descriptions.Item label="Right">
                            <RightOutlined onClick={handleOnRotationRight}/>
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions
                        title="Color"
                        layout="vertical"
                        size="small"
                        bordered
                        style={{padding: '1rem'}}
                        contentStyle={{textAlign: 'center'}}
                    >
                        <Descriptions.Item>
                            <SketchPicker
                                color={selectedItemRef?.current.material.color.getHexString()}
                                onChangeComplete={handleOnChangeColor}
                            />
                        </Descriptions.Item>
                    </Descriptions>
                </div>
                <Upload {...loadFile}> <Button icon={<UploadOutlined/>}>Upload Mockup Image</Button> </Upload>

                <Button onClick={onClick}>Save</Button>
                {/*<Button onClick={handleOnChangeMaterialVideo}>Mockup video</Button>*/}
            </div>
        </>
    )
}
export default SideBarDecoratedBooth
