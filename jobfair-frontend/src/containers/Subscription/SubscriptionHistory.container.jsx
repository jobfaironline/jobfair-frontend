import { Button, Checkbox, Modal, Tooltip, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  cancelSubscriptionAPI,
  getAllCompanySubscriptionsAPI,
  getInvoiceAPI
} from '../../services/jobhub-api/SubscriptionControllerService';
import { faCancel, faEye } from '@fortawesome/free-solid-svg-icons';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useEffect, useState } from 'react';
import SubscriptionHistoryTableColumn from './SubscriptionHistoryTable.column';

const { Title } = Typography;

const SubscriptionHistoryContainer = () => {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [forceRender, setForceRender] = useState(true);

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
  }, [currentPage, pageSize, forceRender]);

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

  const handleCancelSubscription = async () => {
    const res = await cancelSubscriptionAPI();
    notification['success']({
      message: res.data,
      duration: 2
    });
    setVisible(false);
    await fetchData();
    setForceRender(false);
  };

  const openCancelModal = () => {
    setVisible(true);
  };

  const tableProps = {
    tableData: data,
    tableColumns: SubscriptionHistoryTableColumn,
    extra: [
      {
        title: 'Actions',
        key: 'action',
        render: (text, record) => (
          <>
            <Tooltip title='View detail'>
              <Button type='link' onClick={() => handleViewDetail(record.id)}>
                <FontAwesomeIcon icon={faEye} />
              </Button>
            </Tooltip>
            {forceRender ? (
              <Tooltip title='Cancel subscription'>
                <Button type='link' onClick={openCancelModal}>
                  <FontAwesomeIcon icon={faCancel} />
                </Button>
              </Tooltip>
            ) : null}
          </>
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
        <Modal visible={visible} onCancel={handleCloseModal} title={'Cancel subscription'} footer={null}>
          <Checkbox onChange={(e) => setIsAgree(e.target.checked)}>
            <span>
              By clicking this checkbox, you confirm that there will be NO REFUND after cancelling this current
              subscription
            </span>
          </Checkbox>
          {isAgree && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type='primary' onClick={handleCancelSubscription}>
                Ok
              </Button>
            </div>
          )}
        </Modal>
      ) : null}
      <CommonTableContainer {...tableProps} />
    </div>
  );
};

export default SubscriptionHistoryContainer;
