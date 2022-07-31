import { Button, Modal, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { getAllCompanySubscriptionsAPI, getInvoiceAPI } from '../../services/jobhub-api/SubscriptionControllerService';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useEffect, useState } from 'react';
import SubscriptionHistoryTableColumn from './SubscriptionHistoryTable.column';

const { Title } = Typography;

const SubscriptionHistoryContainer = () => {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  //

  const fetchData = async () => {
    try {
      const res = await getAllCompanySubscriptionsAPI('ASC', 0, pageSize);
      if (res.status === 204) {
        notification['info']({
          message: 'The subscription history is empty'
        });
      }
      if (res.status === 404) {
        notification['error']({
          message: 'Error when get subscription history'
        });
      }
      setTotalRecord(res.data.totalElements);
      const result = res.data.content.map((item, index) => ({
        no: index + 1,
        id: item.id,
        currentPeriodStart: item.currentPeriodStart,
        currentPeriodEnd: item.currentPeriodEnd,
        price: item.price
      }));
      setData(result);
    } catch (err) {
      //
    }
  };

  useEffect(async () => {
    await fetchData();
  }, [currentPage, pageSize]);

  const handleViewDetail = async (id) => {
    const res = await getInvoiceAPI(id);
    return window.open(res.data);
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const tableProps = {
    tableData: data,
    tableColumns: SubscriptionHistoryTableColumn,
    extra: [
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <Button type='link' onClick={() => handleViewDetail(record.id)}>
            <FontAwesomeIcon icon={faEye} />
          </Button>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };
  return (
    <div style={{ marginTop: '5rem' }}>
      <Title level={3}>My subscription history</Title>
      {visible ? (
        <Modal
          visible={visible}
          onOk={handleCloseModal}
          onCancel={handleCloseModal}
          title={'Subscription History'}></Modal>
      ) : null}
      <CommonTableContainer {...tableProps} />
    </div>
  );
};

export default SubscriptionHistoryContainer;
