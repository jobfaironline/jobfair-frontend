import './JobFairGridPublicContainer.styles.scss';
import { CategoriesConst, SubCategories } from '../../../constants/CompanyProfileConstant';
import { Divider, Input, Select, notification } from 'antd';
import { NotificationType } from '../../../constants/NotificationType';
import { PATH } from '../../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import { getCountryOrder } from '../../../utils/common';
import { getJobFairForAttendant } from '../../../services/jobhub-api/JobFairControllerService';
import { selectWebSocket } from '../../../redux-flow/web-socket/web-socket-selector';
import { useSelector } from 'react-redux';
import JobFairGridComponent from '../../../components/customized-components/JobFairGrid/JobFairGrid.component';
import React, { useEffect, useRef, useState } from 'react';

const { Search } = Input;
const { Option, OptGroup } = Select;

const JobFairGridPublicContainer = ({ role }) => {
  const webSocketClient = useSelector(selectWebSocket);
  const [data, setData] = useState([]);
  const history = useHistory();
  const [searchAndFilterValue, setSearchAndFilterValue] = useState({
    searchValue: '',
    category: '',
    country: ''
  });
  const latestData = useRef(data);
  useEffect(async () => {
    try {
      const res = await getJobFairForAttendant({
        name: searchAndFilterValue.searchValue,
        categoryId: searchAndFilterValue.category,
        countryId: searchAndFilterValue.country
      });
      latestData.current = res.data.content;
      setData(res.data.content);
    } catch (e) {
      notification['error']({
        message: `Error occurred: ${e.response.data.message}`
      });
    }
  }, [searchAndFilterValue]);

  useEffect(() => {
    if (role !== undefined) {
      webSocketClient.addEvent('chang-job-fair-view', changeJobFairView);
      return () => {
        webSocketClient.removeEvent('chang-job-fair-view');
      };
    }
  }, []);

  const changeJobFairView = (notificationData) => {
    if (!latestData.current || !notificationData) return;
    if (notificationData.notificationType === NotificationType.VISIT_JOB_FAIR) {
      const messageObject = JSON.parse(notificationData.message);
      const { jobFairId, count } = messageObject;
      const jobFair = latestData.current.find((jobFair) => jobFair.id === jobFairId);
      if (!jobFair) return;
      jobFair.visitCount = count;
      setData([...latestData.current]);
    }
  };

  const onClick = async (jobFairId) => {
    const url = generatePath(PATH.JOB_FAIR_LANDING_PAGE, {
      jobFairId
    });
    history.push(url);
  };

  const handleOnSearch = (searchValue) => {
    setSearchAndFilterValue((prevState) => ({ ...prevState, searchValue }));
  };

  const filterJobFair = (key, value) => {
    switch (key) {
      case 'category':
        setSearchAndFilterValue((prevState) => ({ ...prevState, category: value }));
        break;
      case 'location':
        setSearchAndFilterValue((prevState) => ({ ...prevState, country: value }));
        break;
    }
  };

  return (
    <div className={'job-fair-grid-public-container'}>
      <div className={'header'}>
        <Search
          placeholder='Search by company name'
          onSearch={(value) => handleOnSearch(value)}
          style={{ width: '30rem', marginRight: '5rem' }}
        />
        <Select
          style={{ width: '20rem' }}
          showSearch
          allowClear
          placeholder={'Filter by category'}
          onChange={(value) => filterJobFair('category', value)}
          onClear={() => filterJobFair('category', '')}
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: '8px 0' }} />
            </>
          )}>
          {CategoriesConst.map((category) => (
            <OptGroup label={category.label}>
              {SubCategories.filter((item) => item.category_id === category.value).map((item) => (
                <Option value={item.value}>{item.label}</Option>
              ))}
            </OptGroup>
          ))}
        </Select>
        <Select
          showSearch
          allowClear
          placeholder='Filter by country'
          //TODO: wait for implement company location
          style={{ width: 200, display: 'none' }}
          onChange={(value) => filterJobFair('country', value)}
          onClear={() => filterJobFair('country', '')}>
          {getCountryOrder().map((item) => (
            <Option value={item.id}>{item.name}</Option>
          ))}
        </Select>
      </div>
      <JobFairGridComponent data={data} onClick={onClick} role='ATTENDANT' />
    </div>
  );
};

export default JobFairGridPublicContainer;
