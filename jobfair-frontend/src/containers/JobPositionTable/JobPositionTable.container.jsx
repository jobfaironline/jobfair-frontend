import React, { useEffect, useState, useLayoutEffect } from 'react'
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
import JobPositionSubmodal from '../../components/JobPositionModal/JobPositionSubmodal.component'
import JobPositionSubmodalContainer from '../JobPositionModal/JobPositionSubmodal.container'
import PaginationComponent from '../../components/PaginationComponent/Pagination.component'

const JobPositionTable = ({ selectable }) => {
  //pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  //

  const totalRecord = useSelector(state => {
    return state?.jobPosition?.totalRecord
  })

  const [neededJobPosition, setNeededJobPosition] = useState(null)

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

  const handleGetDetail = jobPositionId => {
    setNeededJobPosition(jobPositionId)
  }

  const fetchData = async (currentPage, pageSize) => {
    dispatch(fetchJobPositions({ currentPage, pageSize }))
  }

  useLayoutEffect(() => {
    fetchData(currentPage, pageSize)
  }, [currentPage, pageSize])

  const handlePageChange = (page, pageSize) => {
    if (page > 0) {
      setCurrentPage(page - 1)
    } else {
      setCurrentPage(page)
    }
    setPageSize(pageSize)
  }

  return (
    <div>
      <JobPositionSubmodalContainer jobPositionId={neededJobPosition} />
      <JobPositionTableComponent
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
              </Space>
            )
          }
        }}
        rowSelection={selectable ? { ...rowSelection } : null}
      />
      <Space style={{ margin: '1rem', display: 'flex', justifyContent: 'end' }}>
        <PaginationComponent data={jobPositionData} handlePageChange={handlePageChange} totalRecord={totalRecord} />
      </Space>
      {selectable ? (
        <Popconfirm
          title="Are you sure to choose these jobs?"
          onConfirm={chooseJobPositions}
          okText="Yes"
          cancelText="No"
        >
          <Button style={{ width: '100%' }} type="primary">
            Choose
          </Button>
        </Popconfirm>
      ) : null}
    </div>
  )
}

export default JobPositionTable
