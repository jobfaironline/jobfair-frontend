import './JobPositionManagement.styles.scss';
import { Button, Card, Descriptions, List, Space, Typography, Upload, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UploadOutlined } from '@ant-design/icons';
import { convertEnumToString } from '../../utils/common';
import {
  deleteJobPositionAPI,
  getJobPositionsAPI,
  uploadCSVFile
} from '../../services/jobhub-api/JobControllerService';
import { faEye, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import CreateJobPositionFormContainer from '../forms/CreateJobPositionForm/CreateJobPositionForm.container';
import JobPositionDetailFormContainer from '../forms/JobPositionDetailForm/JobPositionDetailForm.container';
import React, { useEffect, useState } from 'react';

export const JobPositionList = (props) => {
  const { handleCreateOnClick, handleViewDetailPage, data, handleOnDelete } = props;
  return (
    <div>
      <List
        grid={{
          column: 2
        }}
        dataSource={data}
        renderItem={(item) => {
          if (item.isFirst) {
            return (
              <Card className={'job-position-card add-container'} onClick={handleCreateOnClick} hoverable>
                <FontAwesomeIcon icon={faPlus} size={'xl'} />
              </Card>
            );
          }

          return (
            <Card className={'job-position-card'} actions={[<div style={{ height: 30 }}>Question bank</div>]}>
              <div className={'mask'}>
                <FontAwesomeIcon
                  icon={faTrash}
                  size={'4x'}
                  color={'white'}
                  className={'icon'}
                  onClick={() => handleOnDelete(item.id)}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  size={'4x'}
                  color={'white'}
                  className={'icon'}
                  onClick={() => handleViewDetailPage(item.id)}
                />
              </div>
              <div className={'content-container'}>
                <Descriptions title={item.title} column={1}>
                  <Descriptions.Item label={'Type'}>{convertEnumToString(item.jobType)}</Descriptions.Item>
                  <Descriptions.Item label={'Level'}>{convertEnumToString(item.level)}</Descriptions.Item>
                </Descriptions>
              </div>
            </Card>
          );
        }}
      />
    </div>
  );
};

const JobPositionMode = {
  VIEW_LIST: 'VIEW_LIST',
  ADD: 'ADD',
  UPDATE: 'UPDATE',
  VIEW_DETAIL: 'VIEW_DETAIL'
};

const JobPositionManagementContainer = () => {
  const [data, setData] = useState([]);
  const [forceRerenderState, setForceRerenderState] = useState(false);
  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //
  const [mode, setMode] = useState(JobPositionMode.VIEW_LIST);
  const [selectedJobPosition, setSelectJobPosition] = useState();

  const fetchData = async () => {
    getJobPositionsAPI('DESC', currentPage, pageSize, 'createdDate')
      .then((res) => {
        const totalRecord = res.data.totalElements;
        setTotalRecord(totalRecord);
        setData([
          { isFirst: true },
          ...res.data.content.map((item, index) => ({
            key: item.id,
            no: index + res.data.number * 10 + 1,
            ...item
          }))
        ]);
      })
      .catch(() => {
        //
      });
  };
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, forceRerenderState]);

  // eslint-disable-next-line no-unused-vars
  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  const handleCreateOnClick = () => {
    setMode(JobPositionMode.ADD);
  };

  const handleViewDetailPage = (id) => {
    const jobPosition = data.find((item) => item.id === id);
    setSelectJobPosition(jobPosition);
    setMode(JobPositionMode.VIEW_DETAIL);
  };

  const loadFile = {
    name: 'file',
    accept: '.csv',
    beforeUpload: () => false,
    onChange: async (info) => {
      if (info.file.type !== 'text/csv') {
        notification['error']({
          message: `${info.file.name} is not csv`
        });
        return;
      }
      const formData = new FormData();
      formData.append('file', info.file);
      await uploadCSVFile(formData);
      notification['success']({
        message: `${info.file.name} upload successfully`
      });
      //force render to fetch data after upload
      setForceRerenderState((prevState) => !prevState);
    },
    showUploadList: false,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068'
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`
    }
  };

  const onCancelForm = () => {
    setMode(JobPositionMode.VIEW_LIST);
    setSelectJobPosition(undefined);
    setForceRerenderState((prevState) => !prevState);
  };

  const onClickUpdate = () => {
    setMode(JobPositionMode.UPDATE);
  };

  const handleOnDelete = async (id) => {
    try {
      await deleteJobPositionAPI(id);
      notification['success']({
        message: `Delete job position successfully`
      });
      setForceRerenderState((prevState) => !prevState);
    } catch (e) {
      notification['error']({
        message: `Update job position failed`,
        description: `Error detail: ${e}`
      });
    }
  };

  const renderJobPosition = () => {
    switch (mode) {
      case JobPositionMode.VIEW_LIST:
        return (
          <JobPositionList
            handleCreateOnClick={handleCreateOnClick}
            handleViewDetailPage={handleViewDetailPage}
            data={data}
            handleOnDelete={handleOnDelete}
          />
        );
      case JobPositionMode.ADD:
        return <CreateJobPositionFormContainer onCancel={onCancelForm} />;
      case JobPositionMode.VIEW_DETAIL:
        return (
          <JobPositionDetailFormContainer
            jobPosition={selectedJobPosition}
            onCancel={onCancelForm}
            isDisplayDetail={JobPositionMode.VIEW_DETAIL === mode}
            onClickUpdate={onClickUpdate}
          />
        );
      case JobPositionMode.UPDATE:
        return (
          <JobPositionDetailFormContainer
            jobPosition={selectedJobPosition}
            onCancel={onCancelForm}
            isDisplayDetail={JobPositionMode.VIEW_DETAIL === mode}
            onClickUpdate={onClickUpdate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{}}>
      <Space
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '1rem'
        }}>
        <Typography.Title level={2} style={{ marginBottom: '0rem' }}>
          Job positions
        </Typography.Title>
        <Space>
          <Upload {...loadFile}>
            <Button icon={<UploadOutlined />}>Upload CSV</Button>{' '}
          </Upload>
        </Space>
      </Space>
      {renderJobPosition()}
    </div>
  );
};

export default JobPositionManagementContainer;
