import React from 'react'
import JobFairListAvailableContainer from '../../containers/JobFairList/company/JobFairList.available.container'
import {Divider, Tabs, Typography} from "antd";
import JobFairListHistoryContainer from "../../containers/JobFairList/company/JobFairList.history.container";

const { TabPane } = Tabs
const {Title} = Typography
const JobFairListPage = () => {
  return (
    <div className="page">
      <Divider size="small" plain>
        <Title>Job Fair List</Title>
      </Divider>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={"Happening job fairs"} key={1} >
          <JobFairListAvailableContainer />
        </TabPane>
        <TabPane tab={"My job fair history"} key={2}>
          <JobFairListHistoryContainer />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default JobFairListPage
