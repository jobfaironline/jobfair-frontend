import React, { useEffect, useState } from 'react'
import JobPositionTableComponent from '../../components/JobPositionTable/JobPositionTable.component'
import { Space, notification, Popconfirm } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getJobPositionsAPI } from '../../services/registrationJobFairService'
import { fetchJobPositions } from '../../redux-flow/jobPositions/job-positions-action'

const JobPositionTable = ({ extra }) => {
  const jobPositionData = useSelector(state => {
    return state?.jobPosition.data
  })

  const jobPositionsInForm = useSelector(state => {
    return state?.registrationJobfairForm?.form?.body?.jobPositions
  })
  const dispatch = useDispatch()

  const fetchData = async () => {
    dispatch(fetchJobPositions())
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = jobPositionId => {
    console.log('deleted')
  }

  const handleGetDetail = jobPositionId => {
    console.log(jobPositionId)
  }

  return (
    <div>
      <JobPositionTableComponent
        jobPositionsInForm={jobPositionsInForm}
        data={jobPositionData}
        editable
        extra={{
          title: 'Actions',
          key: 'action',
          render: (text, record) => {
            return (
              <Space size="middle">
                <a
                  onClick={() => {
                    handleGetDetail(record.id)
                  }}
                >
                  Detail
                </a>
                <Popconfirm
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                    handleDelete(record.id)
                  }}
                >
                  <a href="#">Delete</a>
                </Popconfirm>
              </Space>
            )
          }
        }}
      />
    </div>
  )
}

export default JobPositionTable
