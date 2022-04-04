import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Divider, Tabs, Typography } from 'antd'
import AttendantApplicationView from '../../containers/ApplicationView/AttendantApplicationView.container'
import CompanyApplicationView from '../../containers/ApplicationView/company/CompanyApplicationView.container'

const { TabPane } = Tabs

const ApplicationManagementPage = () => {
  const role = useSelector(state => state.authentication.user.roles)
  const ViewComponent = ({ ...viewProps }) => {
    switch (role) {
      case 'COMPANY_EMPLOYEE':
      case 'COMPANY_MANAGER':
        return <CompanyApplicationView {...viewProps} role={role}/>
      case 'ATTENDANT':
        return <AttendantApplicationView {...viewProps} />
    }
  }

  return (
    <div className="page">
      <div style={{ margin: '4rem 0' }}>
        <Divider>
          <Typography.Title level={2}>Application management</Typography.Title>
        </Divider>
        <Tabs defaultActiveKey="1" centered destroyInactiveTabPane>
          <TabPane tab="Reviewing applications" key="1">
            <ViewComponent tabStatus="1" />
          </TabPane>
          <TabPane tab="Rejected Applications" key="2">
            <ViewComponent tabStatus="2" />
          </TabPane>
          <TabPane tab="Approved Applications" key="3">
            <ViewComponent tabStatus="3" />
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default ApplicationManagementPage
