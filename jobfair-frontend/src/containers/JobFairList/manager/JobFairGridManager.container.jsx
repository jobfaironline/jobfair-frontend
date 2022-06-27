import './JobFairGridManager.styles.scss';
import { Input, Select, Typography, notification } from 'antd';
import { JOB_FAIR_STATUS } from '../../../constants/JobFairConst';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import { getAllJobFairAPI } from '../../../services/jobhub-api/JobFairControllerService';
import JobFairGridComponent from '../../../components/customized-components/JobFairGrid/JobFairGrid.component';
import PaginationComponent from '../../../components/commons/PaginationComponent/Pagination.component';
import React, { useEffect, useState } from 'react';

const { Search } = Input;
const { Option } = Select;

const JobFairGridManagerContainer = () => {
  //pagination
  const [totalRecord, setTotalRecord] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(9);

  const [data, setData] = useState();
  const history = useHistory();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchValue, setSearchValue] = useState('');

  const fetchData = async () => {
    try {
      const status = filterStatus === 'ALL' ? null : filterStatus;
      const res = await getAllJobFairAPI({ offset: currentPage, pageSize, name: searchValue, status });
      const content = res.data.content;
      content.unshift({ isFirst: true });
      setData(content);
      setTotalRecord(res.data.totalElements);
    } catch (e) {
      notification['error']({
        message: `Error occurred: ${e.response.data.message}`
      });
    }
  };

  const onClick = async (jobFairId) => {
    try {
      const url = generatePath(PATH_COMPANY_MANAGER.CHECKLIST, {
        jobFairId
      });
      history.push(url);
    } catch (e) {
      notification['error']({
        message: `Error occurred: ${e.response.data.message}`
      });
    }
  };

  const onAddJobFair = () => {
    history.push(PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchValue, filterStatus]);

  const handleOnSearch = (searchValue) => {
    setSearchValue(searchValue);
  };

  const handleFilter = (value) => {
    setFilterStatus(value);
  };

  const handlePageChange = (page, pageSize) => {
    //-1 for addition 1 empty card
    if (page > 0) setCurrentPage(page - 1);
    else setCurrentPage(page);
    setPageSize(pageSize - 1);
  };

  return data ? (
    <div className={'job-fair-grid-manager'}>
      <div className={'header'}>
        <Typography.Title level={2} style={{ marginRight: '3rem' }}>
          My Job fair
        </Typography.Title>
        <Search
          className={'search-bar'}
          placeholder='Search by job fair title'
          onSearch={(value) => handleOnSearch(value)}
        />
        <Select style={{ width: '100px' }} defaultValue={'ALL'} onChange={handleFilter}>
          <Option value={JOB_FAIR_STATUS.PUBLISH}>{JOB_FAIR_STATUS.PUBLISH}</Option>
          <Option value={JOB_FAIR_STATUS.DRAFT}>{JOB_FAIR_STATUS.DRAFT}</Option>
          <Option value={'ALL'}>ALL</Option>
        </Select>
      </div>
      <JobFairGridComponent data={data} onClick={onClick} onAddJobFair={onAddJobFair} role='COMPANY_MANAGER' />
      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <div style={{ marginLeft: 'auto' }}>
          <PaginationComponent handlePageChange={handlePageChange} totalRecord={totalRecord} />
        </div>
      </div>
    </div>
  ) : (
    <LoadingComponent isWholePage={true} />
  );
};

export default JobFairGridManagerContainer;
