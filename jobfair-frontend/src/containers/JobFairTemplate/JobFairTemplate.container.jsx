import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { Spin } from 'antd';
import { generatePath, useHistory } from 'react-router-dom';
import { getCompanyLayoutAPI } from '../../services/jobhub-api/LayoutControllerService';
import JobFairTemplateComponent from '../../components/customized-components/JobFairTemplate/JobFairTemplate.component';
import React, { useEffect, useState } from 'react';

const JobFairTemplateContainer = () => {
  const [data, setData] = useState();
  const history = useHistory();

  const fetchData = async () => {
    const res = await getCompanyLayoutAPI();
    const content = res.data;
    setData(content);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewDetail = async (id) => {
    const url = generatePath(PATH_COMPANY_MANAGER.TEMPLATE_DETAIL, { templateId: id });
    history.push(url);
  };

  return data ? (
    <div>
      <JobFairTemplateComponent data={data} handleViewDetail={handleViewDetail} />
    </div>
  ) : (
    <Spin />
  );
};

export default JobFairTemplateContainer;
