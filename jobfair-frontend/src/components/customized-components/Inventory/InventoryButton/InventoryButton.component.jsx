import './InventoryButton.component.scss';
import React from 'react';

export const InventoryButton = (props) => {
  const { onClick } = props;
  return (
    <div className={'inventory-button'} onClick={() => onClick()}>
      <img src={`${window.location.origin}/icon/backpack.svg`} alt={'Backpack'} />
    </div>
  );
};
