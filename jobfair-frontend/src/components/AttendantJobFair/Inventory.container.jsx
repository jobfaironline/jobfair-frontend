import React, {useState} from "react";
import {Inventory} from "./Inventory.component";
import {InventoryButton} from "./InventoryButton.component";



export const InventoryContainer = (props) => {

  const [inventoryVisible, setInventoryVisible] = useState(true);
  const onClick = () => {
    setInventoryVisible(prevState => !prevState);
  }

  return (
    <>
      <InventoryButton onClick={onClick}/>
      <Inventory visible={inventoryVisible}/>
    </>
  )
}