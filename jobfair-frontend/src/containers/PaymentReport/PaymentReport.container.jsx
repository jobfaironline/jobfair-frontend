import { Button, Card, Input, PageHeader, Tooltip, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PATH_ADMIN } from '../../constants/Paths/Path';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { generatePath } from 'react-router';
import { getAllSubscriptionForAdmin, getInvoiceAPI } from '../../services/jobhub-api/SubscriptionControllerService';
import { useHistory } from 'react-router-dom';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import PaymentReportTableColumn from './PaymentReportTable.column';
import React, { useEffect, useState } from 'react';

const { Search } = Input;
const PaymentReportContainer = () => {
  const history = useHistory();

  const [data, setData] = useState();
  const [searchValue, setSearchValue] = useState('');
  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  //

  const handleViewDetail = async (id) => {
    const res = await getInvoiceAPI(id);
    return window.open(res.data);
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
      <Card style={{ borderRadius: '10px', height: '100%', marginTop: '1rem' }}>
        <Typography.Title level={3}>Payments report</Typography.Title>
        <div className={'search-filter-container'}>
          <Search placeholder='Search employee' className={'search-bar'} onSearch={handleOnSearch} />
        </div>
        <CommonTableContainer {...tableProps} />
      </Card>
    </div>
  );
};

export default PaymentReportContainer;
