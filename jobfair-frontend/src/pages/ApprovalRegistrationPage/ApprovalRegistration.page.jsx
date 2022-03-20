import React, {useEffect, useState} from 'react';
import ApprovalRegistrationContainer from "../../containers/ApprovalRegistration/ApprovalRegistration.container";
import {Breadcrumb, Divider, notification, PageHeader, Typography} from 'antd';
import {HomeOutlined, UnorderedListOutlined} from "@ant-design/icons";
import {useHistory, useParams} from "react-router-dom";
import {getJobFairPlanById} from "../../services/job-fair-controller/JobFairConTrollerService";

const {Text, Title} = Typography

const ApprovalRegistrationPage = props => {
  const history = useHistory()
  const {jobFairId} = useParams()
  const [jobFairDescription, setJobFairDescription] = useState('')

  if (jobFairId === undefined) {
    return (
      <div className="page" style={{marginTop: 80}}>
        <PageHeader
          className="site-page-header"
          onBack={() => history.goBack()}
          title="Company registrations"
          subTitle="Showing all company registrations"
        />
      </div>
      )
  }

  const getJobFairDetail = async (jobFairId) => {
    getJobFairPlanById(jobFairId)
      .then(res => {
        setJobFairDescription(res.data.name)
      }).catch(err => {
      notification['error']({
        message: 'Get job fair detail failed'
      })
    })
  }

  useEffect(() => {
    getJobFairDetail(jobFairId)
  }, [])

  return (
    <div className="page" style={{marginTop: 80}}>
      <PageHeader
        className="site-page-header"
        onBack={() => history.goBack()}
        title="Company registrations"
        subTitle={`for job fair : ${jobFairDescription}`}
      />
      <ApprovalRegistrationContainer/>
    </div>
  );
};

export default ApprovalRegistrationPage;