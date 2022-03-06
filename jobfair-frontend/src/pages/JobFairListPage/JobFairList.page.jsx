import React from 'react'
import { Breadcrumb, Divider } from 'antd'
import JobFairListEvaluateContainer from '../../containers/JobFairList/JobFairList.evaluate.container'
import { HomeOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

const JobFairListPage = () => {
  const role = useSelector(state => state.authentication?.user?.roles)

  return (
    <div className="page">
      <Divider>Job Fair List</Divider>
      <JobFairListEvaluateContainer />
    </div>
  )
}

export default JobFairListPage
