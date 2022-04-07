import { PageHeader, notification } from 'antd';
import { getJobFairPlanById } from '../../services/job-fair-controller/JobFairConTrollerService';
import { useHistory, useParams } from 'react-router-dom';
import EvaluateBoothInformationTableContainer from '../../containers/EvaluateBoothInformationTable/EvaluateBoothInformationTable.container';
import React, { useEffect, useState } from 'react';

const EvaluateBoothInformationPage = () => {
  const history = useHistory();
  const { jobFairId } = useParams();
  const [jobFairDescription, setJobFairDescription] = useState('');

  if (jobFairId === undefined) {
    return (
      <div className='page' style={{ marginTop: 80 }}>
        <PageHeader
          className='site-page-header'
          onBack={() => history.goBack()}
          title='Company registrations'
          subTitle='Showing all company registrations'
        />
      </div>
    );
  }

  const getJobFairDetail = async (jobFairId) => {
    getJobFairPlanById(jobFairId)
      .then((res) => {
        setJobFairDescription(res.data.name);
      })
      .catch(() => {
        notification['error']({
          message: 'Get job fair detail failed'
        });
      });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getJobFairDetail(jobFairId);
  }, []);

  return (
    <div className='page' style={{ marginTop: 80 }}>
      <PageHeader
        className='site-page-header'
        onBack={() => history.goBack()}
        title='Company registrations'
        subTitle={`for job fair : ${jobFairDescription}`}
      />
      <EvaluateBoothInformationTableContainer />
    </div>
  );
};

export default EvaluateBoothInformationPage;
