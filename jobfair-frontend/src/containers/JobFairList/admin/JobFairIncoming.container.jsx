import { ADMIN_JOB_FAIR_STATUS } from '../../../constants/JobFairConst';
import { EyeOutlined } from '@ant-design/icons';
import { Modal, Space, Tooltip, notification } from 'antd';
import { getAllJobFairForAdminAPI } from '../../../services/jobhub-api/JobFairControllerService';
import { mapperResponseJobFairForAdmin } from '../../../utils/mapperJobFairDetail';
import CommonTableContainer from '../../CommonTableComponent/CommonTableComponent.container';
import JobFairDetailModalContainer from '../../JobFairDetail/JobFairDetailModal.container';
import JobFairForAdminColumn from '../../CommonTableComponent/columns/JobFairForAdmin.column';
import React, { useEffect, useState } from 'react';

const JobFairIncomingContainer = () => {
  const [data, setData] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //modal
  const [jobFairId, setJobFairId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [totalElements, setTotalElements] = useState(0);

  const fetchData = async () => {
    try {
      const res = await getAllJobFairForAdminAPI({ status: ADMIN_JOB_FAIR_STATUS.COMING_SOON });
      const result = mapperResponseJobFairForAdmin(res).map((item) => ({
        ...item,
        key: ADMIN_JOB_FAIR_STATUS.COMING_SOON
      }));
      setTotalElements(res.data.totalElements);
      setData([...result]);
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  const handleViewModal = (id) => {
    setModalVisible(true);
    setJobFairId(id);
  };
  const onOk = () => {
    setModalVisible(false);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const jobFairTableProps = {
    tableData: data,
    tableColumns: JobFairForAdminColumn,
    extra: [
      {
        title: 'Actions',
        key: 'action',
        width: '6rem',
        render: (text, record) => (
          <Space size='middle'>
            <Tooltip placement='top' title='View detail'>
              <a onClick={() => handleViewModal(record.id)}>
                <EyeOutlined />
              </a>
            </Tooltip>
          </Space>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord: totalElements
    }
  };

  return (
    <>
      <Modal title='Job Fair Detail' visible={modalVisible} onOk={onOk} onCancel={onCancel} width={500}>
        <JobFairDetailModalContainer jobFairId={jobFairId} />
      </Modal>
      <CommonTableContainer {...jobFairTableProps} />
    </>
  );
};

export default JobFairIncomingContainer;
