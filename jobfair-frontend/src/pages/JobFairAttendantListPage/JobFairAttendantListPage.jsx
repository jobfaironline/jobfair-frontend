import React from 'react'
import JobFairAttendantListContainer from '../../containers/JobFairAttendantList/JobFairAttendantListContainer'
import {Divider, Tabs, Typography} from "antd";
import JobFairAttendantAttendedContainer
  from "../../containers/JobFairAttendantList/JobFairAttendantAttended.container";

const {TabPane} = Tabs
const {Title} = Typography
const JobFairAttendantListPage = () => {

  const availableArr = [
    "HAPPENING",
    "REGISTRABLE"
  ]

  const historyArr = [
    "ATTENDED",
    "CLOSED",
    "REGISTERED",
    "UNAVAILABLE"
  ]

  return (
    <div className="page">
      <Divider size="small" plain>
        <Title>Job Fair List</Title>
      </Divider>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={"Available to register"} key={1}>
          <JobFairAttendantListContainer/>
        </TabPane>
        <TabPane tab={"My job fair history"} key={2}>
          <JobFairAttendantAttendedContainer />
        </TabPane>
      </Tabs>
    </div>
  )
}
export default JobFairAttendantListPage
