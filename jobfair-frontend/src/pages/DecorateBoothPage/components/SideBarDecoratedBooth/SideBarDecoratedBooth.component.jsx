/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useEffect, useRef, useState } from 'react'
import {DeleteOutlined, LeftOutlined, RightOutlined, UploadOutlined} from '@ant-design/icons'
import { Button, Descriptions, InputNumber, message, Select, Slider, Upload } from 'antd'
import { SketchPicker } from 'react-color'
import * as THREE from 'three'
import { getBase64 } from '../../../../utils/common'
import './SideBarDecoratedBooth.style.scss'
import {useSelector} from "react-redux";

const IMAGE_PLANE_NAME = 'image-plane'

const SideBarDecoratedBooth = (props) => {
  const {handleOnRotationLeft, handleOnRotationRight, handleDelete} = props;

  const vidElementRef = useRef({})
  const selectedItem = useSelector(state => state.decorateBooth.selectedItem)


  const loadFile = {
    beforeUpload: file => {
      if (info.file.type !== 'image/png' || info.file.type !== 'image/jpg' || info.file.type !== 'video/mp4') {
        message.error(`${file.name} is not a png file`)
      }
      return false
    },
    onChange: async info => {
      if (info.file.type !== 'image/png' || info.file.type !== 'image/jpg' || info.file.type !== 'video/mp4')
        if (selectedItem === undefined) {
          return
        }
      let texture
      if (info.file.type === 'video/mp4') {
        const vid = document.createElement('video')

        var reader = new FileReader()

        vid.crossOrigin = 'Anonymous'
        vid.loop = true
        vid.muted = true
        vid.play()
        texture = new THREE.VideoTexture(vid)
        const meshName = selectedItem?.name
        vidElementRef.current[meshName] = vid
        reader.onload = function (e) {
          vid.src = e.target.result
        }
        reader.readAsDataURL(info.file)
      } else {
        const base64Url = await getBase64(info.file)
        texture = new THREE.TextureLoader().load(base64Url)
      }
      texture.flipY = false
      texture.encoding = THREE.sRGBEncoding

      const screenMesh = selectedItem?.clone(false)
      screenMesh.clear()
      const geoBox = new THREE.Box3().setFromObject(screenMesh)

      //check if screenMesh is a plane
      if (
        screenMesh.geometry.boundingBox.max.x - screenMesh.geometry.boundingBox.min.x === 0 ||
        screenMesh.geometry.boundingBox.max.y - screenMesh.geometry.boundingBox.min.y === 0 ||
        screenMesh.geometry.boundingBox.max.z - screenMesh.geometry.boundingBox.min.z === 0
      ) {
        texture.center.x = 0.5
        texture.center.y = 0.5
        texture.center.set(0.5, 0.5)
        texture.rotation = Math.PI / 2

        const newMaterial = selectedItem?.material.clone()
        newMaterial.size = THREE.DoubleSide
        newMaterial.map = texture
        selectedItem.material = newMaterial
        return
      }


      //get screenSize
      const screenSize = new THREE.Vector3()
      geoBox.getSize(screenSize)

      //calculate which dimension is the length and which dimension is the width
      let width
      if (screenSize.x > screenSize.z) {
        width = screenSize.x / screenMesh.scale.x
      } else {
        width = screenSize.z / screenMesh.scale.z
      }

      let plane
      //create new plane
      const geometry = new THREE.PlaneGeometry(width, screenSize.y / screenMesh.scale.y)
      const material = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: texture })
      plane = new THREE.Mesh(geometry, material)
      plane.name = IMAGE_PLANE_NAME
      //rotate plane to face the screen direction
      if (screenSize.x > screenSize.z) {
        plane.position.setZ(-screenSize.z / 2 / screenMesh.scale.z - 0.05)
      } else {
        let myAxis = new THREE.Vector3(0, 1, 0)
        plane.rotateOnAxis(myAxis, THREE.Math.degToRad(90))
        myAxis = new THREE.Vector3(0, 0, 1)
        plane.rotateOnAxis(myAxis, THREE.Math.degToRad(180))

        plane.position.setX(-screenSize.x / 2 / screenMesh.scale.x - 0.05)
      }

      const prevPlane = selectedItem?.getObjectByName(IMAGE_PLANE_NAME)
      if (prevPlane !== undefined) {
        selectedItem?.remove(prevPlane)
      }
      selectedItem?.add(plane)
    },
    showUploadList: false
  }

  const [currentSelectedColor, setCurrentSelectedColor] = useState(
    selectedItem?.material.color.getHexString()
  )
  const [positionState, setPositionState] = useState({
    x: selectedItem?.position.x ?? 0,
    y: selectedItem?.position.y ?? 0,
    z: selectedItem?.position.z ?? 0
  })

  const handleOnchangePositionX = value => {
    if (selectedItem === undefined) {
      return
    }
    selectedItem.position.setX(value)
    setPositionState(prevState => {
      return {
        ...prevState,
        x: value
      }
    })
  }
  const handleOnchangePositionY = value => {
    if (selectedItem === undefined) {
      return
    }
    selectedItem.position.setY(value)
    setPositionState(prevState => {
      return {
        ...prevState,
        y: value
      }
    })
  }
  const handleOnchangePositionZ = value => {
    if (selectedItem === undefined) {
      return
    }
    selectedItem.position.setZ(value)
    setPositionState(prevState => {
      return {
        ...prevState,
        z: value
      }
    })
  }

  const handleOnChangeColor = color => {
    console.log(color);
    if (selectedItem === undefined) {
      return
    }
    const newMaterial = selectedItem.material.clone()
    newMaterial.color.set(color.hex)
    newMaterial.transparent = true
    selectedItem.material = newMaterial
    for (const childMesh of selectedItem.children) {
      if (childMesh.name === IMAGE_PLANE_NAME) {
        continue
      }
      childMesh.material = newMaterial
    }
    setCurrentSelectedColor(color)

  }

  if (!selectedItem) {
    return <></>
  }

  return (
    <>
      <div style={{ position: 'absolute', zIndex: 100000 }}>
        {/* <Typography variant="h2" style={{padding: '1rem'}}>
                    Booth Setting
                </Typography>
                <Divider/> */}
        <div style={{ padding: '1rem' }}>
          <p>
            Component: <a>{selectedItem?.name}</a>
          </p>
        </div>
        <Divider />
        <Typography variant="button" style={{ padding: '1rem' }}>
          Properties
        </Typography>
        <div>
          <Descriptions title="Position" layout="vertical" bordered size="small">
            <Descriptions.Item label="Width" style={{ padding: 0 }}>
              <InputNumber
                min={-10}
                max={360}
                value={selectedItem?.position.z ?? 0}
                precision={3}
                bordered={false}
                onChange={handleOnchangePositionZ}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Length">
              <InputNumber
                min={-10}
                max={360}
                value={selectedItem?.position.x ?? 0}
                precision={3}
                bordered={false}
                onChange={handleOnchangePositionX}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Height">
              <InputNumber
                min={-10}
                max={360}
                value={selectedItem?.position.y ?? 0}
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
        </div>
        <div style={{ margin: '1rem 0' }}>
          <Upload {...loadFile}>
            <Button icon={<UploadOutlined />}>Upload Media</Button>{' '}
          </Upload>
          <Button icon={<DeleteOutlined />} onClick={handleDelete}>
            Delete item
          </Button>

        </div>
      </div>
      <Descriptions
        className="pick-color"
        layout="vertical"
        size="small"
        bordered
        style={{ padding: '1rem' }}
        contentStyle={{ textAlign: 'center' }}
      >
        <Descriptions.Item>
          <SketchPicker
            color={selectedItem?.material.color.getHexString()}
            onChangeComplete={handleOnChangeColor}
          />
        </Descriptions.Item>
      </Descriptions>
    </>
  )
}
export default SideBarDecoratedBooth
