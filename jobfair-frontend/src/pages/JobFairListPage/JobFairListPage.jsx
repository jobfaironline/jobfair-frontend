/* eslint-disable no-unused-vars */
import React from 'react'
import { Divider, Tabs, Typography } from 'antd'
import { useSelector } from 'react-redux'
import { ATTENDANT, COMPANY_EMPLOYEE, COMPANY_MANAGER } from '../../constants/RoleType'
import JobFairListContainer from '../../containers/JobFairList/commons/JobFairList.container'

const { TabPane } = Tabs
const { Title } = Typography
const JobFairListPage = () => {
  const role = useSelector(state => state.authentication.user.roles)
  const ViewComponent = ({ role, tabStatus }) => {
    switch (role) {
      case 'COMPANY_EMPLOYEE':
        return <JobFairListContainer role="COMPANY_EMPLOYEE" tabStatus={tabStatus} />
      case 'COMPANY_MANAGER':
        return <JobFairListContainer role="COMPANY_MANAGER" tabStatus={tabStatus} />
      case 'ATTENDANT':
        return <JobFairListContainer role="ATTENDANT" tabStatus={tabStatus} />
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
