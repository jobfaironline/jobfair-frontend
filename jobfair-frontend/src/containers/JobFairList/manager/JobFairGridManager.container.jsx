import { Input, Spin } from 'antd';
import { getJobFairAPI, searchJobFairAPI } from '../../../services/jobhub-api/JobFairConTrollerService';
import JobFairGridComponent from '../../../components/customized-components/JobFairList/JobFairGrid.component';
import React, { useEffect, useState } from 'react';

const JobFairGridManagerContainer = () => {
  const [data, setData] = useState();

  const fetchData = async () => {
    const res = await getJobFairAPI();
    const content = res.data.content;
    setData(content);
  };

  const searchJobFair = async (searchValue) => {
    const res = await searchJobFairAPI(searchValue);
    const content = res.data.content;
    setData(content);
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
      <JobFairGridComponent data={data} />
    </div>
  ) : (
    <Spin />
  );
};

export default JobFairGridManagerContainer;
