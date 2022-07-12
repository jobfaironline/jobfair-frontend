import './Inventory.component.scss';
import { HUMAN_THUMBNAIL_URL } from '../../../../constants/3DConst';
import { ItemSlot } from '../ItemSlot/ItemSlot.component';
import React from 'react';

export const Inventory = (props) => {
  const { visible, inventory, onDragStart, onDragOver, onDrop, onClick } = props;

  return (
    <div className={'panel'} style={{ visibility: visible ? 'visible' : 'hidden' }}>
      <h1>Inventory</h1>
      <div className={'characterContainer'}>
        <img src={HUMAN_THUMBNAIL_URL} alt={'Character image'} />
      </div>
      <div className={'itemRow'}>
        {Object.keys(inventory).map((key) => (
          <ItemSlot
            resume={inventory[key]}
            id={key}
            key={key}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};
