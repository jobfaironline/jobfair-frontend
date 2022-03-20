import React, {useState} from "react";
import {Inventory} from "./Inventory.component";
import {InventoryButton} from "./InventoryButton.component";
import {Modal} from "antd";



export const InventoryContainer = (props) => {

  const {onClick, inventoryVisible} = props;

  const [inventory, setInventory] = useState({
    "slot-1": true,
    "slot-2": true,
    "slot-3": true,
    "slot-4": true,
    "slot-5": false,
    "slot-6": false,
    "slot-7": false,
    "slot-8": false,
  })

  const onDragStart = e => {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  const onDragOver = e => {
    e.preventDefault();
    const dragId = e.dataTransfer.getData("text/plain");
    if (inventory[e.target.id] === false && e.target.id !== dragId) {
      e.dataTransfer.dropEffect = "move";
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  }

  const onDrop = e => {
    e.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const dragId = e.dataTransfer.getData("text/plain");
    const dropId = e.target.id;
    setInventory(prevState => {
        const obj = {...prevState};
        obj[dropId] = true;
        obj[dragId] = false;
        return obj;
      }
    );
  }

  const onInventoryClick = e => {
    e.preventDefault();
    Modal.info({
      title: 'Updated title',
      content: 'Updated content',
    });
  }

  return (
    <>
      <InventoryButton onClick={onClick}/>
      <Inventory visible={inventoryVisible} inventory={inventory} setInventory={setInventory} onDragStart={onDragStart}
                 onDragOver={onDragOver} onDrop={onDrop} onClick={onInventoryClick}

      />
    </>
  )
}