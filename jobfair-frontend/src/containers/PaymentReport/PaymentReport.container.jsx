import { Button, Card, Col, Divider, Input, Modal, PageHeader, Row, Tag, Timeline, Tooltip, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_ADMIN } from '../../constants/Paths/Path';
import { convertToUTCString } from '../../utils/common';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { generatePath } from 'react-router';
import {
  getAllSubscriptionForAdmin,
  getSubscriptionById
} from '../../services/jobhub-api/SubscriptionControllerService';
import { useHistory } from 'react-router-dom';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import PaymentReportTableColumn from './PaymentReportTable.column';
import React, { useEffect, useState } from 'react';

const { Search } = Input;
const { Text, Title } = Typography;
const PaymentReportContainer = () => {
  const history = useHistory();

  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState({});
  const [searchValue, setSearchValue] = useState('');
  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  //

  const SubscriptionDetailComponent = ({ item }) => (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Card>
          <Title level={3}>Product information: </Title>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Total price: ${item.price}.00</Col>
            <Col span={8}>Name: {item.subscriptionPlan.name}</Col>
          </Row>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Description: {item.subscriptionPlan.description}</Col>
            <Col span={8}>Valid period: {item.subscriptionPlan.validPeriod} months</Col>
          </Row>
          <Row align='left' gutter={[4, 24]}>
            <div>
              Status: <Tag color={item.status === 'ACTIVE' ? 'green' : 'red'}>{item.status} </Tag>
            </div>
          </Row>
        </Card>
        <Divider />
        <Card>
          <Title level={3}>Timeline: </Title>
          <Timeline>
            <Timeline.Item color='green'>Start at: {convertToUTCString(item.currentPeriodStart)}</Timeline.Item>
          </Timeline>
          <Timeline>
            <Timeline.Item color='green'>End at: {convertToUTCString(item.currentPeriodEnd)}</Timeline.Item>
          </Timeline>
        </Card>
        <Divider />
        <Card>
          <Title level={3}>Payment detail: </Title>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Payment Id: ${item.id}</Col>
            <Col span={8}>
              Status: <Tag>{item.status}</Tag>
            </Col>
          </Row>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Period start: {convertToUTCString(item.currentPeriodStart)}</Col>
            <Col span={8}>Period end: {convertToUTCString(item.currentPeriodEnd)}</Col>
          </Row>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Payment method: VISA</Col>
            <Col span={8}>Period end: {item.cancelAt ? convertToUTCString(item.cancelAt) : 'Not cancel yet'}</Col>
          </Row>
          <Row align='left' gutter={[4, 24]}>
            <Col span={8}>Refund status: {item.refundStatus ? item.refundStatus : 'Not refund yet'}</Col>
            <Col span={8}>Refund reason: {item.refundReason ? item.refundReason : 'Empty'}</Col>
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
    const res = await getAllSubscriptionForAdmin(searchValue, 'ASC', 0, pageSize, 'currentPeriodStart');
    setData(
      res.data.content.map((item, index) => ({
        no: index + 1,
        ...item
      }))
    );
    setTotalRecord(res.data.totalElements);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchValue]);

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
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
      <PageHeader
        onBack={() => {
          const url = generatePath(PATH_ADMIN.JOB_FAIR_LIST_PAGE);
          history.push(url);
        }}
        title={
          <div style={{ width: '20vw', paddingBottom: '0.5rem', borderBottom: '1.5px solid #00000026' }}>
            Payments report
          </div>
        }
      />
      {/*<Card style={{ borderRadius: '10px', height: '100%' }}>*/}
      {/*  <Row gutter={20} style={{ marginTop: '1rem' }}>*/}
      {/*    <Col xs={24} xxl={12}>*/}
      {/*      <div>From ... To ..</div>*/}
      {/*      <GenericPieChart data={[]} config={{ color: 'blue' }} title={'Total Revenue'} />*/}
      {/*    </Col>*/}
      {/*    <Col xs={24} xxl={12}>*/}
      {/*      <GenericDonutChart data={[]} config={{ color: 'blue' }} title={'CV matching ratio'} />*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</Card>*/}
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
        <Typography.Title level={3}>Payments report</Typography.Title>
        <div className={'search-filter-container'}>
          <Search placeholder='Search payment' className={'search-bar'} onSearch={handleOnSearch} />
        </div>
        <CommonTableContainer {...tableProps} />
      </Card>
    </div>
  );
};

export default PaymentReportContainer;
