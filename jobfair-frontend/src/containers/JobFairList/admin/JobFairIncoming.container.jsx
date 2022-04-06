import React, { useLayoutEffect, useState } from 'react'
import { getJobFairIncomingForAdmin } from '../../../services/job-fair-controller/JobFairConTrollerService'
import { notification, Space, Tooltip } from 'antd'
import JobFairForAdminComponent from '../../../components/JobFairList/JobFairForAdmin.component'
import PaginationComponent from '../../../components/PaginationComponent/Pagination.component'
import { MoreOutlined } from '@ant-design/icons'
import ViewRegistrationButtonComponent from '../../../components/ViewRegistrationButton/ViewRegistrationButton.component'
import JobFairDetailModalContainer from '../../../components/JobFairList/modal/JobFairDetailModal.container'
import { mapperResponseJobFairForAdmin } from '../../../utils/mapperJobFairDetail'

const JobFairIncomingContainer = () => {
  const [data, setData] = useState([])
  //pagination
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(5000)
  //modal
  const [jobFairId, setJobFairId] = useState('')
  const [creatorId, setCreatorId] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [totalElements, setTotalElements] = useState(0)

  const fetchData = async () => {
    getJobFairIncomingForAdmin(currentPage, pageSize)
      .then(res => {
        setTotalElements(res.data.totalElements)
        const result = mapperResponseJobFairForAdmin(res).map(item => {
          return {
            ...item,
            key: 'NOT_YET'
          }
        })
        setData([...result])
      })
      .catch(err => {
        notification['error']({
          message: `Error: ${err}`
        })
      })
  }

  useLayoutEffect(() => {
    fetchData()
  }, [currentPage, pageSize])

  const handlePageChange = (page, pageSize) => {
    if (page > 0) {
      setCurrentPage(page - 1)
    } else {
      setCurrentPage(page)
    }
    setPageSize(pageSize)
  }
  const modalProps = {
    jobFairId: jobFairId,
    creatorId: creatorId,
    visible: modalVisible,
    setModalVisible: setModalVisible,
    jobFairList: [...data]
  }

  const handleViewModal = (id, creatorId) => {
    setModalVisible(true)
    setJobFairId(id)
    setCreatorId(creatorId)
  }

  return (
    <>
      <JobFairDetailModalContainer {...modalProps} />
      <JobFairForAdminComponent
        data={data}
        editable
        extra={{
          title: 'Actions',
          key: 'action',
          width: '6rem',
          render: (text, record) => {
            return (
              <Space size="middle">
                <Tooltip placement="top" title="View detail">
                  <a
                    onClick={() => handleViewModal(record.id, record.creatorId)}
                  >
                    <MoreOutlined />
                  </a>
                </Tooltip>
                <ViewRegistrationButtonComponent
                  status={record.status}
                  id={record.id}
                />
              </Space>
            )
          }
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'end', padding: '1rem' }}>
        <PaginationComponent
          data={data}
          handlePageChange={handlePageChange}
          totalRecord={totalElements}
        />
      </div>
    </>
  )
}

export default JobFairIncomingContainer
