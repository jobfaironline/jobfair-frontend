import './JobFairGridManager.styles.scss';
import { Input, Typography, notification } from 'antd';
import { JOB_FAIR_STATUS } from '../../../constants/JobFairConst';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import {
  getAllJobFairAPI,
  getJobFairByIDAPI,
  searchJobFairAPI
} from '../../../services/jobhub-api/JobFairControllerService';
import { useHistory } from 'react-router-dom';
import JobFairGridComponent from '../../../components/customized-components/JobFairGrid/JobFairGrid.component';
import React, { useEffect, useState } from 'react';

const { Search } = Input;

const JobFairGridManagerContainer = () => {
  const [data, setData] = useState();
  const history = useHistory();

  const fetchData = async () => {
    const res = await getAllJobFairAPI();
    const content = res.data.content;
    content.unshift({ isFirst: true });
    setData(content);
  };

  const searchJobFair = async (searchValue) => {
    try {
      const res = await searchJobFairAPI(searchValue);
      const content = res.data.content;
      content.unshift({ isFirst: true });
      setData(content);
    } catch (e) {
      notification['error']({
        message: `Error occurred: ${e.response.data.message}`
      });
    }
  };

  const onClick = async (jobFairId) => {
    try {
      const jobFairData = (await getJobFairByIDAPI(jobFairId)).data;
      if (jobFairData.status === JOB_FAIR_STATUS.PUBLISH)
        history.push(PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE, { jobFairId });
      else history.push(PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE, { step: 4, jobFairId });
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
  }, []);

  const handleOnSearch = (searchValue) => {
    searchJobFair(searchValue);
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
      </div>
      <JobFairGridComponent data={data} onClick={onClick} onAddJobFair={onAddJobFair} role='COMPANY_MANAGER' />
    </div>
  ) : (
    <LoadingComponent />
  );
};

export default JobFairGridManagerContainer;
