import './JobFairTemplate.styles.scss';
import { LoadingComponent } from '../../components/commons/Loading/Loading.component';
import { PATH_COMPANY_MANAGER } from '../../constants/Paths/Path';
import { Typography, notification } from 'antd';
import { generatePath, useHistory } from 'react-router-dom';
import { getCompanyLayoutAPI } from '../../services/jobhub-api/LayoutControllerService';
import JobFairTemplateComponent from '../../components/customized-components/JobFairTemplate/JobFairTemplate.component';
import React, { useEffect, useState } from 'react';
import UploadJobFairLayoutModalContainer from '../UploadModal/UploadJobFairLayoutModal.container';

const JobFairTemplateContainer = () => {
  const [data, setData] = useState();
  const [isVisible, setIsVisible] = useState();
  const [reRender, setReRender] = useState(false);
  const history = useHistory();

  const fetchData = async () => {
    try {
      const res = await getCompanyLayoutAPI();
      let content = [];
      if (res.status === 200) content = res.data;

      content.unshift({ isFirst: true });
      setData(content);
    } catch (e) {
      notification['error']({
        message: `Fetch layout data failed`,
        description: `Error detail: ${e}`
      });
    }
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
      <UploadJobFairLayoutModalContainer visible={isVisible} onSubmit={onSubmit} onCancel={onCancel} />
      <div className={'job-fair-template'}>
        <div className={'header'}>
          <Typography.Title level={2} style={{ marginRight: '2rem' }}>
            My layout
          </Typography.Title>
        </div>
        {!data ? (
          <LoadingComponent isWholePage={true} />
        ) : (
          <JobFairTemplateComponent data={data} handleViewDetail={handleViewDetail} onAddClick={onAddClick} />
        )}
      </div>
    </>
  );
};

export default JobFairTemplateContainer;
