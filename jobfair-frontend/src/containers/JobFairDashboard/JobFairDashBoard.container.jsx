import './JobFairDashBoard.container.scss';
import { Button, Col, Input, Modal, PageHeader, Row, Space, Tooltip, notification } from 'antd';
import { DashBoardJobPositionStatistics } from '../../components/customized-components/JobFairDashboard/DashBoardJobPositionStatistics.component';
import { DashboardCVStatistics } from '../../components/customized-components/JobFairDashboard/DashboardCVStatistics.component';
import { DownloadOutlined, EyeOutlined, LeftOutlined, ProjectFilled } from '@ant-design/icons';
import { ENDPOINT_JOB_FAIR_STATISTICS } from '../../constants/Endpoints/jobhub-api/StatisticsControllerEndpoint';
import { JobFairDashBoardBoothTable } from '../../components/customized-components/JobFairDashboard/JobFairDashboardBoothTable.component';
import { JobFairDashBoardGeneralInformation } from '../../components/customized-components/JobFairDashboard/JobFairDashboardGeneralInformation.component';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import {
  exportApplications,
  getAllApplicationForCompany
} from '../../services/jobhub-api/ApplicationControllerService';
import { generatePath } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useSWRFetch } from '../../hooks/useSWRFetch';
import ApplicationTableColumn from '../CommonTableComponent/columns/ApplicationTable.column';
import CommonTableContainer from '../CommonTableComponent/CommonTableComponent.container';
import React, { useCallback, useEffect, useState } from 'react';
import RoleType from '../../constants/RoleType';

const JobFairApplicationContainer = ({ jobFairId }) => {
  //pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [applicationData, setApplicationData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchValue]);

  const fetchData = async () => {
    const res = await getAllApplicationForCompany(
      currentPage,
      pageSize,
      ['PENDING', 'APPROVE', 'REJECT'],
      searchValue.toLowerCase(),
      searchValue.toLowerCase(),
      searchValue.toLowerCase(),
      'appliedDate',
      jobFairId
    );
    setApplicationData(res.data.content.map((application, index) => ({ ...application, no: index + 1 })));
    setTotalRecord(res.data.totalElements);
  };

  const handlePageChange = (page, pageSize) => {
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleDownloadCSV = async () => {
    try {
      const res = await exportApplications(jobFairId);
      const link = document.createElement('a');
      link.href = res.data;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  const applicationTableProps = {
    tableData: applicationData,
    tableColumns: ApplicationTableColumn(RoleType.COMPANY_MANAGER, 'APPROVE'),
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
              <a
                onClick={() => {
                  const url = generatePath(PATH_COMPANY_MANAGER.RESUME_DETAIL_PAGE, { id: record.id });
                  window.open(url);
                }}>
                <EyeOutlined />
              </a>
            </Tooltip>
          </Space>
        )
      }
    ],
    paginationObject: {
      handlePageChange,
      totalRecord
    }
  };

  return (
    <div>
      <div>
        <div style={{ marginBottom: '1rem', display: 'flex' }}>
          <Input.Search
            placeholder='Search application'
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            enterButton='Search'
            style={{ width: 500 }}
          />
          <Button type={'primary'} style={{ marginLeft: 'auto' }} onClick={handleDownloadCSV}>
            Export submitted CVs
            <DownloadOutlined />
          </Button>
        </div>
        <CommonTableContainer {...applicationTableProps} />
      </div>
    </div>
  );
};

const JobFairDashBoardContainer = ({ jobFairId }) => {
  const history = useHistory();
  const [modalVisibility, setModalVisibility] = useState(false);

  const { response, isLoading, isError } = useSWRFetch(`${ENDPOINT_JOB_FAIR_STATISTICS}/${jobFairId}`, 'GET');

  const closeModal = useCallback(() => {
    setModalVisibility(false);
  }, []);

  if (isLoading) return <LoadingComponent isWholePage={true} />;
  if (isError) {
    notification['error']({
      message: `Something went wrong! Try again latter!`,
      description: `There is problem while fetching data, try again later`,
      duration: 2
    });
    return null;
  }
  const data = response.data;

  return (
    <>
      <Modal
        visible={modalVisibility}
        width={'70vw'}
        title={'CVs list'}
        centered={true}
        onOk={closeModal}
        onCancel={closeModal}
        cancelButtonProps={{ style: { display: 'none' } }}>
        {modalVisibility ? <JobFairApplicationContainer jobFairId={jobFairId} /> : null}
      </Modal>
      <div style={{ marginBottom: '2rem' }} className={'job-fair-dashboard-container'}>
        <PageHeader
          backIcon={
            <Tooltip title={'Back to job fair check list'}>
              <LeftOutlined style={{ fontSize: '2rem' }} />
            </Tooltip>
          }
          onBack={() => {
            const url = generatePath(PATH_COMPANY_MANAGER.CHECKLIST, { jobFairId });
            history.push(url);
          }}
          title={
            <div
              style={{
                width: '30vw',
                paddingBottom: '0.5rem',
                borderBottom: '1.5px solid #00000026',
                fontWeight: 500,
                fontSize: '2rem'
              }}>
              <ProjectFilled style={{ marginRight: '5px' }} />
              Dashboard of '{data.jobFair.name}'
            </div>
          }
        />
        <JobFairDashBoardGeneralInformation data={data.generalStatistics} />
        <Row gutter={20} style={{ marginTop: '1rem' }}>
          <Col xs={24} xxl={12}>
            <DashboardCVStatistics
              data={data.cvStatistics}
              isBooth={false}
              openModal={() => setModalVisibility(true)}
            />
          </Col>
          <Col xs={24} xxl={12}>
            <DashBoardJobPositionStatistics data={data.jobPositions} />
          </Col>
        </Row>
        <div style={{ marginTop: '1rem' }}>
          <JobFairDashBoardBoothTable data={data.booths} />
        </div>
      </div>
    </>
  );
};

export default JobFairDashBoardContainer;
