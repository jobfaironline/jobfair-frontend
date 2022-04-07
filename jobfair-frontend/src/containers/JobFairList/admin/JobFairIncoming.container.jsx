import { MoreOutlined } from '@ant-design/icons';
import { Space, Tooltip, notification } from 'antd';
import { getJobFairIncomingForAdmin } from '../../../services/job-fair-controller/JobFairConTrollerService';
import { mapperResponseJobFairForAdmin } from '../../../utils/mapperJobFairDetail';
import JobFairDetailModalContainer from '../../JobFairDetail/JobFairDetailModal.container';
import JobFairTableForAdminComponent from '../../../components/JobFairTable/JobFairTableForAdmin.component';
import PaginationComponent from '../../../components/commons/PaginationComponent/Pagination.component';
import React, { useLayoutEffect, useState } from 'react';
import ViewRegistrationButtonComponent from '../../../components/ViewRegistrationButton/ViewRegistrationButton.component';

const JobFairIncomingContainer = () => {
  const [data, setData] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5000);
  //modal
  const [jobFairId, setJobFairId] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [totalElements, setTotalElements] = useState(0);

  const fetchData = async () => {
    getJobFairIncomingForAdmin(currentPage, pageSize)
      .then((res) => {
        setTotalElements(res.data.totalElements);
        const result = mapperResponseJobFairForAdmin(res).map((item) => ({
          ...item,
          key: 'NOT_YET'
        }));
        setData([...result]);
      })
      .catch((err) => {
        notification['error']({
          message: `Error: ${err}`
        });
      });
  };

  useLayoutEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };
  const modalProps = {
    jobFairId,
    creatorId,
    visible: modalVisible,
    setModalVisible,
    jobFairList: [...data]
  };

  const handleViewModal = (id, creatorId) => {
    setModalVisible(true);
    setJobFairId(id);
    setCreatorId(creatorId);
  };

  return (
    <>
      <JobFairDetailModalContainer {...modalProps} />
      <JobFairTableForAdminComponent
        data={data}
        editable
        extra={{
          title: 'Actions',
          key: 'action',
          width: '6rem',
          render: (text, record) => (
            <Space size='middle'>
              <Tooltip placement='top' title='View detail'>
                <a onClick={() => handleViewModal(record.id, record.creatorId)}>
                  <MoreOutlined />
                </a>
              </Tooltip>
              <ViewRegistrationButtonComponent status={record.status} id={record.id} />
            </Space>
          )
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'end', padding: '1rem' }}>
        <PaginationComponent data={data} handlePageChange={handlePageChange} totalRecord={totalElements} />
      </div>
    </>
  );
};

export default JobFairIncomingContainer;
