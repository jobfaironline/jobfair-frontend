import { Empty, Spin } from 'antd';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { generatePath, useHistory } from 'react-router-dom';
import { getCompanyLayoutAPI } from '../../services/jobhub-api/LayoutControllerService';
import JobFairTemplateComponent from '../../components/customized-components/JobFairTemplate/JobFairTemplate.component';
import React, { useEffect, useState } from 'react';

const JobFairTemplateContainer = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  const fetchData = async () => {
    const res = await getCompanyLayoutAPI();
    const content = res.data;
    setData(content);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRenderData = (data) => {
    if (data.length === 0) return <Empty />;
    if (data === undefined) return <Spin />;
    return <JobFairTemplateComponent data={data} handleViewDetail={handleViewDetail} />;
  };

  const handleViewDetail = async (id) => {
    const url = generatePath(PATH_COMPANY_MANAGER.TEMPLATE_DETAIL, { templateId: id });
    history.push(url);
  };

  return <div>{handleRenderData(data)}</div>;
};

export default JobFairTemplateContainer;
