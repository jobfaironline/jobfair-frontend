import { FileOutlined, InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, Table } from 'antd';
import { UPLOAD_STATUS } from '../../constants/CSVConstant';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import Dragger from 'antd/es/upload/Dragger';
import React, { useState } from 'react';

export const UploadCSVModal = (props) => {
  const { visible, handleUpload, onCancel, templateURl } = props;

  const initialData = {
    uploading: false,
    fileList: []
  };

  const [uploadingData, setUploadingData] = useState(initialData);

  const uploadProps = {
    name: 'file',
    multiple: true,
    accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    beforeUpload: (file) => {
      setUploadingData((prevState) => ({
        ...prevState,
        fileList: [...prevState.fileList, { file, status: UPLOAD_STATUS.UPLOADING, name: file.name }]
      }));
      return false;
    },
    onRemove: (file) => {
      setUploadingData((prevState) => {
        const index = prevState.fileList.indexOf((listFile) => listFile.uid === file.uid);
        const newFileList = prevState.fileList.slice();
        newFileList.splice(index, 1);
        return {
          ...prevState,
          fileList: newFileList
        };
      });
    },
    showUploadList: true,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068'
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`
    },
    fileList: uploadingData.fileList.map((item) => item.file)
  };

  const onSubmit = () => {
    setUploadingData((prevState) => ({ ...prevState, uploading: true }));
    uploadingData.fileList.forEach((file) => {
      handleUpload(file.file)
        .then(() => {
          setUploadingData((prevState) => {
            const neededFile = prevState.fileList.find((listFile) => listFile.file.uid === file.file.uid);
            neededFile.status = UPLOAD_STATUS.SUCCESS;
            return {
              ...prevState,
              fileList: prevState.fileList
            };
          });
        })
        .catch((error) => {
          setUploadingData((prevState) => {
            const neededFile = prevState.fileList.find((listFile) => listFile.file.uid === file.file.uid);
            neededFile.status = UPLOAD_STATUS.FAIL;
            const obj = {};
            if (error.response.status === 400) {
              if (error.response.data.errorFileUrl) obj.url = error.response.data.errorFileUrl;
              else obj.message = error.response.data.message;
            } else obj.message = 'Something went wrong';
            neededFile.error = obj;
            return {
              ...prevState,
              fileList: prevState.fileList
            };
          });
        });
    });
  };

  const columns = [
    {
      title: 'File name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        switch (value) {
          case UPLOAD_STATUS.UPLOADING:
            return <LoadingOutlined />;
          case UPLOAD_STATUS.SUCCESS:
            return <FontAwesomeIcon icon={faCircleCheck} style={{ color: 'green' }} />;
          case UPLOAD_STATUS.FAIL:
            return <FontAwesomeIcon icon={faCircleXmark} style={{ color: 'red' }} />;
          default:
            return <LoadingOutlined />;
        }
      }
    },
    {
      title: 'Message',
      dataIndex: 'error',
      key: 'error',
      render: (value) => {
        if (value?.url !== undefined) {
          return (
            <>
              <span>File error. Click </span>
              <a href={value.url}>here</a>
              <span> to download report file</span>
            </>
          );
        }
        return <span>{value?.message}</span>;
      }
    }
  ];

  const onOk = () => {
    if (uploadingData.uploading) handleCancel();
    else onSubmit();
  };

  const handleCancel = () => {
    onCancel();
    setUploadingData(initialData);
  };

  return (
    <Modal
      visible={visible}
      title={'Upload CSV or Excel file'}
      onOk={onOk}
      onCancel={handleCancel}
      okText={uploadingData.uploading ? 'Okay' : 'Upload'}
      okButtonProps={{ disabled: uploadingData.fileList.length === 0 }}>
      {uploadingData.uploading ? (
        <div>
          <Table pagination={false} dataSource={uploadingData.fileList} columns={columns} />
        </div>
      ) : null}
      {!uploadingData.uploading ? (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            {'Download template: '} <FileOutlined style={{ marginRight: 6 }} />
            <a href={templateURl}>template.xlsx</a>
          </div>
          <Dragger {...uploadProps}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>Click or drag file to this area to upload</p>
            <p className='ant-upload-hint'>
              Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files
            </p>
          </Dragger>
        </div>
      ) : null}
    </Modal>
  );
};
