import { getJobFairByIDAPI } from '../../services/jobhub-api/JobFairControllerService';
import { notification } from 'antd';
import DocumentJobFairDetailComponent from '../../components/customized-components/JobFairDetail/DocumentJobFairDetail.component';
import React, { useEffect, useState } from 'react';

const JobFairDetailModalContainer = ({ jobFairId }) => {
  const [jobFairDetail, setJobFairDetail] = useState({});

  const fetchData = async () => {
    try {
      const res = await getJobFairByIDAPI(jobFairId);
      setJobFairDetail(res.data);
    } catch (e) {
      notification['error']({
        message: `Something went wrong! Try again latter!`,
        description: `There is problem while fetching data, try again later`,
        duration: 2
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [jobFairId]);

  return <DocumentJobFairDetailComponent data={jobFairDetail} />;
};

export default JobFairDetailModalContainer;
