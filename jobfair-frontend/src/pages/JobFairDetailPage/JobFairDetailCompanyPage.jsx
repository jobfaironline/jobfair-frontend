import React from 'react';
import JobFairDetailCompanyContainer from "../../containers/JobFairDetail/JobFairDetail.company.container";
import {useHistory, useLocation} from "react-router-dom";
import {PageHeader} from "antd";
import {PATH} from "../../constants/Paths/Path";

const JobFairDetailCompanyPage = () => {
  const location = useLocation()
  const jobFairId = location.state.jobFairId
  const history = useHistory()
  return (
    <div className="page" style={{marginTop: 50}}>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Job fair detail"
        subTitle=""
      />
      <JobFairDetailCompanyContainer id={jobFairId}/>
    </div>
  );
};

export default JobFairDetailCompanyPage;