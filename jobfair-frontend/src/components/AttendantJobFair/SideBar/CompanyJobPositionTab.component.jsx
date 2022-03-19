import {List, Modal, notification, Typography} from "antd";
import {useState} from "react";

export const CompanyJobPositionTab = (props) => {
  const {jobPositions} = props;
  const [hoverListItem, setHoverListItem] = useState();
  return (
    <div style={{padding: "0 20px 20px 0"}}>
      <List
        bordered
        dataSource={jobPositions}
        renderItem={item => (
          <List.Item
            onDragOver={(e) => {
              e.preventDefault()
              e.dataTransfer.dropEffect = "move";
              if (item.id !== hoverListItem) {
                setHoverListItem(item)
              }
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setHoverListItem(undefined);
            }}
            onDrop={(e) => {
              const dragId = e.dataTransfer.getData("text/plain");
              Modal.info({
                title: "Are you sure?",
                onOk: () => {
                  notification['success']({
                    message: `Add cv ${dragId} successfully to ${item.title}`,
                  })
                }
              })
              setHoverListItem(undefined)
            }}>
            <Typography.Text>{item.title}</Typography.Text>
            {hoverListItem?.id === item.id ? <div>True</div> : <div>False</div>}
          </List.Item>
        )}
      />
    </div>

  )
}