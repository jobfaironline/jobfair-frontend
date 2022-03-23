import React, {useEffect, useState} from "react";
import {Inventory} from "./Inventory.component";
import {InventoryButton} from "./InventoryButton.component";
import {Modal} from "antd";
import {getAttendantCv} from "../../../services/cv-controller/CvControllerService";
import {useDispatch} from "react-redux";
import {inventoryAction} from "../../../redux-flow/inventory/inventory-slice";
import ResumeDetailComponent from "../../Resume/ResumeDetail.component";
import {convertToDateValue} from "../../../utils/common";


export const InventoryContainer = (props) => {

  const {onClick, inventoryVisible} = props;
  const dispatch = useDispatch()


  const [inventory, setInventory] = useState({
    "slot-1": undefined,
    "slot-2": undefined,
    "slot-3": undefined,
    "slot-4": undefined,
    "slot-5": undefined,
    "slot-6": undefined,
    "slot-7": undefined,
    "slot-8": undefined,
  })

  const fetchData = async () => {
    const response = await getAttendantCv();
    const data = response.data;
    const obj = {}
    for (let i=1; i < data.length + 1; i++){
      const key = "slot-" + i;
      obj[key] = data[i-1];
    }
    dispatch(inventoryAction.setInventory({...inventory, ...obj}));

    setInventory(prevState => {
      return {...prevState, ...obj};
    })
  }

  useEffect(() => {
    fetchData();
  }, [])


  const onDragStart = e => {
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  const onDragOver = e => {
    e.preventDefault();
    const dragId = e.dataTransfer.getData("text/plain");
    if (inventory[e.target.id] === undefined && e.target.id !== dragId) {
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
    const obj = inventory;
    obj[dropId] = obj[dragId];
    obj[dragId] = undefined;

    dispatch(inventoryAction.setInventory(obj))

    setInventory(prevState => {
        return {...prevState, ...obj}
      }
    );
  }

  const handleOnChangeDob = dateString => {
    return convertToDateValue(dateString)
  }

  const onInventoryClick = (e) => {
    e.preventDefault();
    const id = e.target.id;
    const cv = inventory[id]
    Modal.info({
      title: 'Cv detail',
      width: '90rem',
      closable: true,
      maskClosable: true,
      content: <ResumeDetailComponent data={cv} handleOnChangeDob={handleOnChangeDob}/>
    });
  }


  if (inventory === undefined) return null;
  return (
    <>
      <InventoryButton onClick={onClick}/>
      <Inventory visible={inventoryVisible} inventory={inventory} setInventory={setInventory} onDragStart={onDragStart}
                 onDragOver={onDragOver} onDrop={onDrop} onClick={onInventoryClick}

      />
    </>
  )
}