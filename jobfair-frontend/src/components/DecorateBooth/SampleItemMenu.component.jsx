import React from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

export const SampleItemMenu = (props) => {
  const {items, onItemClick, selectedItemId} = props
  const isItemSelected = id => selectedItemId === id

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {items.map(item => (
        <Card
          itemId={item.id}
          title={item.name}
          key={item.id}
          onClick={onItemClick(item.id)}
          selected={isItemSelected(item.id)}
        />
      ))}
    </ScrollMenu>
  )
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } = React.useContext(VisibilityContext)
  return (
    <Button disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <LeftOutlined />
    </Button>
  )
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext)
  return (
    <Button disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <RightOutlined />
    </Button>
  )
}

function Card({ onClick, selected, title, itemId }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: '160px'
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{title}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          height: '160px'
        }}
      />
    </div>
  )
}
