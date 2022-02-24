/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useState } from 'react'
import { ToolOutlined, LeftOutlined, RightOutlined, UpOutlined, DownOutlined } from '@ant-design/icons'
import { InputNumber, Descriptions } from 'antd'
import { SketchPicker } from 'react-color'
import { handleDownloadModel } from '../../../../utils/modelDownloader'
import { Button } from 'antd'
import * as THREE from 'three'
const SideBarDecoratedBooth = ({
  decoratedColorRef,
  selectedItemRef,
  setSelectedItemRef,
  decoratedRotationRef,
  decoratedPositionRef,
  setDecoratedPositionRef,
  setDecoratedRotationRef,
  setDecoratedColorRef
}) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const handleOnClickOpenSideBar = () => {
    setIsSideBarOpen(true)
  }
  const handleAcctionSideBar = action => () => {
    setIsSideBarOpen(action)
  }
  const handleDownloadModelClick = value => {
    handleDownloadModel(value)
  }
  const handleOnchangePositionX = value => {
    // let currentPosition = selectedItemRef.position
    // selectedItemRef.position.set({ ...currentPosition, ['x']: value })
  }
  const handleOnchangePositionY = value => {
    // let currentPosition = selectedItemRef.position
    // selectedItemRef.position.set({ ...currentPosition, ['y']: value })
  }
  const handleOnchangePositionZ = value => {
    // let currentPosition = selectedItemRef.position
    // selectedItemRef.position.set({ ...currentPosition, ['z']: value })
  }
  const handleOnRotationLeft = value => {
    let myAxis
    myAxis = new THREE.Vector3(0, 1, 0)
    setSelectedItemRef(selectedItemRef.current.rotateOnWorldAxis(myAxis, THREE.Math.degToRad(10)))
  }
  const handleOnRotationRight = value => {
    let myAxis
    myAxis = new THREE.Vector3(0, 1, 0)
    setSelectedItemRef(selectedItemRef.current.rotateOnWorldAxis(myAxis, -THREE.Math.degToRad(10)))
  }
  const handleOnRotationUp = value => {
    setSelectedItemRef(
      selectedItemRef.current.position.set(
        selectedItemRef.current.position.x,
        selectedItemRef.current.position.y + 0.1,
        selectedItemRef.current.position.z
      )
    )
  }
  const handleOnRotationDown = value => {
    setSelectedItemRef(
      selectedItemRef.current.position.set(
        selectedItemRef.current.position.x,
        selectedItemRef.current.position.y - 0.1,
        selectedItemRef.current.position.z
      )
    )
  }
  const handleOnChangeColor = color => {
    setDecoratedColorRef(color)
  }
  return (
    <>
      <ToolOutlined style={{ float: 'left' }} onClick={handleOnClickOpenSideBar} />
      <SwipeableDrawer
        anchor="right"
        open={isSideBarOpen}
        onClose={handleAcctionSideBar(false)}
        onOpen={handleAcctionSideBar(true)}
        swipeAreaWidth="20"
      >
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
                  min={1}
                  max={360}
                  step="0.00000000000001"
                  defaultValue={selectedItemRef.current.position.x}
                  bordered={false}
                  onChange={handleOnchangePositionX}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Height">
                <InputNumber
                  min={1}
                  max={360}
                  step="0.00000000000001"
                  defaultValue={selectedItemRef.current.position.y}
                  bordered={false}
                  onChange={handleOnchangePositionY}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Top">
                <InputNumber
                  min={1}
                  max={360}
                  step="0.00000000000001"
                  defaultValue={selectedItemRef.current.position.z}
                  bordered={false}
                  onChange={handleOnchangePositionZ}
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
              <Descriptions.Item label="Up">
                <UpOutlined onClick={handleOnRotationUp} />
              </Descriptions.Item>
              <Descriptions.Item label="Down">
                <DownOutlined onClick={handleOnRotationDown} />
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
                <SketchPicker color={decoratedColorRef} onChangeComplete={handleOnChangeColor} />
              </Descriptions.Item>
            </Descriptions>
          </div>
          <Button>Download Model</Button>
        </div>
      </SwipeableDrawer>
    </>
  )
}
export default SideBarDecoratedBooth
