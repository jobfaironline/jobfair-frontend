import React from 'react'
import {Breadcrumb, Divider, Tabs} from 'antd'
import JobFairListEvaluateContainer from '../../containers/JobFairList/JobFairList.evaluate.container'
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'


const { TabPane } = Tabs;
const JobFairListPage = () => {
  const role = useSelector(state => state.authentication?.user?.roles)

  return (
    <div className="page" style={{marginTop: 80}}>
      <Divider>Job Fair List</Divider>
        <Tabs defaultActiveKey="2" centered>
            <TabPane tab="Taken place" key="1">
                Job fair taken place
            </TabPane>
            <TabPane tab="Happening" key="2">
                <JobFairListEvaluateContainer />
            </TabPane>
            <TabPane tab="Coming soon" key="3">
                Job fair in future
            </TabPane>
        </Tabs>
    </div>
  )
}

export default JobFairListPage
