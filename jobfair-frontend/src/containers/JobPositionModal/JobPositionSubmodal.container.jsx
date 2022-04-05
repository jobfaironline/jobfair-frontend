import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import JobPositionSubmodalDetailComponent from "../../components/JobPositionModal/JobPositionSubmodalDetail.component";
import {Modal} from "antd";

const JobPositionSubmodalContainer = ({jobPositionId, visible, handleCloseModal}) => {
  const [data, setData] = useState(null)

  const jobPositions = useSelector(state => {
    return state?.jobPosition?.data
  })

  useEffect(() => {
    setData(jobPositions?.filter(item => item.id == jobPositionId)[0])
  }, [jobPositionId])

  return (
    <Modal
      wrapClassName="detail-modal"
      title="Job position's details"
      visible={visible}
      onCancel={handleCloseModal}
      footer={null}
      destroyOnClose
    >
      <JobPositionSubmodalDetailComponent data={data}/>
    </Modal>
  )


}

export default JobPositionSubmodalContainer
