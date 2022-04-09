import { Modal, Space, Tooltip } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import CommonTableContainer from '../../CommonTableComponent/CommonTableComponent.container';
import JobFairDetailModalContainer from '../../JobFairDetail/JobFairDetailModal.container';
import JobFairForAdminColumn from '../../CommonTableComponent/columns/JobFairForAdmin.column';
import React, { useLayoutEffect, useState } from 'react';
import ViewRegistrationButtonComponent from '../../../components/customized-components/ViewRegistrationButton/ViewRegistrationButton.component';

const JobFairHappeningContainer = () => {
  //TODO: fetch API later
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  //TODO: fetch API later
  // eslint-disable-next-line no-unused-vars
  const [totalElements, setTotalElements] = useState(0);
  //modal
  const [jobFairId, setJobFairId] = useState('');
  const [creatorId, setCreatorId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const fetchData = async () => {
    //TODO: fetch API later
    // getJobFairHappeningForAdmin(currentPage, pageSize)
    //   .then((res) => {
    //     setTotalElements(res.data.totalElements);
    //     const result = mapperResponseJobFairForAdmin(res).map((item) => ({
    //       ...item,
    //       key: 'HAPPENING'
    //     }));
    //     setData([...result]);
    //   })
    //   .catch((err) => {
    //     notification['error']({
    //       message: `Error: ${err}`
    //     });
    //   });
  };

  useLayoutEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);

    setPageSize(pageSize);
  };

  const onOk = () => {
    setModalVisible(false);
  };

  const onCancel = () => {
    setModalVisible(false);
  };

  const jobFairDetailProps = {
    jobFairId,
    creatorId,
    jobFairList: [...data],
    //TODO: check whether this prop would be used ?
    visible: modalVisible
  };

  const handleViewModal = (id, creatorId) => {
    setModalVisible(true);
    setJobFairId(id);
    setCreatorId(creatorId);
  };

  const jobFairTableProps = {
    tableData: data,
    tableColumns: JobFairForAdminColumn,
    onSearch: () => {
      //TODO: fetch data for search
    },
    extra: [
      {
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
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord: totalElements
    }
  };

  return (
    <>
      <Modal title='Job Fair Detail' visible={modalVisible} onOk={onOk} onCancel={onCancel} width={1300}>
        <JobFairDetailModalContainer {...jobFairDetailProps} />
      </Modal>
      <CommonTableContainer {...jobFairTableProps} />
    </>
  );
};

export default JobFairHappeningContainer;
