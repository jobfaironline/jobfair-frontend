import React from 'react'
import {Divider, List, Select, Skeleton, Space, Tag, Typography, Carousel, Card, Badge, Row, Col, Tooltip} from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import ShowMoreText from 'react-show-more-text'
import {JOB_FAIR_FOR_ATTENDANT_STATUS, JOB_FAIR_PLAN_COMPANY_STATUS} from '../../constants/JobFairConst'
import {COMPANY_JOB_FAIR_STATUS} from '../../constants/CompanyJobFairStatus'
import CompanyJobFairActionButton from './CompanyJobFairActionButton.component'
import JobFairListManagementImageComponent from './components/JobFairList.management.image.component'
import {useSelector} from 'react-redux'
import {InfoCircleTwoTone, UserOutlined, BankTwoTone} from '@ant-design/icons'
import {COMPANY_EMPLOYEE, ATTENDANT, COMPANY_MANAGER} from '../../constants/RoleType'
import {convertToDateString} from "../../utils/common";

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

const {Option} = Select
const {Title, Text} = Typography
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
  const {user, isAuthUser} = useSelector(state => state.authentication)
  var listRole = user ? Array.of(user.roles) : []
  const {Title, Paragraph, Text, Link} = Typography
  const {
    data,
    handleRedirect,
    loadMoreData,
    handleFilterByStatus,
    searchResult,
    getCompanyBoothId,
    handleClearFilter,
    handleViewDetail,
    handleViewMap,
    handleRequestChange
  } = props
  const role = useSelector(state => state.authentication?.user?.roles)

  const handleMessage = (status) => {
    if ((isAuthUser && listRole.includes(COMPANY_EMPLOYEE)) ||
      (isAuthUser && listRole.includes(COMPANY_MANAGER))
    ) {
      switch (status) {
        case COMPANY_JOB_FAIR_STATUS.REJECT:
          return (
            <Space>
              <Typography style={{color: '#DD0000'}}>
                Your recent registration has been rejected, please try again!
              </Typography>
            </Space>
          )
        case COMPANY_JOB_FAIR_STATUS.REQUEST_CHANGE:
          return (
            <Space>
              <Typography style={{color: '#000bdd'}}>
                Your registration requires changes!
              </Typography>
            </Space>
          )
        default:
          return null
      }
    }
  }

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
      <Select
        mode="multiple"
        allowClear
        style={{width: '25%'}}
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
        loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
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
                      boxShadow: '3px 6px 22px 3px rgba(208, 216, 243, 0.6)',
                      width: '98%'
                    }}
                  >
                    <Row justify="space-between">
                      <Col span={6}>
                        <Badge.Ribbon
                          text={
                            <Text strong style={{color: 'white', fontSize: '1.3rem'}}>
                              17 Aug
                            </Text>
                          }
                          style={{height: '1.7rem'}}
                        >
                          <Carousel autoplay>
                            {listImage.map(image => (
                              <div style={contentStyle}>
                                <JobFairListManagementImageComponent key={image.id} urlImage={image.urlImage}/>
                              </div>
                            ))}
                          </Carousel>
                        </Badge.Ribbon>
                      </Col>
                      <Col span={14}>
                        <div>
                          <Title level={2}>{item.name}</Title>
                        </div>
                        <Row justify="space-between">
                          <Row justify="space-between" gutter={32}>
                            <Col span={12}>
                              <Title level={5} type="secondary">
                                Start Date
                              </Title>
                              <Tag color="cyan">
                                <Text strong>
                                  {item.startTime}
                                </Text>
                              </Tag>
                            </Col>
                            <Col span={12}>
                              <Title level={5} type="secondary">
                                End Date
                              </Title>
                              <Tag color="blue">
                                <Text strong>
                                  {item.endTime}
                                </Text>
                              </Tag>
                            </Col>
                          </Row>
                          <Col span={16}>
                            <Row justify='space-between'>
                              <Col span={8}>
                                <Title level={5} type="secondary">
                                  Register time
                                </Title>
                                <Tag color="green">
                                  <Text strong>
                                    {(isAuthUser && listRole.includes(COMPANY_MANAGER)) ?
                                      item.companyRegisterStartTime : null
                                    }
                                    {(isAuthUser && listRole.includes(ATTENDANT)) ?
                                      item.attendantRegisterStartTime : null
                                    }
                                  </Text>
                                </Tag>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                        <div style={{marginTop: '2rem'}}>
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
                              {item.description}
                            </ShowMoreText>
                          </Text>
                        </div>
                      </Col>
                      <Col span={3}>
                        <div>
                          <div style={{float: 'right'}}>
                            {isAuthUser && listRole.includes(ATTENDANT) ? (
                              <Tooltip title="300 users are joining this job fair" color="lime" key="currentUser">
                                <Tag color="lime">
                                  <UserOutlined/> 300
                                </Tag>
                              </Tooltip>
                            ) : null}
                            {(isAuthUser && listRole.includes(COMPANY_EMPLOYEE)) ||
                            (isAuthUser && listRole.includes(COMPANY_MANAGER)) &&
                            (item.status !== COMPANY_JOB_FAIR_STATUS.ATTENDED)
                              ? (
                              <Tooltip title="300 company registered to this job fair" color="geekblue" key="currentRegistration">
                                <Tag color="geekblue">
                                  <BankTwoTone/> 300
                                </Tag>
                              </Tooltip>
                            ) : null}
                            <InfoCircleTwoTone onClick={() => handleViewDetail(item['id'])}/>
                            {handleMessage(item.status)}
                          </div>
                          <div style={{position: 'absolute', bottom: '1rem'}}>
                            <CompanyJobFairActionButton
                              getCompanyBoothId={getCompanyBoothId}
                              item={item}
                              handleRedirect={handleRedirect}
                              handleViewMap={handleViewMap}
                              handleRequestChange={handleRequestChange}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
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
