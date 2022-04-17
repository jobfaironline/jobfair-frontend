import { Input, Spin } from 'antd';
import { JOB_FAIR_STATUS } from '../../../constants/JobFairConst';
import { PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import {
  getAllJobFairAPI,
  getJobFairByIDAPI,
  searchJobFairAPI
} from '../../../services/jobhub-api/JobFairControllerService';
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
    const jobFairData = (await getJobFairByIDAPI(jobFairId)).data;
    if (jobFairData.status === JOB_FAIR_STATUS.PUBLISH)
      history.push(PATH_COMPANY_MANAGER.JOB_FAIR_DETAIL_PAGE, { jobFairId });
    else history.push(PATH_COMPANY_MANAGER.ORGANIZE_JOB_FAIR_PAGE, { step: 4, jobFairId });
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
