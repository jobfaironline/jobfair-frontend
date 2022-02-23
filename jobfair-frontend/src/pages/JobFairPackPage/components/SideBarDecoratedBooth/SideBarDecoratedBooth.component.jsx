/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useState } from 'react'
import { ToolOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons'
import { InputNumber, Descriptions } from 'antd'
import { SketchPicker } from 'react-color'
import { handleDownloadModel } from '../../../../utils/modelDownloader'
import { Button } from 'antd'

const SideBarDecoratedBooth = ({
  decoratedColorRef,
  selectedItemRef,
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
    console.log(value)
  }
  const handleOnchangePositionY = value => {
    console.log(value)
  }
  const handleOnchangePositionZ = value => {
    console.log(value)
  }
  const handleOnRotationLeft = value => {
    console.log(value)
  }
  const handleOnRotationRight = value => {
    console.log(value)
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
                <InputNumber min={1} max={360} defaultValue={3} bordered={false} onChange={handleOnchangePositionX} />
              </Descriptions.Item>
              <Descriptions.Item label="Height">
                <InputNumber min={1} max={360} defaultValue={3} bordered={false} onChange={handleOnchangePositionY} />
              </Descriptions.Item>
              <Descriptions.Item label="Top">
                <InputNumber min={1} max={360} defaultValue={3} bordered={false} onChange={handleOnchangePositionZ} />
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
