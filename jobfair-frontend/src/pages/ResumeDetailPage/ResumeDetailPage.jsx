import React from 'react';
import {PageHeader} from "antd";
import './ResumeDetailPage.styles.scss'
import ResumeDetailContainer from "../../containers/ResumeDetail/ResumeDetail.container";

const defaultResumeId = 'a5c3e29d-0a5c-4950-bf4a-8f31b3401b72'

const ResumeDetailPage = () => {
  return (
    <div className="page">
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Resume Detail Page"
      />
      <ResumeDetailContainer/>
    </div>
  );
};

export default ResumeDetailPage;