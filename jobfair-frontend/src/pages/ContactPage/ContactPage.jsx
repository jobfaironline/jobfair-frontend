import React from 'react'
import { Divider, Space, Typography } from 'antd'
import { FacebookOutlined, GithubOutlined, InstagramOutlined } from '@ant-design/icons'

const { Title } = Typography

const ContactPage = () => {
  return (
    <div className="page">
      <Divider plain>
        <Title>Contact us now !!!</Title>
      </Divider>
      <Space size="large" direction="vertical" style={{ marginLeft: '42rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <FacebookOutlined
            style={{ fontSize: '7rem' }}
            onClick={() => {
              window.location.href = 'https://www.facebook.com/TrongKhanh.Kieu'
            }}
          />
          <InstagramOutlined
            style={{ fontSize: '7rem' }}
            onClick={() => {
              window.location.href = 'https://help.instagram.com/'
            }}
          />
          <GithubOutlined
            style={{ fontSize: '7rem' }}
            onClick={() => {
              window.location.href = 'https://github.com/jobfaironline'
            }}
          />
        </div>
        <div style={{ fontSize: '7rem' }}>
          <img src={window.location.origin + '/contact.png'} style={{ margin: '0 -12rem' }} />
        </div>
      </Space>
    </div>
  )
}

export default ContactPage
