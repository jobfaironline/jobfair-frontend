import React, { useState } from 'react'
import { Anchor, Menu, Button } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, PieChartOutlined } from '@ant-design/icons'
const { SubMenu } = Menu
const { Link } = Anchor
const AnchorComponent = props => {
  const { listData, href, title } = props
  const [isHide, setIsHide] = useState(false)
  const handleOnOpenMenu = status => {
    setIsHide(status)
  }
  return (
    <>
      <Button type="primary" style={{ marginBottom: 10 }} onClick={() => handleOnOpenMenu(!isHide)}>
        <div style={{ fontSize: '15px' }}>{isHide ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</div>
      </Button>

      {isHide ? (
        <div
          style={{
            borderRadius: '0.5rem 0.5rem 0.5rem 0.5rem',
            position: 'absolute',
            boxShadow: '0 8px 8px -4px lightblue',
            maxWidth: '20rem',
            zIndex: '10000000',
            background: '#FFF'
          }}
        >
          {
            <div style={{ padding: '10px', marginTop: '10px' }}>
              <Anchor targetOffset={300} onClick={e => e.preventDefault()}>
                <Link href={href} title={title} />
                {listData.map((item, index) => {
                  return <Link href={item.href} title={`${index + 1}: ${item.title}`} />
                })}
              </Anchor>
            </div>
          }
        </div>
      ) : null}
    </>
  )
}
export default AnchorComponent
