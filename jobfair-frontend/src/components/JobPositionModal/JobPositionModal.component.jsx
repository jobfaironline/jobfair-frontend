import React from 'react'
import { Button, Modal, Space } from 'antd'
import PickJobPositionTableContainer from '../../containers/JobPositionTable/JobPositionTable.container'

const JobPositionModal = ({ visible, handleCloseModal, form }) => {
  return (
    <>
      <Modal
        width={800}
        title="Choose job position"
        visible={visible}
        onCancel={handleCloseModal}
        footer={null}
        destroyOnClose
      >
        <PickJobPositionTableContainer form={form} selectable />
      </Modal>
    </>
  )
}

export default JobPositionModal
