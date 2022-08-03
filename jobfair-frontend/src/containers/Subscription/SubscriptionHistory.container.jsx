import { Button, Form, Modal, Tooltip, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { REQUIRED_VALIDATOR } from '../../validate/GeneralValidation';
import { faEye, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import {
  getAllCompanySubscriptionsAPI,
  getInvoiceAPI,
  sendRequestToRefund
} from '../../services/jobhub-api/SubscriptionControllerService';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useEffect, useState } from 'react';
import SubscriptionHistoryTableColumn from './SubscriptionHistoryTable.column';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const SubscriptionHistoryContainer = () => {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);

  const [id, setId] = useState();
  const [form] = Form.useForm();

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
        name: item.subscriptionPlan.name,
        description: item.subscriptionPlan.description,
        status: item.jobfairQuota === 0 ? 'OUT_OF_STOCK' : item.status,
        ...item
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

  const handleSendRequestToRefund = async (values) => {
    try {
      const body = {
        reason: values.reason
      };
      const res = await sendRequestToRefund(body, id);
      if (res.status === 200) {
        notification['success'] = {
          message: 'Send request to refund successfully!'
        };
        setVisible(false);
        fetchData();
      }
    } catch (err) {
      notification['error'] = {
        message: 'Send request to refund failed!'
      };
    }
  };

  const handleOpenRefundModal = (id) => {
    setVisible(true);
    setId(id);
  };

  const RequestToRefundForm = () => (
    <Form
      form={form}
      name='register'
      onFinish={handleSendRequestToRefund}
      scrollToFirstError
      layout='vertical'
      labelCol={21}
      wrapperCol={21}>
      <Form.Item
        name={'reason'}
        rules={[REQUIRED_VALIDATOR('Why you want to refund?')]}
        label={'Why you want to refund?'}>
        <TextArea showCount min={1} max={400} />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Send request
        </Button>
      </Form.Item>
    </Form>
  );

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
            <Tooltip title='Refund'>
              <Button type='link' onClick={() => handleOpenRefundModal(record.id)}>
                <FontAwesomeIcon icon={faMoneyBill} />
              </Button>
            </Tooltip>
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
        <Modal
          className={'add-employee-modal'}
          visible={visible}
          onCancel={() => setVisible(false)}
          title={'Send request to refund'}
          footer={null}>
          <RequestToRefundForm />
        </Modal>
      ) : null}
      <CommonTableContainer {...tableProps} />
    </div>
  );
};

export default SubscriptionHistoryContainer;
