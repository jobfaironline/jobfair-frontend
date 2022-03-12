import {Tooltip} from "antd";
import React from "react";

export const ItemSlot = props => {
  const {isContain, id, onDragOver, onDrop, onDragStart, onClick} = props;
  if (isContain)
    return (
      <Tooltip title={"Click for more detail"}>
        <div draggable={true} id={id} className={"itemBox"}
             onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}
             onClick={onClick}
        >
          {isContain ? <img src={window.location.origin + "/icon/scroll-unfurled.svg"} id={id}/> : null}
        </div>
      </Tooltip>
    )
  return (
    <div draggable={true} id={id} className={"itemBox"}
         onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop}
         onClick={onClick}
    >
      {isContain ? <img src={window.location.origin + "/icon/scroll-unfurled.svg"} id={id}/> : null}
    </div>
  )
}