import React from 'react'
import { Button, Divider, List, Select, Skeleton, Space, Tag, Tooltip, Typography } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { JOB_FAIR_PLAN_COMPANY_STATUS } from '../../constants/JobFairConst'
import { PATH } from '../../constants/Paths/Path'
import {COMPANY_JOB_FAIR_STATUS} from "../../constants/CompanyJobFairStatus";
import CompanyJobFairActionButton from "./CompanyJobFairActionButton.component";

const JobFairListManagementComponent = props => {
  const { Title, Paragraph, Text, Link } = Typography
  const { Option } = Select

  const { data, handleRedirect, loadMoreData, handleFilterByStatus, searchResult, getCompanyBoothId } = props

  return (
    <div
      id="scrollableDiv"
      style={{
        height: '80vh',
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)'
      }}
    >
      <Divider size="small" plain>
        <Title>Job Fair List</Title>
      </Divider>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder="Filter by status"
        onChange={value => handleFilterByStatus(value)}
      >
        {JOB_FAIR_PLAN_COMPANY_STATUS.map(item => (
          <Option value={item.value}>{item.label}</Option>
        ))}
      </Select>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        // hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={searchResult.length !== 0 ? searchResult : data}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Space>J
                  <Button type="link" onClick={() => {}} style={{ padding: '0.2rem 0', border: '0' }}>
                    More details
                  </Button>
                  <CompanyJobFairActionButton getCompanyBoothId={getCompanyBoothId} item={item} handleRedirect={handleRedirect}/>
                </Space>
              ]}
            >
              <List.Item.Meta
                title={
                  <div display="flex">
                    <h2 style={{ marginBottom: '0.2rem' }}>{`Name: ${item['description']}`}</h2>
                  </div>
                }
                description={
                  <div display="flex">
                    <h4>{`Description: ${item['description']}`}</h4>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  )
}

export default JobFairListManagementComponent
