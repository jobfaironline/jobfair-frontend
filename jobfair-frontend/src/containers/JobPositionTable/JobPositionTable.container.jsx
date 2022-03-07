import React, { useEffect, useState } from 'react'
import JobPositionTableComponent from '../../components/JobPositionTable/JobPositionTable.component'
import { Space, notification, Popconfirm, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getJobPositionsAPI } from '../../services/job-controller/JobControllerService'
import { fetchJobPositions } from '../../redux-flow/jobPositions/job-positions-action'
import {
  setFormBody,
  setJobPositionModalVisibility,
  setJobPositions
} from '../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'

const JobPositionTable = ({ selectable, extra }) => {
  const jobPositionData = useSelector(state => {
    return state?.jobPosition.data
  })

  const jobPositionsInForm = useSelector(state => {
    return state?.registrationJobfairForm?.form?.body?.jobPositions
  })
  const dispatch = useDispatch()

  //select table logic
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const modalVisible = useSelector(state => state.registrationJobfairForm?.jobPositionModalVisibility)

  useEffect(() => {
    const mappedRows = jobPositionsInForm.map(item => item.key)
    if (modalVisible) setSelectedRowKeys(mappedRows)
  }, [modalVisible])

  //handle pick button
  const chooseJobPositions = () => {
    const mappedData = []
    for (const item of jobPositionData) {
      if (selectedRowKeys.includes(item.key)) {
        mappedData.push(item)
      }
    }
    dispatch(setJobPositions(mappedData))
    dispatch(setJobPositionModalVisibility(false))
  }

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name
    })
  }

  const fetchData = async () => {
    dispatch(fetchJobPositions())
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <JobPositionTableComponent
        data={jobPositionData}
        editable
        extra={extra}
        rowSelection={selectable ? { ...rowSelection } : null}
      />
      {selectable ? (
        <Popconfirm
          title="Are you sure to choose these jobs?"
          onConfirm={chooseJobPositions}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary">Choose</Button>
        </Popconfirm>
      ) : null}
    </div>
  )
}

export default JobPositionTable
