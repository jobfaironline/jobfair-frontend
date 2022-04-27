import './JobFairTemplate.styles.scss';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { Typography } from 'antd';
import { generatePath, useHistory } from 'react-router-dom';
import { getCompanyLayoutAPI } from '../../services/jobhub-api/LayoutControllerService';
import JobFairTemplateComponent from '../../components/customized-components/JobFairTemplate/JobFairTemplate.component';
import React, { useEffect, useState } from 'react';
import UploadModalContainer from '../UploadModal/UploadModal.container';

const JobFairTemplateContainer = () => {
  const [data, setData] = useState();
  const [isVisible, setIsVisible] = useState();
  const [reRender, setReRender] = useState(false);
  const history = useHistory();

  const fetchData = async () => {
    const res = await getCompanyLayoutAPI();
    const content = res.data;
    content.unshift({ isFirst: true });
    setData(content);
  };

  useEffect(() => {
    fetchData();
  }, [reRender]);

  const handleViewDetail = async (id) => {
    const url = generatePath(PATH_COMPANY_MANAGER.TEMPLATE_DETAIL, { templateId: id });
    history.push(url);
  };

  const onAddClick = () => {
    setIsVisible(true);
  };

  const onSubmit = () => {
    setIsVisible(false);
    setReRender((prevState) => !prevState);
  };
  const onCancel = () => {
    setIsVisible(false);
  };

  return (
    <>
      <UploadModalContainer visible={isVisible} onSubmit={onSubmit} onCancel={onCancel} />
      <div className={'job-fair-template'}>
        <div className={'header'}>
          <Typography.Title level={2} style={{ marginRight: '2rem' }}>
            My layout
          </Typography.Title>
        </div>
        {!data ? (
          <LoadingComponent />
        ) : (
          <JobFairTemplateComponent data={data} handleViewDetail={handleViewDetail} onAddClick={onAddClick} />
        )}
      </div>
    </>
  );
};

export default JobFairTemplateContainer;
