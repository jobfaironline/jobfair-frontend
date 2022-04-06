import React from 'react'
import './InventoryButton.component.scss'

export const InventoryButton = props => {
  const { onClick } = props
  return (
    <div className={'button'} onClick={() => onClick()}>
      <img src={window.location.origin + '/icon/backpack.svg'} alt={'Backpack'} />
    </div>
  )
}
