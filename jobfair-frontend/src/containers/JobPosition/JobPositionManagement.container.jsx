import { Button, Space, Typography, Upload } from 'antd';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { UploadOutlined } from '@ant-design/icons';
import { getJobPositionsAPI } from '../../services/jobhub-api/JobControllerService';
import { loadCSVFile, uploadUtil } from '../../utils/uploadCSVUtil';
import { useHistory } from 'react-router-dom';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import PickJobPositionTableColumn from '../JobPositionTable/PickJobPositionTable.column';
import React, { useLayoutEffect, useState } from 'react';

const JobPositionManagementContainer = () => {
  const [data, setData] = useState([]);
  const [forceRerenderState, setForceRerenderState] = useState(false);
  //pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //
  const history = useHistory();

  const fetchData = async () => {
    getJobPositionsAPI('DESC', currentPage, pageSize, 'createdDate')
      .then((res) => {
        const totalRecord = res.data.totalElements;
        setTotalRecord(totalRecord);
        setData([
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
  useLayoutEffect(() => {
    fetchData();
  }, [currentPage, pageSize, forceRerenderState]);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  const handleCreateOnClick = () => {
    history.push(PATH_COMPANY_MANAGER.CREATE_JOB_POSITION_PAGE);
  };

  const handleViewDetailPage = (id) => {
    history.push(PATH_COMPANY_MANAGER.JOB_POSITION_DETAIL_PAGE, {
      jobPosition: data.find((item) => item.id === id)
    });
  };

  const handleViewQuestionBank = (id) => {
    history.push(PATH_COMPANY_MANAGER.QUESTION_BANK, {
      jobPosition: data.find((item) => item.id === id)
    });
  };

  const onChangeUpload = async (info) => {
    await uploadUtil(info);
    setForceRerenderState((prevState) => !prevState);
  };

  const jobPositionTableProps = {
    tableData: data,
    tableColumns: PickJobPositionTableColumn,
    onSearch: () => {
      //TODO: fetch data for search
    },
    extra: [
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <Space size='middle'>
            <a onClick={() => handleViewDetailPage(record.id)}>View detail</a>
            <a onClick={() => handleViewQuestionBank(record.id)}>Nguồn câu hỏi</a>
          </Space>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
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
          <Button type='primary' onClick={() => handleCreateOnClick()}>
            Create job position
          </Button>
          <Upload {...loadCSVFile(onChangeUpload)}>
            <Button icon={<UploadOutlined />}>Upload CSV</Button>{' '}
          </Upload>
        </Space>
      </Space>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <CommonTableContainer {...jobPositionTableProps} />
      </div>
    </div>
  );
};

export default JobPositionManagementContainer;
