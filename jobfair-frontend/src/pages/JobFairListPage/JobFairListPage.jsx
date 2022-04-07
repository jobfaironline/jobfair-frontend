import React from 'react'
import { Divider, Tabs, Typography } from 'antd'
import { useSelector } from 'react-redux'
import JobFairListManagerContainer from '../../containers/JobFairList/commons/JobFairListManager.container'
import JobFairListEmployeeContainer from '../../containers/JobFairList/commons/JobFairListEmployee.container'
import JobFairListAttendantContainer from '../../containers/JobFairList/commons/JobFairListAttendant.container'

const { TabPane } = Tabs
const { Title } = Typography
const JobFairListPage = () => {
  const role = useSelector(state => state.authentication.user.roles)
  const ViewComponent = ({ role, tabStatus }) => {
    switch (role) {
      case 'COMPANY_EMPLOYEE':
        return <JobFairListEmployeeContainer tabStatus={tabStatus} />
      case 'COMPANY_MANAGER':
        return <JobFairListManagerContainer tabStatus={tabStatus} />
      case 'ATTENDANT':
        return <JobFairListAttendantContainer tabStatus={tabStatus} />
      default:
        return null
    }
  }
  return (
    <div className="page">
      <Divider size="small" plain>
        <Title>Job Fair List</Title>
      </Divider>
      <Tabs defaultActiveKey="1" centered destroyInactiveTabPane>
        <TabPane tab={'Happening job fairs'} key={1}>
          <ViewComponent tabStatus={1} role={role} />
        </TabPane>
        <TabPane tab={'My job fair history'} key={2}>
          <ViewComponent tabStatus={2} role={role} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default JobFairListPage
