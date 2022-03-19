import React, {useState} from "react";
import "./Inventory.component.scss"
import {Modal} from "antd";
import {ItemSlot} from "./ItemSlot.component";

export const Inventory = props => {
  const {visible} = props;

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

  const onClick = e => {
    e.preventDefault();
    Modal.info({
      title: 'Updated title',
      content: 'Updated content',
    });
  }

  return (
    <div className={"panel"} style={{visibility: visible ? "visible" : "hidden"}}>
      <h1>Inventory</h1>
      <div className={"characterContainer"}>
        <img src={window.location.origin + "/icon/background.png"} alt={"Character image"}/>
      </div>
      <div className={"itemRow"}>
        {
          Object.keys(inventory).map(key => {
            return (
              <ItemSlot isContain={inventory[key]} id={key} key={key} onDragStart={onDragStart} onDragOver={onDragOver}
                        onDrop={onDrop} onClick={onClick}/>
            )
          })
        }
      </div>
    </div>
  )
}
