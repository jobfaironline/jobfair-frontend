import React, {useState} from 'react';
import {Modal, Select} from "antd";
import JobPositionDetailFormComponent from "./JobPositionDetailForm.component";

const {Option, OptGroup} = Select

const JobPositionDetailModalComponent = (props) => {
  const {
    visible,
    handleOk,
    handleCancel,
    data,
    form,
    onFinish,
    handleDelete,
  } = props


  const [totalSelect, setTotalSelect] = useState(0);

  return (
    <>
      <Modal
        width={800}
        title="Job position detail"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <JobPositionDetailFormComponent form={form} onFinish={onFinish}/>
      </Modal>
    </>
  )
    ;
};

export default JobPositionDetailModalComponent;