import { Button, Card, Col, Divider, Input, Modal, Row, Tag, Timeline, Tooltip, Typography, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationType } from '../../constants/NotificationConstant';
import { convertToUTCString } from '../../utils/common';
import {
  evaluateRequestToRefund,
  getAllSubscriptionForAdmin,
  getSubscriptionById
} from '../../services/jobhub-api/SubscriptionControllerService';
import { faEye, faFileEdit } from '@fortawesome/free-solid-svg-icons';
import { selectWebSocket } from '../../redux-flow/web-socket/web-socket-selector';
import { useSelector } from 'react-redux';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import PaymentReportTableColumn from './PaymentReportTable.column';
import React, { useEffect, useState } from 'react';

const { Search } = Input;
const { Text, Title } = Typography;
const PaymentReportContainer = () => {
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [evaluateModal, setEvaluateModal] = useState(false);

  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  //

  const webSocketClient = useSelector(selectWebSocket);

  const SubscriptionDetailComponent = ({ item }) => (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Card>
          <Title level={3}>Product information: </Title>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Total price: ${item?.price}.00</Col>
            <Col span={8}>Name: {item?.subscriptionPlan?.name}</Col>
          </Row>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Description: {item?.subscriptionPlan?.description}</Col>
            <Col span={8}>Valid period: {item?.subscriptionPlan?.validPeriod} months</Col>
          </Row>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>
              Status: <Tag color={item.status === 'ACTIVE' ? 'green' : 'red'}>{item?.status} </Tag>
            </Col>
            <Col span={8}>Available job fair: {item?.jobfairQuota} left</Col>
          </Row>
        </Card>
        <Divider />
        <Card>
          <Title level={3}>Timeline: </Title>
          <Timeline>
            <Timeline.Item color='green'>Start at: {convertToUTCString(item?.currentPeriodStart)}</Timeline.Item>
          </Timeline>
          <Timeline>
            <Timeline.Item color='green'>End at: {convertToUTCString(item?.currentPeriodEnd)}</Timeline.Item>
          </Timeline>
        </Card>
        <Divider />
        <Card>
          <Title level={3}>Payment detail: </Title>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Payment Id: ${item.id}</Col>
          </Row>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Period start: {convertToUTCString(item?.currentPeriodStart)}</Col>
            <Col span={8}>Period end: {convertToUTCString(item?.currentPeriodEnd)}</Col>
          </Row>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Payment method: VISA</Col>
            {item.cancelAt ? <Col span={8}>Cancel at: {convertToUTCString(item?.cancelAt)}</Col> : null}
          </Row>
          <Row align='left' gutter={[4, 24]}>
            {item.refundStatus ? <Col span={8}>Refund status: {item?.refundStatus}</Col> : null}
            {item.refundReason ? <Col span={8}>Refund reason: {item?.refundReason}</Col> : null}
          </Row>
        </Card>
        <Divider />
      </div>
    </div>
  );

  const handleViewDetail = async (id) => {
    const res = await getSubscriptionById(id);
    setVisible(true);
    setItem(res.data);
  };

  const fetchData = async () => {
    const res = await getAllSubscriptionForAdmin(searchValue, 'ASC', currentPage, pageSize, 'currentPeriodStart');
    setData(
      res.data.content?.map((item, index) => ({
        ...item,
        no: index + 1,
        publishedJobFair: item.subscriptionPlan.jobfairQuota - item.jobfairQuota,
        status: new Date().getTime() > item.currentPeriodEnd ? 'EXPIRED' : item.status
      }))
    );
    setTotalRecord(res.data.totalElements);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchValue]);

  useEffect(() => {
    webSocketClient.addEvent('new-request-refund', async (notificationData) => {
      if (notificationData.notificationType === NotificationType.NOTI) await fetchData();
    });
    return () => {
      webSocketClient.removeEvent('new-request-refund');
    };
  }, []);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleEvaluateRequest = async (key) => {
    let res;
    if (item.jobfairQuota === 0) {
      notification['error']({
        message: 'You have published all job fairs in your package. Cannot refund!'
      });
      setEvaluateModal(false);
      return;
    }
    switch (key) {
      case 'REFUNDED':
        try {
          res = await evaluateRequestToRefund('REFUNDED', item.id);
          if (res.status === 200) {
            notification['success']({
              message: 'Approved refund request'
            });
          }
          setEvaluateModal(false);
          fetchData();
        } catch (err) {
          notification['error']({
            message: `${err.response.data.message}`
          });
        }
        break;
      case 'REFUND_DECLINED':
        try {
          res = await evaluateRequestToRefund('REFUND_DECLINED', item.id);
          if (res.status === 200) {
            notification['success']({
              message: 'Rejected refund request'
            });
          }
          setEvaluateModal(false);
          fetchData();
        } catch (err) {
          notification['error']({
            message: `${err.response.data.message}`
          });
        }
        break;
      default:
    }
  };

  const handleShowEvaluateModal = (item) => {
    setItem(item);
    setEvaluateModal(true);
  };

  const tableProps = {
    tableData: data,
    tableColumns: PaymentReportTableColumn,
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
            {record.refundStatus === 'REQUESTED_REFUND' && (
              <Tooltip title='Evaluate refund request'>
                <Button type='link' onClick={() => handleShowEvaluateModal(record)}>
                  <FontAwesomeIcon icon={faFileEdit} />
                </Button>
              </Tooltip>
            )}
          </>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };

  const handleOnSearch = (values) => {
    setSearchValue(values);
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      {evaluateModal && (
        <Modal
          width='30rem'
          height='20rem'
          title={'Evaluate request to refund'}
          visible={evaluateModal}
          onCancel={() => setEvaluateModal(false)}
          footer={null}
          centered={true}>
          <div>Refund message: {item.refundReason}</div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '2rem' }}>
            <div style={{ marginRight: '1rem' }}>
              <Button type='primary' onClick={() => handleEvaluateRequest('REFUNDED')}>
                Approve
              </Button>
            </div>
            <div>
              <Button type='primary' onClick={() => handleEvaluateRequest('REFUND_DECLINED')}>
                Reject
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {visible && (
        <Modal
          width='1000px'
          title={'Subscription detail'}
          visible={visible}
          onCancel={() => setVisible(false)}
          footer={null}
          centered={true}>
          <SubscriptionDetailComponent item={item} />
        </Modal>
      )}
      <Card style={{ borderRadius: '10px', height: '100%', marginTop: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Typography.Title level={3}>Payments report</Typography.Title>
          <Search
            placeholder='Search payment by company name'
            onSearch={handleOnSearch}
            style={{ width: '20rem', marginLeft: '2rem' }}
          />
        </div>
        <CommonTableContainer {...tableProps} />
      </Card>
    </div>
  );
};

export default PaymentReportContainer;
