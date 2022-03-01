import React from 'react'
import {Button, Modal, Space} from 'antd'
import JobPositionTable from '../../containers/JobPositionTable/JobPositionTable.container'

const JobPositionModal = ({visible, setFinalSelectedJob, handleOk, handleCancel, handleCreateOnClick}) => {
    //modal
    const [confirmLoading, setConfirmLoading] = React.useState(false)

    const finalHandleOk = async () => {
        setConfirmLoading(true)
        await handleOk()
        setConfirmLoading(false)
    }

    return (
        <>
            <Modal
                width={800}
                title="Choose job position"
                visible={visible}
                onOk={finalHandleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={null}
            >
                <Space>
                    <Button type="primary" onClick={() => handleCreateOnClick()}>
                        Create job position
                    </Button>
                </Space>
                <JobPositionTable setFinalSelectedJob={setFinalSelectedJob}/>
            </Modal>
        </>
    )
}

export default JobPositionModal
