import React, { useState, useEffect } from 'react'
import { List, Avatar, Skeleton, Divider, Space, Tag, Button, Drawer } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component'

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)

const AppliedJobList = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then(res => res.json())
      .then(body => {
        const mappedData = body.results.map(item => {
          return {
            id: item.email,
            job_title: item.name.first,
            company_name: item.name.last,
            status: 'Verified',
            interview_date: '12/03/2022',
            interview_link: 'https://www.npmjs.com/package/react-infinite-scroll-component',
            apply_date: '01/03/2022'
          }
        })
        setData([...data, ...mappedData])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)'
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
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
                  <h5>{`Interview's date: ${item['interview_date']}`}</h5>
                  <Button type="primary">Join Interview!</Button>
                </Space>
              ]}
            >
              <List.Item.Meta
                title={
                  <div display="flex">
                    <h2 style={{ marginBottom: '0.2rem' }}>{`Title: ${item['job_title']}`}</h2>
                    <Tag color="blue">{item.status}</Tag>
                  </div>
                }
                description={
                  <div display="flex">
                    <h4>{`Company's name: ${item['company_name']}`}</h4>
                    <h4>{`Apply date: ${item['apply_date']}`}</h4>
                    <Button type="link" onClick={showDrawer} style={{ padding: '0.2rem 0', border: '0' }}>
                      More details
                    </Button>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </InfiniteScroll>
      <Drawer title="Hello i'm the details infor" placement="right" onClose={onClose} visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  )
}

export default AppliedJobList
