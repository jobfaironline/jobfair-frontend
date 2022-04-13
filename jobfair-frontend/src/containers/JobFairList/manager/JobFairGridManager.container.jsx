import { Input, Spin } from 'antd';
import { PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import { getAllJobFairAPI, searchJobFairAPI } from '../../../services/jobhub-api/JobFairControllerService';
import { useHistory } from 'react-router-dom';
import JobFairGridComponent from '../../../components/customized-components/JobFairList/JobFairGrid.component';
import React, { useEffect, useState } from 'react';

const JobFairGridManagerContainer = () => {
  const [data, setData] = useState();
  const history = useHistory();

  const fetchData = async () => {
    const res = await getAllJobFairAPI();
    const content = res.data.content;
    setData(content);
  };

  const searchJobFair = async (searchValue) => {
    const res = await searchJobFairAPI(searchValue);
    const content = res.data.content;
    setData(content);
  };

  const onClick = async (jobFairId) => {
    history.push(PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE, { jobFairId });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOnSearch = (e) => {
    const searchValue = e.target.value;
    searchJobFair(searchValue);
  };

  return data ? (
    <div>
      <div style={{ display: 'flex', paddingBottom: '10px' }}>
        <Input
          placeholder='Search by job fair title'
          onChange={(e) => handleOnSearch(e)}
          style={{ width: 200, marginLeft: 'auto' }}
        />
      </div>
      <JobFairGridComponent data={data} onClick={onClick} />
    </div>
  ) : (
    <Spin />
  );
};

export default JobFairGridManagerContainer;
