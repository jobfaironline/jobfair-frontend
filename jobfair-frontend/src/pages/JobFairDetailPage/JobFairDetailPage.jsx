import React from 'react';
import {Button, Divider, Typography} from "antd";
import JobFairDetailContainer from "../../containers/JobFairDetail/JobFairDetail.container";
import {useHistory} from "react-router-dom";

const {Text} = Typography;

const JobFairDetailPage = () => {

  const history = useHistory();
  return (
    <div className="page" style={{marginTop: 80}}>
      <JobFairDetailContainer/>
      <Button type="primary" onClick={() => history.goBack()}>Back</Button>
    </div>
  );
};

export default JobFairDetailPage;