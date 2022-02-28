import React from 'react'
import {Button, Divider, List, Skeleton, Space, Tag} from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'


const JobFairListManagementComponent = ({data, handleRegister, loadMoreData}) => {
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
            <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 50}
                loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={data}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[
                                <Space>
                                    <Button type="link" onClick={() => {
                                    }} style={{padding: '0.2rem 0', border: '0'}}>
                                        More details
                                    </Button>
                                    <Button type="primary" onClick={() => handleRegister(item.registerLink)}>
                                        Register
                                    </Button>
                                </Space>
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <div display="flex">
                                        <h2 style={{marginBottom: '0.2rem'}}>{`Title: ${item['job_title']}`}</h2>
                                        <Tag color="blue">{item.status}</Tag>
                                    </div>
                                }
                                description={
                                    <div display="flex">
                                        <h4>{`Date: ${item['apply_date']}`}</h4>
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