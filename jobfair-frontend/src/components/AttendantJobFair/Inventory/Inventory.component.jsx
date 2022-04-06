import React from 'react'
import './Inventory.component.scss'
import { ItemSlot } from './ItemSlot.component'

export const Inventory = props => {
  const { visible, inventory, onDragStart, onDragOver, onDrop, onClick } = props

  return (
    <div
      className={'panel'}
      style={{ visibility: visible ? 'visible' : 'hidden' }}
    >
      <h1>Inventory</h1>
      <div className={'characterContainer'}>
        <img
          src={window.location.origin + '/icon/background.png'}
          alt={'Character image'}
        />
      </div>
      <div className={'itemRow'}>
        {Object.keys(inventory).map(key => {
          return (
            <ItemSlot
              resume={inventory[key]}
              id={key}
              key={key}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onClick={onClick}
            />
          )
        })}
      </div>
    </div>
  )
}
