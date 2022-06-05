import './DecoratedBoothSideBar.style.scss';
import { BlockPicker } from 'react-color';
import { Button, Col, Descriptions, Form, Image, InputNumber, Row, Slider, Tabs, Typography, Upload } from 'antd';
import { DeleteOutlined, RotateLeftOutlined, RotateRightOutlined, UploadOutlined } from '@ant-design/icons';
import { SHARPNESS_MARK } from '../../../../constants/DecorateConst';
import { getBase64 } from '../../../../utils/common';
import { previewImageBase64 } from '../../../../constants/ImageDataConstants';
import { useState } from 'react';
import Divider from '@mui/material/Divider';
import ImgCrop from 'antd-img-crop';

const { TabPane } = Tabs;

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

  const [previewImage, setPreviewImage] = useState('');

  return (
    <div className={'decorate-booth-side-bar'}>
      <div style={{ position: 'absolute', zIndex: 100, backgroundColor: '#FFF', borderRight: '1px solid #00000010' }}>
        <Tabs type='card' defaultActiveKey='1' centered size='large'>
          <TabPane tab='Edit 3D model style' key='1'>
            <div style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
              <div>
                <Image src={selectedItem?.thumbnailUrl} height={150} width={150}></Image>
                <p>
                  Component: <a>{selectedItem?.name}</a>
                </p>
              </div>
            </div>
            <Divider />
            <div
              style={{
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <div style={{ width: '100%', marginBottom: '0.5rem' }}>
                <Typography>Color</Typography>
              </div>
              <BlockPicker
                width='150'
                color={selectedItem?.material.color.getHexString()}
                onChangeComplete={handleOnChangeColor}
              />
            </div>
            <div
              style={{
                padding: '0 1rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <div style={{ width: '100%', marginBottom: '0.5rem' }}>
                <Typography>Position</Typography>
              </div>
              <Form layout='vertical'>
                <Row align='center' gutter={[4, 16]}>
                  <Col span={8}>
                    <Form.Item label='X:'>
                      <InputNumber
                        min={-10}
                        max={360}
                        value={selectedItem?.position.x ?? 0}
                        precision={3}
                        onChange={handleOnchangePositionX}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label='Y:'>
                      <InputNumber
                        min={-10}
                        max={360}
                        value={selectedItem?.position.y ?? 0}
                        precision={3}
                        onChange={handleOnchangePositionY}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label='Z:'>
                      <InputNumber
                        min={-10}
                        max={360}
                        value={selectedItem?.position.z ?? 0}
                        precision={3}
                        onChange={handleOnchangePositionZ}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
            <div
              style={{
                padding: '0 1rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <div style={{ width: '100%', marginBottom: '0.5rem' }}>
                <Typography>Rotation</Typography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type='primary'
                  onClick={handleOnRotationLeft}
                  icon={<RotateRightOutlined />}
                  style={{ borderRadius: '50px 0 0 50px', width: '100px', marginRight: '0.5rem' }}>
                  Left
                </Button>
                <Button
                  type='primary'
                  onClick={handleOnRotationRight}
                  icon={<RotateLeftOutlined style={{ marginLeft: '0.5rem' }} />}
                  style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                    borderRadius: '0 50px 50px 0',
                    width: '100px',
                    justifyContent: 'start',
                    marginLeft: '0.5rem'
                  }}>
                  Right
                </Button>
              </div>
            </div>
            <div
              style={{
                padding: '1rem',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
              <Button icon={<DeleteOutlined />} onClick={handleDelete}>
                Delete item
              </Button>
            </div>
          </TabPane>
          <TabPane tab='Edit model media' key='2'>
            <div
              style={{
                margin: '1rem 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Image
                style={{ padding: '1rem 0 ' }}
                width={200}
                height={200}
                src={previewImage}
                fallback={previewImageBase64}></Image>
              <ImgCrop aspect={ratio} beforeCrop={handleUpVideoCropImage}>
                <Upload
                  {...loadFile}
                  onChange={({ fileList: newFileList }) => {
                    loadFile?.onChange(newFileList);
                    const processImage = async () => {
                      const previewData = await getBase64(newFileList[0].originFileObj);
                      setPreviewImage(previewData);
                    };
                    processImage();
                  }}>
                  <Button icon={<UploadOutlined />}>Upload Media</Button>{' '}
                </Upload>
              </ImgCrop>
            </div>
            <div
              style={{
                margin: '1rem 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <div style={{ width: '80%' }}>
                <Descriptions.Item>Image brightness</Descriptions.Item>
                <Slider defaultValue={50} onChange={onChangeBrightness} />
                <Descriptions.Item>Image sharpness</Descriptions.Item>
                <Slider min={0} max={2} defaultValue={0} marks={SHARPNESS_MARK} onChange={onChangeSharpness} />
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
