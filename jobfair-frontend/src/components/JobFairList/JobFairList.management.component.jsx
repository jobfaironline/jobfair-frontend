import React from 'react'
import { Button, Divider, List, Select, Skeleton, Space, Tag, Tooltip, Typography, Carousel, Image } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { JOB_FAIR_PLAN_COMPANY_STATUS } from '../../constants/JobFairConst'
import { PATH } from '../../constants/Paths/Path'
import { COMPANY_JOB_FAIR_STATUS } from '../../constants/CompanyJobFairStatus'
import CompanyJobFairActionButton from './CompanyJobFairActionButton.component'
import JobFairListManagementImageComponent from './components/JobFairList.management.image.component'
const listImage = [
  {
    id: 1,
    urlImage: '/jobfair-pic1.jpg'
  },
  {
    id: 2,
    urlImage: '/jobfair-pic2.jpg'
  },
  {
    id: 3,
    urlImage: '/jobfair-pic3.jpg'
  }
]
const JobFairListManagementComponent = props => {
  const { Title, Paragraph, Text, Link } = Typography
  const { Option } = Select
  const { data, handleRedirect, loadMoreData, handleFilterByStatus, searchResult, getCompanyBoothId } = props
  const contentStyle = {
    height: '200px',
    color: '#fff',
    lineHeight: '200px',
    textAlign: 'center',
    background: '#364d79'
  }
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
          dataSource={searchResult?.length !== 0 ? searchResult : data}
          renderItem={item => (
            <List.Item
              key={item.id}
              actions={[
                <Space>
                  <Button type="link" onClick={() => {}} style={{ padding: '0.2rem 0', border: '0' }}>
                    More details
                  </Button>
                  <CompanyJobFairActionButton
                    getCompanyBoothId={getCompanyBoothId}
                    item={item}
                    handleRedirect={handleRedirect}
                  />
                </Space>
              ]}
            >
              <List.Item.Meta
                title={
                  <div display="flex" style={{ width: '300px' }}>
                    <h2 style={{ marginBottom: '0.2rem' }}>{`Name: ${item['description']}`}</h2>
                  </div>
                }
                description={
                  <div display="flex">
                    <h4 style={{ width: '300px', textAlign: 'right' }}>{`Description: ${item['description']}`}</h4>
                    <Carousel autoplay style={{ width: '300px' }}>
                      {listImage.map(image => (
                        <div style={contentStyle}>
                          <JobFairListManagementImageComponent key={image.id} urlImage={image.urlImage} />
                        </div>
                      ))}
                    </Carousel>
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
