/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useState, useEffect } from 'react'
import { LeftOutlined, RightOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Descriptions, InputNumber, Select, Upload, message, Slider, Switch } from 'antd'
import { SketchPicker } from 'react-color'
import * as THREE from 'three'
const { Option } = Select

const SideBarDecoratedBooth = ({ selectedItemRef }) => {
  const loadFile = {
    beforeUpload: file => {
      const isPNG = file.type === 'image/png'
      const isJPG = file.type === 'image/jpg'
      if (!isPNG && !isJPG) {
        message.error(`${file.name} is not a png file`)
      }
      return isPNG | isJPG || Upload.LIST_IGNORE
    },
    onChange: info => {
      console.log(info)
      // setCurrentFileInput(info.file)
    }
  }
  const [currentSelectedColor, setCurrentSelectedColor] = useState(
    selectedItemRef?.current.material.color.getHexString()
  )
  const [imageMockupRotation, setImageMockupRotation] = useState(0)
  const [positionState, setPositionState] = useState({
    x: selectedItemRef?.current.position.x ?? 0,
    y: selectedItemRef?.current.position.y ?? 0,
    z: selectedItemRef?.current.position.z ?? 0
  })
  const [urlImage, setUrlImage] = useState()
  const [isVideo, setIsVideo] = useState(false)
  const [persentScale, setPersentScale] = useState(0)
  const ChangeSizeImage = textureIn => {
    // textureIn.repeat.x = 800 / 100 - (textureIn.repeat?.x * persentScale) / 100
    // textureIn.repeat.y = 2000 / 100 - (textureIn.repeat?.y * persentScale) / 100
    // textureIn.offset.x =
    //   (300 / 100) * textureIn.repeat?.x == undefined ? -(textureIn.offset?.x * persentScale) / 100 : 0
    // textureIn.offset.y =
    //   (400 / 100) * textureIn.repeat?.y == undefined ? -(textureIn.offset?.y * persentScale) / 100 : 0
    console.log(textureIn)
    textureIn.repeat.x = 1
    textureIn.repeat.y = 1
    return textureIn
  }
  const handleOnChangeMaterialImage = data => {
    setUrlImage(data)
    setIsVideo(false)
    if (selectedItemRef?.current === undefined) {
      return
    }
    const cloneMaterial = selectedItemRef.current.material.clone()
    const textureIn = new THREE.TextureLoader().load(`${data}`)
    textureIn.rotation = `${imageMockupRotation}` | 0
    cloneMaterial.map = ChangeSizeImage(textureIn)
    cloneMaterial.transparent = true
    selectedItemRef.current.material = cloneMaterial
    for (const childMesh of selectedItemRef.current.children) {
      childMesh.material = cloneMaterial
    }
    selectedItemRef.current.material.needsUpdate = true
  }
  const [video] = useState(() => {
    const vid = document.createElement('video')
    vid.src = '/miku.mp4'
    vid.crossOrigin = 'Anonymous'
    vid.loop = true
    vid.muted = true
    return vid
  })
  useEffect(() => void video.play(), [video])
  const handleOnChangeMaterialVideo = data => {
    setIsVideo(true)
    if (selectedItemRef?.current === undefined) {
      return
    }
    const cloneMaterial = selectedItemRef.current.material.clone()
    const textureIn = new THREE.VideoTexture(video)
    textureIn.repeat.set(0.5, 1)
    textureIn.rotation = `${imageMockupRotation}` | 0
    cloneMaterial.map = ChangeSizeImage(textureIn)
    cloneMaterial.transparent = true
    selectedItemRef.current.material = cloneMaterial
    for (const childMesh of selectedItemRef.current.children) {
      childMesh.material = cloneMaterial
    }
    selectedItemRef.current.material.needsUpdate = true
  }
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
  const handleRotationMockupElement = data => {
    setImageMockupRotation(data)
    handleOnChangeMaterialVideo()
    if (!isVideo) {
      handleOnChangeMaterialImage(urlImage)
    }
  }
  const handleScaleElement = data => {
    setPersentScale(data)
    handleOnChangeMaterialVideo()
    if (!isVideo) {
      handleOnChangeMaterialImage(urlImage)
    }
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
      childMesh.material = newMaterial
    }
  }
  return (
    <>
      <div>
        <Typography variant="h2" style={{ padding: '1rem' }}>
          Booth Setting
        </Typography>
        <Divider />
        <div style={{ padding: '1rem' }}>
          <p>
            Name: <a>{selectedItemRef?.current.name}</a>
          </p>
        </div>
        <Divider />
        <Typography variant="button" style={{ padding: '1rem' }}>
          Properties
        </Typography>
        <div>
          <Descriptions title="Position" layout="vertical" bordered size="small" style={{ padding: '1rem' }}>
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
            style={{ padding: '1rem' }}
            contentStyle={{ alignItems: 'center' }}
          >
            <Descriptions.Item label="Left">
              <LeftOutlined onClick={handleOnRotationLeft} />
            </Descriptions.Item>
            <Descriptions.Item label="Right">
              <RightOutlined onClick={handleOnRotationRight} />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            title="Color"
            layout="vertical"
            size="small"
            bordered
            style={{ padding: '1rem' }}
            contentStyle={{ textAlign: 'center' }}
          >
            <Descriptions.Item>
              <SketchPicker
                color={selectedItemRef?.current.material.color.getHexString()}
                onChangeComplete={handleOnChangeColor}
              />
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            title="Image setting"
            layout="vertical"
            size="small"
            bordered
            style={{ padding: '1rem' }}
            contentStyle={{ alignItems: 'center' }}
          >
            <Descriptions.Item label="Rotation">
              <Slider defaultValue={10} onChange={handleRotationMockupElement} step={0.05} />
            </Descriptions.Item>
            <Descriptions.Item label="Scale">
              <Slider defaultValue={10} onChange={handleScaleElement} step={10} />
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Button>Download Model</Button>
        <Select defaultValue={urlImage} style={{ width: 120 }} onChange={handleOnChangeMaterialImage}>
          <Option value="/putin1.jpg">Handsome Putin</Option>
          <Option value="/putin2.jpg">Stronger Putin</Option>
          <Option value="/putin3.jpg">Yaoi Putin</Option>
          <Option value="/putin4.jpg">Yaoi Putin</Option>
        </Select>
        <Upload {...loadFile}>{/* <Button icon={<UploadOutlined />}>Upload Mockup Image</Button> */}</Upload>
        <Button onClick={handleOnChangeMaterialVideo}>Mockup video</Button>
      </div>
    </>
  )
}
export default SideBarDecoratedBooth
