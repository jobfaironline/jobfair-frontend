import React from 'react'
import {
  Button,
  Divider,
  List,
  Select,
  Skeleton,
  Space,
  Tag,
  Tooltip,
  Typography,
  Carousel,
  Image,
  Empty,
  Card,
  Badge
} from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import ShowMoreText from 'react-show-more-text'
import { JOB_FAIR_FOR_ATTENDANT_STATUS, JOB_FAIR_PLAN_COMPANY_STATUS } from '../../constants/JobFairConst'
import { PATH } from '../../constants/Paths/Path'
import { COMPANY_JOB_FAIR_STATUS } from '../../constants/CompanyJobFairStatus'
import CompanyJobFairActionButton from './CompanyJobFairActionButton.component'
import JobFairListManagementImageComponent from './components/JobFairList.management.image.component'
import { useSelector } from 'react-redux'
import { InfoCircleTwoTone, UserOutlined, BankTwoTone } from '@ant-design/icons'
import { COMPANY_EMPLOYEE, ATTENDANT, COMPANY_MANAGER } from '../../constants/RoleType'

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

const { Option } = Select
const { Title, Text } = Typography
const handleOption = role => {
  if (role === undefined) {
    return
  }
  switch (role) {
    case 'COMPANY_MANAGER':
      return JOB_FAIR_PLAN_COMPANY_STATUS.map(item => <Option value={item.value}>{item.label}</Option>)
    default:
      return JOB_FAIR_FOR_ATTENDANT_STATUS.map(item => <Option value={item.value}>{item.label}</Option>)
  }
}

const JobFairListManagementComponent = props => {
  const { user, isAuthUser } = useSelector(state => state.authentication)
  var listRole = user ? Array.of(user.roles) : []
  const { Title, Paragraph, Text, Link } = Typography
  const {
    data,
    handleRedirect,
    loadMoreData,
    handleFilterByStatus,
    searchResult,
    getCompanyBoothId,
    handleClearFilter
  } = props
  const role = useSelector(state => state.authentication?.user?.roles)
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
        style={{ width: '25%' }}
        placeholder="Filter by status"
        onChange={value => {
          if (value.length !== 0) {
            handleFilterByStatus(value)
          } else {
            handleClearFilter()
          }
        }}
        onClear={() => handleClearFilter()}
      >
        {handleOption(role)}
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
          dataSource={searchResult}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                description={
                  <Card
                    bordered={true}
                    style={{
                      borderRadius: '8px',
                      marginRight: '24px',
                      marginLeft: '24px',
                      boxShadow: '3px 6px 22px 3px rgba(208, 216, 243, 0.6)',
                      width: '98%'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex' }}>
                        <div>
                          <Badge.Ribbon
                            text={
                              <Text strong style={{ color: 'white', fontSize: '20px' }}>
                                17 Aug
                              </Text>
                            }
                            style={{ height: '28px' }}
                          >
                            <Carousel autoplay style={{ width: '450px' }}>
                              {listImage.map(image => (
                                <div style={contentStyle}>
                                  <JobFairListManagementImageComponent key={image.id} urlImage={image.urlImage} />
                                </div>
                              ))}
                            </Carousel>
                          </Badge.Ribbon>
                        </div>
                        <div style={{ marginLeft: '5rem', width: '1000px' }}>
                          <div>
                            <Title level={2}>{`${item['description']}`}</Title>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', width: '700px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '200px' }}>
                              <div>
                                <Title level={5} type="secondary">
                                  Start Date
                                </Title>

                                <Tag color="cyan">
                                  <Text strong>25/10/2022</Text>
                                </Tag>
                              </div>
                              <div>
                                <Title level={5} type="secondary">
                                  End Date
                                </Title>
                                <Tag color="blue">
                                  <Text strong>25/10/2022</Text>
                                </Tag>
                              </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
                              <div>
                                <Title level={5} type="secondary">
                                  Location
                                </Title>
                                <Text strong>Some where in saigon</Text>
                              </div>
                              <div>
                                <Title level={5} type="secondary">
                                  Register time
                                </Title>
                                <Tag color="green">
                                  <Text strong>25/10/2022</Text>
                                </Tag>
                              </div>
                            </div>
                          </div>
                          <div style={{ marginTop: '2rem' }}>
                            <Title level={5} type="secondary">
                              Description
                            </Title>
                            <Text strong>
                              <ShowMoreText
                                lines={3}
                                more=".."
                                less=".."
                                className="content-css"
                                anchorClass="my-anchor-css-class"
                                expanded={false}
                                width={1000}
                                truncatedEndingComponent={'.'}
                              >
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                has been the industry's standard dummy text ever since the 1500s, when an unknown
                                printer took a galley of type and scrambled it to make a type specimen book. It has
                                survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
                                publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                              </ShowMoreText>
                            </Text>
                          </div>
                        </div>
                      </div>
                      <div>
                        {item.status == COMPANY_JOB_FAIR_STATUS.REJECT ? (
                          <Space>
                            <Typography style={{ color: '#DD0000' }}>
                              Your recent registration has been rejected, please try again!
                            </Typography>
                          </Space>
                        ) : null}
                        <div
                          style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', gap: '10px' }}
                        >
                          {isAuthUser && listRole.includes(ATTENDANT) ? (
                            <Tag color="lime">
                              <UserOutlined /> 300
                            </Tag>
                          ) : null}
                          {(isAuthUser && listRole.includes(COMPANY_EMPLOYEE)) ||
                          (isAuthUser && listRole.includes(COMPANY_MANAGER)) ? (
                            <Tag color="geekblue">
                              <BankTwoTone /> 300
                            </Tag>
                          ) : null}
                          <InfoCircleTwoTone />
                        </div>
                        <div style={{ position: 'absolute', bottom: '2rem', marginLeft: '-5rem' }}>
                          <CompanyJobFairActionButton
                            getCompanyBoothId={getCompanyBoothId}
                            item={item}
                            handleRedirect={handleRedirect}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
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
