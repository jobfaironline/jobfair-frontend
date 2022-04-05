import React from 'react'
import JobFairAttendantListContainer from '../../containers/JobFairAttendantList/JobFairAttendantListContainer'
import {Divider, Tabs, Typography} from "antd";
import JobFairAttendantAttendedContainer
  from "../../containers/JobFairAttendantList/JobFairAttendantAttended.container";

const {TabPane} = Tabs
const {Title} = Typography
const JobFairAttendantListPage = () => {

  return (
    <div className="page">
      <Divider size="small" plain>
        <Title>Job Fair List</Title>
      </Divider>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab={"Happening job fairs"} key={1}>
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