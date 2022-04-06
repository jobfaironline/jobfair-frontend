/* eslint-disable no-unused-vars */
import { Tooltip } from 'antd'
import React from 'react'

export const ItemSlot = props => {
  const { isContain, id, onDragOver, onDrop, onDragStart, onClick, resume } =
    props
  if (resume !== undefined)
    return (
      <Tooltip title={`${resume.name}`}>
        <div
          draggable={true}
          id={id}
          className={'itemBox'}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onClick={onClick}
        >
          {
            <img
              src={window.location.origin + '/icon/scroll-unfurled.svg'}
              id={id}
              alt={'resume'}
            />
          }
        </div>
      </Tooltip>
    )
  return (
    <div
      draggable={true}
      id={id}
      className={'itemBox'}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onClick={onClick}
    ></div>
  )
}
