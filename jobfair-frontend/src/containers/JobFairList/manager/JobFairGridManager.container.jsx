import { Input, Spin } from 'antd';
import { getJobFairAPI } from '../../../services/jobhub-api/JobFairConTrollerService';
import JobFairGridComponent from '../../../components/customized-components/JobFairList/JobFairGrid.component';
import React, { useEffect, useState } from 'react';

const JobFairGridManagerContainer = () => {
  const [data, setData] = useState();

  const fetchData = async (searchValue) => {
    const res = await getJobFairAPI(searchValue);
    console.log(res);
    const content = res.data.content;
    console.log(content);
    setData(content);
  };

  useEffect(() => {
    fetchData('');
  }, []);

  const handleOnSearch = (e) => {
    const searchValue = e.target.value;
    fetchData(searchValue);
  };

  return data ? (
    <>
      <Input placeholder='Search by job fair title' onChange={(e) => handleOnSearch(e)} style={{ width: 200 }} />
      <JobFairGridComponent data={data} />
    </>
  ) : (
    <Spin />
  );
};

export default JobFairGridManagerContainer;
