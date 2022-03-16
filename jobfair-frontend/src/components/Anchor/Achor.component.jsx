import React, { useState } from 'react'
import { Anchor, Menu, Button } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, PieChartOutlined } from '@ant-design/icons'
const { SubMenu } = Menu
const { Link } = Anchor
const AnchorComponent = props => {
  const { listData, href, title } = props
  const [isHide, setIsHide] = useState(false)
  const handleOnOpenMenu = status => {
    console.log(status)
    setIsHide(status)
  }
  return (
    <>
      <Button type="primary" style={{ marginBottom: 10 }}>
        <div style={{ fontSize: '15px' }}>
          {isHide ? (
            <MenuUnfoldOutlined onClick={() => handleOnOpenMenu(false)} />
          ) : (
            <MenuFoldOutlined onClick={() => handleOnOpenMenu(true)} />
          )}
        </div>
      </Button>

      <div
        style={{
          borderRadius: '0.5rem 0.5rem 0.5rem 0.5rem',
          position: 'absolute',
          boxShadow: '0 8px 8px -4px lightblue',
          width: '10rem',
          maxWidth: '15rem'
        }}
        hidden={isHide}
      >
        {
          <div style={{ padding: '10px', marginTop: '10px' }}>
            <Anchor targetOffset={300} onClick={e => e.preventDefault()}>
              <Link href={href} title={title} />
              {listData.map((jobPosition, index) => {
                return <Link href={`#p${index + 1}`} title={`${index + 1}: ${jobPosition.title}`} />
              })}
            </Anchor>
          </div>
        }
      </div>
    </>
  )
}
export default AnchorComponent
