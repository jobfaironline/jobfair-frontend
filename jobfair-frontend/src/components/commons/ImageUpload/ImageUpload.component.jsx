import { Form, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getBase64 } from '../../../utils/common';
import React, { Component } from 'react';

class ImageUploadComponent extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error'
      }
    ]
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) file.preview = await getBase64(file.originFileObj);

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Form.Item>
          <Upload
            action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
            listType='picture-card'
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}>
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form.Item>
        <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

export default ImageUploadComponent;