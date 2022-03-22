import React, {useLayoutEffect, useState} from 'react'
import JobPositionTableComponent from '../../components/JobPositionTable/JobPositionTable.component'
import {Button, Space} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {fetchJobPositions} from '../../redux-flow/jobPositions/job-positions-action'
import JobPositionSubmodalContainer from '../JobPositionModal/JobPositionSubmodal.container'

const PickJobPositionTable = ({selectable, form, rerender}) => {

  const [neededJobPositionDetail, setNeededJobPositionDetail] = useState(null)
  const [modalVisible, setModalVisibile] = useState(false)

  const jobPositionData = useSelector(state => {
    return state?.jobPosition.data
  })

  const dispatch = useDispatch()

  //select table logic
  const [initialSelectedValues, setInitialSelectedValues] = useState(() =>
    form.getFieldsValue().jobPositions ? [...form.getFieldsValue().jobPositions.map(item => item.key)] : []
  )
  const [selectedRowKeys, setSelectedRowKeys] = useState(() => [...initialSelectedValues])
  const [selectedRows, setSelectedRows] = useState(
    form.getFieldsValue().jobPositions ? [...form.getFieldsValue().jobPositions] : []
  )

  //handle choose job button
  const chooseJobPositions = () => {
    const mappedData = []

    selectedRows.forEach(item => {
      if (!initialSelectedValues.includes(item.id)) {
        mappedData.push(item)
      }
    })

    const currentJobPositionsInForm = form.getFieldsValue().jobPositions ? [...form.getFieldsValue().jobPositions] : []
    form.setFieldsValue({ ...form.getFieldsValue(), jobPositions: [...currentJobPositionsInForm, ...mappedData] })
    setInitialSelectedValues(selectedRowKeys)
    rerender({})

  }

  const rowSelection = {
    selectedRowKeys: [...selectedRowKeys],
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    },
    getCheckboxProps: record => {
      return {
        disabled: initialSelectedValues.includes(record.key),
        // Column configuration not to be checked
        name: record.name
      }
    },
    hideSelectAll: true,
    preserveSelectedRowKeys: true
  }

  const handleGetDetail = jobPositionId => {
    setNeededJobPositionDetail(jobPositionId)
    setModalVisibile(true)
  }

  const handlePageChange = (page, pageSize) => {
    if (page > 0) {
      setCurrentPage(page - 1)
    } else {
      setCurrentPage(page)
    }
    setPageSize(pageSize)
  }

  const fetchData = async (currentPage, pageSize) => {
    dispatch(fetchJobPositions({ currentPage, pageSize }))
  }

  useLayoutEffect(() => {
    fetchData(currentPage, pageSize)
  }, [currentPage, pageSize])

  return (
    <div>
      <JobPositionSubmodalContainer
        jobPositionId={neededJobPositionDetail}
        visible={modalVisible}
        handleCloseModal={() => setModalVisibile(false)}
      />
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
        <Button style={{ width: '100%' }} type="primary" onClick={chooseJobPositions}>
          Choose
        </Button>
      ) : null}
    </div>
  )
}

export default PickJobPositionTable
