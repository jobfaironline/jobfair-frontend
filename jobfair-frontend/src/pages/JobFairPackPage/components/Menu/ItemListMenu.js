import React from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { ModeConstant } from '../../../../constants/AppConst'

export default function ItemListMenu({
  items,
  selected,
  setSelected,
  setMode,
}) {
  const isItemSelected = id => selected?.id === id

  const handleClick = id => () => {
    setSelected(prevSelected => {
      if (prevSelected.id === id) {
        setMode(ModeConstant.SELECT)
        return {}
      }
      setMode(ModeConstant.ADD)
      return items.filter(item => item.id === id)[0]
    })
  }

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {items.map(item => (
        <Card
          itemId={item.id} // NOTE: itemId is required for track items
          title={item.name}
          key={item.id}
          onClick={handleClick(item.id)}
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
        width: '160px',
      }}
      tabIndex={0}
    >
      <div className="card">
        <div>{title}</div>
        <div>selected: {JSON.stringify(!!selected)}</div>
      </div>
      <div
        style={{
          height: '200px',
        }}
      />
    </div>
  )
}
