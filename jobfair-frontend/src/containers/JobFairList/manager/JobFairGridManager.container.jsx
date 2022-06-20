import './JobFairGridManager.styles.scss';
import { Input, Typography, notification } from 'antd';
import { LoadingComponent } from '../../../components/commons/Loading/Loading.component';
import { PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import { getAllJobFairAPI } from '../../../services/jobhub-api/JobFairControllerService';
import JobFairGridComponent from '../../../components/customized-components/JobFairGrid/JobFairGrid.component';
import React, { useEffect, useState } from 'react';

const { Search } = Input;

const JobFairGridManagerContainer = () => {
  const [data, setData] = useState();
  const history = useHistory();

  const fetchData = async () => {
    const res = await getAllJobFairAPI({});
    const content = res.data.content;
    content.unshift({ isFirst: true });
    setData(content);
  };

  const searchJobFair = async (searchValue) => {
    try {
      const res = await getAllJobFairAPI({ name: searchValue });
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
    <LoadingComponent isWholePage={true} />
  );
};

export default JobFairGridManagerContainer;
