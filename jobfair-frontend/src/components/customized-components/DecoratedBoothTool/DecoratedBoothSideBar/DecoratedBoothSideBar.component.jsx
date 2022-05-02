/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import './DecoratedBoothSideBar.style.scss';
import {Button, Descriptions, InputNumber, Slider, Upload} from 'antd';
import { DeleteOutlined, LeftOutlined, RightOutlined, UploadOutlined } from '@ant-design/icons';
import {Description} from "@mui/icons-material";
import { SketchPicker } from 'react-color';
import Divider from '@mui/material/Divider';
import ImgCrop from "antd-img-crop";
import Typography from '@mui/material/Typography';

export const DecorateBoothSideBarComponent = (props) => {
  const {
    selectedItem,
    handleOnchangePositionZ,
    handleOnchangePositionX,
    handleOnchangePositionY,
    handleOnRotationLeft,
    handleOnRotationRight,
    loadFile,
    handleDelete,
    handleOnChangeColor,
    onChangeBrightness,
    onChangeSharpness,
    ratio,
    handleUpVideoCropImage
  } = props;

  const sharpnessMarks = {
    0: 'normal',
    1: 'sharper',
    2: 'sharpest'
  };

  return (
    <div className={'decorate-booth-side-bar'}>
      <div style={{ position: 'absolute', zIndex: 100000 }}>
        <div style={{ padding: '1rem' }}>
          <p>
            Component: <a>{selectedItem?.name}</a>
          </p>
        </div>
        <Divider />
        <Typography variant='button' style={{ padding: '1rem' }}>
          Properties
        </Typography>
        <div>
          <Descriptions title='Position' layout='vertical' bordered size='small'>
            <Descriptions.Item label='Width' style={{ padding: 0 }}>
              <InputNumber
                min={-10}
                max={360}
                value={selectedItem?.position.z ?? 0}
                precision={3}
                bordered={false}
                onChange={handleOnchangePositionZ}
              />
            </Descriptions.Item>
            <Descriptions.Item label='Length'>
              <InputNumber
                min={-10}
                max={360}
                value={selectedItem?.position.x ?? 0}
                precision={3}
                bordered={false}
                onChange={handleOnchangePositionX}
              />
            </Descriptions.Item>
            <Descriptions.Item label='Height'>
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
            title='Rotation'
            layout='vertical'
            size='small'
            bordered
            style={{ padding: '1rem' }}
            contentStyle={{ alignItems: 'center' }}>
            <Descriptions.Item label='Left'>
              <LeftOutlined onClick={handleOnRotationLeft} />
            </Descriptions.Item>
            <Descriptions.Item label='Right'>
              <RightOutlined onClick={handleOnRotationRight} />
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div style={{ margin: '1rem 0' }}>
          <ImgCrop aspect={ratio} beforeCrop={handleUpVideoCropImage}	>
            <Upload {...loadFile}>
              <Button icon={<UploadOutlined />}>Upload Media</Button>{' '}
            </Upload>
          </ImgCrop>

          <Button icon={<DeleteOutlined />} onClick={handleDelete}>
            Delete item
          </Button>
        </div>
        <div>
          <Descriptions.Item>Image brightness</Descriptions.Item>
          <Slider defaultValue={50} onChange={onChangeBrightness} />
          <Descriptions.Item>Image sharpness</Descriptions.Item>
          <Slider min={0} max={2} defaultValue={0} marks={sharpnessMarks} onChange={onChangeSharpness} />
        </div>
        <div>
          <SketchPicker color={selectedItem?.material.color.getHexString()} onChangeComplete={handleOnChangeColor} />
        </div>

      </div>
    </div>
  );
};
