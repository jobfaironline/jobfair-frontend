import React from 'react'
import { Button, Modal, Space } from 'antd'
import PickJobPositionTableContainer from '../../containers/JobPositionTable/JobPositionTable.container'

const JobPositionModal = ({ visible, handleCloseModal, form, rerender }) => {
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
        {visible ? <PickJobPositionTableContainer form={form} rerender={rerender} selectable /> : null}
      </Modal>
    </>
  )
}

export default JobPositionModal
