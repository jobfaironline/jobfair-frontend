import { CategoriesConst, SubCategories } from '../../../constants/CompanyProfileConstant';
import { CountryConst } from '../../../constants/AttendantConstants';
import { Input, Select } from 'antd';
import { JOB_FAIR_STATUS } from '../../../constants/JobFairConst';
import { PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path';
import { getJobFairByIDAPI, searchJobFairAPI } from '../../../services/jobhub-api/JobFairControllerService';
import { useHistory } from 'react-router-dom';
import JobFairGridComponent from '../../../components/customized-components/JobFairGrid/JobFairGrid.component';
import React, { useEffect, useState } from 'react';

const { Search } = Input;
const { Option } = Select;
const JobFairGridAttendantContainer = () => {
  const [data, setData] = useState();
  const history = useHistory();

  const fetchData = async () => {
    // const res = await getAllJobFairAPI();
    // const content = res.data.content;
    // setData(content);
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

  const filterJobFair = (key) => {
    switch (key) {
      case 'jobName':
      case 'jobCategory':
      case 'location':
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', paddingBottom: '10px' }}>
        <Select placeholder='Filter by job name' style={{ width: 200 }} onChange={() => filterJobFair('jobName')}>
          {CategoriesConst.map((item) => (
            <Option value={item.value}>{item.label}</Option>
          ))}
        </Select>
        <Select
          placeholder='Filter by job category'
          style={{ width: 200 }}
          onChange={() => filterJobFair('jobCategory')}>
          {SubCategories.map((item) => (
            <Option value={item.value}>{item.label}</Option>
          ))}
        </Select>
        <Select placeholder='Filter by location' style={{ width: 200 }} onChange={() => filterJobFair('location')}>
          {CountryConst.map((item) => (
            <Option value={item.id}>{item.name}</Option>
          ))}
        </Select>
        <Search
          placeholder='Search by company name'
          onSearch={(e) => handleOnSearch(e)}
          style={{ width: 300, marginLeft: 'auto' }}
        />
      </div>
      <JobFairGridComponent data={data} onClick={onClick} role='ATTENDANT' />
    </div>
  );
};

export default JobFairGridAttendantContainer;
