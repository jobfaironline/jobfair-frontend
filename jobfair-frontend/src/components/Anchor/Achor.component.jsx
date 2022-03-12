import React, { useState } from 'react'
import { Anchor, Menu, Button } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined, PieChartOutlined } from '@ant-design/icons'
import Drawer from '@mui/material/Drawer'
const { SubMenu } = Menu
const { Link } = Anchor
const AnchorComponent = props => {
  const { listData, href, title } = props
  const [isOpen, setIsOpen] = useState({ right: false })
  const handleOnOpenMenu = status => {
    setIsOpen(status)
  }
  return (
    <>
      <Button type="primary" onClick={() => handleOnOpenMenu(true)} style={{ marginBottom: 16 }}>
        {isOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>

      <Drawer
        anchor={'left'}
        open={isOpen}
        onClose={() => handleOnOpenMenu(false)}
      >
        {
          <div style={{ padding: '10px', marginTop: '10px' }}>
            <Anchor targetOffset={300} onClick={e => e.preventDefault()}>
              <Link href={href} title={title} />
              {listData.map((jobPosition, index) => {
                return <Link href={`#p${index}`} title={`${index}: ${jobPosition.title}`} />
              })}
            </Anchor>
          </div>
        }
      </Drawer>
    </>
  )
}
export default AnchorComponent
