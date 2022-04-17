import { getJobFairByIDAPI } from '../../services/jobhub-api/JobFairControllerService';
import { getStatisticsByJobFair } from '../../services/jobhub-api/AssignmentControllerService';
import PublishJobFairComponent from '../../components/customized-components/PublishJobFair/PublishJobFair.component';
import React, { useEffect, useState } from 'react';

const PublishJobFairContainer = ({ onHandlePrev, onFinish, jobFairId }) => {
  const [state, setState] = useState({
    statistics: undefined,
    jobFairData: undefined
  });
  useEffect(async () => {
    const statistics = await getStatisticsByJobFair(jobFairId).then((response) => response.data);
    const jobFairData = await getJobFairByIDAPI(jobFairId).then((response) => response.data);
    setState((prevState) => ({ ...prevState, statistics, jobFairData }));
  }, []);

  if (state.jobFairData === undefined || state.statistics === undefined) return null;
  return (
    <PublishJobFairComponent
      onHandlePrev={onHandlePrev}
      onFinish={onFinish}
      jobFairData={state.jobFairData}
      statistics={state.statistics}
    />
  );
};

export default PublishJobFairContainer;
