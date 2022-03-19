import React, {useState} from "react";
import {Inventory} from "./Inventory.component";
import {InventoryButton} from "./InventoryButton.component";



export const InventoryContainer = (props) => {

  const {onClick, inventoryVisible} = props;

  return (
    <>
      <InventoryButton onClick={onClick}/>
      <Inventory visible={inventoryVisible}/>
    </>
  )
}