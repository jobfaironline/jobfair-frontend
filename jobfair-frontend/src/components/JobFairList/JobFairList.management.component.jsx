import React from 'react'
import {Button, Divider, List, Select, Skeleton, Space, Tag, Tooltip, Typography} from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import {JOB_FAIR_PLAN_COMPANY_STATUS} from "../../constants/JobFairConst";


const JobFairListManagementComponent = (props) => {
    const { Title, Paragraph, Text, Link } = Typography;
    const { Option } = Select;

    const {data, handleRedirect, loadMoreData, handleFilterByStatus, searchResult, getCompanyBoothId} = props;

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
                onChange={(value) => handleFilterByStatus(value)}
            >
                {JOB_FAIR_PLAN_COMPANY_STATUS.map(item => (
                    <Option value={item.value}>{item.label}</Option>
                ))}
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
                    dataSource={searchResult.length !== 0 ? searchResult : data}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <Space>
                                    <Button type="link" onClick={() => {
                                    }} style={{padding: '0.2rem 0', border: '0'}}>
                                        More details
                                    </Button>
                                    {item.status === 'REGISTRABLE'
                                        ? (<Tooltip title='This event is open. Register now' color="green">
                                                <Button type="primary"
                                                        onClick={() => handleRedirect(`/company-register-jobfair/${item.id}`)}>
                                                    Register now
                                                </Button>
                                            </Tooltip>)
                                        : null}
                                    {item.status === 'SUBMITTED'
                                        ? (<Tooltip title="You registration is still in progress. Please wait!" color="gold">
                                            <Button type="primary">Is evaluating</Button>
                                            </Tooltip>)
                                        : null}
                                    {item.status === 'APPROVE'
                                        ? (<Tooltip title="Your registration was approved!" color="gold">
                                            <Button type="primary">Approved</Button>
                                            </Tooltip>)
                                        : null}
                                    {item.status === 'UNAVAILABLE'
                                        ? (<Tooltip title="This event was delayed. Please comeback later." color="red">
                                                <Button type="primary" disabled>Suspended</Button>
                                            </Tooltip>)
                                        : null}
                                    {item.status === 'DECORATE_BOOTH'
                                        ? (<Tooltip title="You chose a booth in this event. Decorate it now" color="geekblue">
                                            <Button type="primary" onClick={() => getCompanyBoothId(item.id)}>Decorate booth</Button>
                                        </Tooltip>)
                                        : null}
                                    {item.status === 'CHOOSE_BOOTH'
                                        ? (<Tooltip title="You registration has been approved. Now you can choose booth" color="blue">
                                            <Button type="primary" onClick={() => handleRedirect(`/choose-booth/${item.id}`)}>Choose booth</Button>
                                        </Tooltip>)
                                        : null}
                                </Space>
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <div display="flex">
                                        <h2 style={{marginBottom: '0.2rem'}}>{`Name: ${item['description']}`}</h2>
                                        {/*{item.status === 'UNAVAILABLE'? <Tag color="red">{item.status}</Tag> : null}*/}
                                        {/*{item.status === 'REGISTRABLE' ? <Tag color="green">{item.status}</Tag> : null}*/}
                                        {/*{item.status === 'SUBMITTED' ? <Tag color="gold">{item.status}</Tag> : null}*/}
                                        {/*{item.status === 'CHOOSE_BOOTH' ? <Tag color="blue">{item.status}</Tag> : null}*/}
                                        {/*{item.status === 'DECORATE_BOOTH' ? <Tag color="geekblue">{item.status}</Tag> : null}*/}
                                        {/*{item.status === 'APPROVE' ? <Tag color="geekblue">{item.status}</Tag> : null}*/}
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
};

export default JobFairListManagementComponent;