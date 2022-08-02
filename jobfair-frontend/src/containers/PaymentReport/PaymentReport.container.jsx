import { Button, Card, Col, PageHeader, Row, Tooltip, Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GenericDonutChart } from '../../components/commons/Chart/GenericDonutChart.component';
import { GenericPieChart } from '../../components/commons/Chart/GenericPieChart.component';
import { PATH_ADMIN } from '../../constants/Paths/Path';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { generatePath } from 'react-router';
import { useHistory } from 'react-router-dom';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import PaymentReportTableColumn from './PaymentReportTable.column';
import React, { useState } from 'react';

const fakeData = [];

const PaymentReportContainer = () => {
  const history = useHistory();

  //pagination
  // eslint-disable-next-line no-unused-vars
  const [totalRecord, setTotalRecord] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState(10);
  //

  const handleViewDetail = () => {};

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };

  const tableProps = {
    tableData: fakeData,
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
  return (
    <div style={{ marginBottom: '2rem' }}>
      <PageHeader
        onBack={() => {
          const url = generatePath(PATH_ADMIN.JOB_FAIR_LIST_PAGE);
          history.push(url);
        }}
        title={
          <div style={{ width: '20vw', paddingBottom: '0.5rem', borderBottom: '1.5px solid #00000026' }}>
            Payments report: <span style={{ fontWeight: 400 }}>ABC</span>
          </div>
        }
      />
      <Card style={{ borderRadius: '10px', height: '100%' }}>
        <Row gutter={20} style={{ marginTop: '1rem' }}>
          <Col xs={24} xxl={12}>
            <div>From ... To ..</div>
            <GenericPieChart data={[]} config={{ color: 'blue' }} title={'Total Revenue'} />
          </Col>
          <Col xs={24} xxl={12}>
            <GenericDonutChart data={[]} config={{ color: 'blue' }} title={'CV matching ratio'} />
          </Col>
        </Row>
      </Card>
      <Card style={{ borderRadius: '10px', height: '100%', marginTop: '1rem' }}>
        <Typography.Title level={3}>Orders report</Typography.Title>
        <CommonTableContainer {...tableProps} />
      </Card>
    </div>
  );
};

export default PaymentReportContainer;
