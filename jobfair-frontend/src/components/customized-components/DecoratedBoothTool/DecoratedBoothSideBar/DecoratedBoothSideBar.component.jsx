import './DecoratedBoothSideBar.style.scss';
import { BlockPicker } from 'react-color';
import { Button, Col, Descriptions, Form, Image, InputNumber, Row, Slider, Tabs, Typography, Upload } from 'antd';
import { DeleteOutlined, RotateLeftOutlined, RotateRightOutlined, UploadOutlined } from '@ant-design/icons';
import { SHARPNESS_MARK } from '../../../../constants/DecorateConst';
import { getBase64 } from '../../../../utils/common';
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
      <div
        style={{ position: 'absolute', zIndex: 100000, backgroundColor: '#FFF', borderRight: '1px solid #00000010' }}>
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
                fallback='data:image/png;base64,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'
              />
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
