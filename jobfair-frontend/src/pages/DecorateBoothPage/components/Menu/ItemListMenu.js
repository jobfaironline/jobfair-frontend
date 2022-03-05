import React from 'react'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { ModeConstant } from '../../../../constants/AppConst'
import {useDispatch, useSelector} from "react-redux";
import {decorateBoothAction} from "../../../../redux-flow/decorateBooth/decorate-booth-slice";

export default function ItemListMenu({ items }) {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.decorateBooth.selectedSampleItem)

  const isItemSelected = id => selected?.id === id

  const handleClick = id => () => {
    if (selected.id === id){
      dispatch(decorateBoothAction.setMode(ModeConstant.SELECT));
      dispatch(decorateBoothAction.setSelectedSampleItem({}));
      return;
    }
    dispatch(decorateBoothAction.setMode(ModeConstant.ADD));
    dispatch(decorateBoothAction.setSelectedSampleItem(items.filter(item => item.id === id)[0]));
  }

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {items.map(item => (
        <Card
          itemId={item.id}
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
