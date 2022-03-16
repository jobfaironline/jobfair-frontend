import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Button, notification, Space, Typography, Upload } from 'antd'
import { getJobPositionsAPI, uploadCSVFile } from '../../../services/job-controller/JobControllerService'
import { getEmployeesAPI } from '../../../services/company-employee-controller/CompanyEmployeeControllerService'
import { useDispatch } from 'react-redux'
import { PATH_COMPANY_MANAGER } from '../../../constants/Paths/Path'
import { useHistory } from 'react-router-dom'
import PaginationComponent from '../../PaginationComponent/Pagination.component'
import JobPositionTable from '../../JobPositionTable/JobPositionTable.component'
import { handleCreateListEmailFromListAccount, handleCreateListNameFromListAccount } from '../../../utils/common'
import { UploadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
const JobPositionManagementContainer = props => {
  const companyId = useSelector(state => state?.authentication?.user?.companyId)
  const [data, setData] = useState([])
  const [jobPosition, setJobPosition] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [forceRerenderState, setForceRerenderState] = useState(false)
  const [listContactPersonSuggestion, setListContactPersonSuggestion] = useState([])
  const [listEmailSuggestion, setListEmailSuggestion] = useState([])
  //pagination
  const [totalRecord, setTotalRecord] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  //
  const dispatch = useDispatch()
  const history = useHistory()

  const fetchData = async () => {
    getJobPositionsAPI('DESC', currentPage, pageSize, 'createdDate')
      .then(res => {
        const totalRecord = res.data.totalElements
        setTotalRecord(totalRecord)
        setData([
          ...res.data.content.map((item, index) => {
            return {
              key: item.id,
              no: index + res.data.number * 10 + 1,
              ...item
            }
          })
        ])
      })
      .catch(err => {
//
      })
  }
  useEffect(() => {
    getEmployeesAPI(companyId)
      .then(res => {
        setListContactPersonSuggestion(handleCreateListNameFromListAccount(res.data))
        setListEmailSuggestion(handleCreateListEmailFromListAccount(res.data))
      })
      .catch(e => {
//
      })
  }, [])
  useLayoutEffect(() => {
    fetchData()
  }, [currentPage, pageSize, forceRerenderState])

  const handlePageChange = (page, pageSize) => {
    if (page > 0) {
      setCurrentPage(page - 1)
    } else {
      setCurrentPage(page)
    }
    setPageSize(pageSize)
  }

  const handleCreateOnClick = () => {
    history.push({
      pathname: PATH_COMPANY_MANAGER.CREATE_JOB_POSITION,
      state: { listContactPersonSuggestion: listContactPersonSuggestion, listEmailSuggestion: listEmailSuggestion }
    })
  }

  const handleViewDetailPage = id => {
    history.push(PATH_COMPANY_MANAGER.JOB_POSITION_DETAIL, {
      jobPosition: data.find(item => item.id === id)
    })
  }

  const loadFile = {
    name: 'file',
    accept: '.csv',
    beforeUpload: file => {
      return false
    },
    onChange: async info => {
      if (info.file.type !== 'text/csv') {
        notification['error']({
          message: `${info.file.name} is not csv`
        })
        return
      }
      const formData = new FormData()
      formData.append('file', info.file)
      await uploadCSVFile(formData)
      notification['success']({
        message: `${info.file.name} upload successfully`
      })
      //force render to fetch data after upload
      setForceRerenderState(prevState => !prevState)
    },
    showUploadList: false,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068'
      },
      strokeWidth: 3,
      format: percent => `${parseFloat(percent.toFixed(2))}%`
    }
  }

  return (
    <div style={{}}>
      {/*<JobPositionDetailModalContainer {...modalProps} />*/}
      {/*<JobPositionSubmodalContainer/>*/}

      <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Typography.Title level={2} style={{ marginBottom: '0rem' }}>
          Job positions
        </Typography.Title>
        <Space>
          <Button type="primary" onClick={() => handleCreateOnClick()}>
            Create job position
          </Button>
          <Upload {...loadFile}>
            <Button icon={<UploadOutlined />}>Upload CSV</Button>{' '}
          </Upload>
        </Space>
      </Space>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <JobPositionTable
          data={data}
          editable
          extra={{
            title: 'Actions',
            key: 'action',
            render: (text, record) => {
              return (
                <Space size="middle">
                  <a
                    // onClick={() => handleViewDetailModal(record.id)}
                    onClick={() => handleViewDetailPage(record.id)}
                  >
                    View detail
                  </a>
                </Space>
              )
            }
          }}
        />
        <Space style={{ margin: '1rem 0', display: 'flex', justifyContent: 'end' }}>
          <PaginationComponent data={data} handlePageChange={handlePageChange} totalRecord={totalRecord} />
        </Space>
      </div>
    </div>
  )
}

export default JobPositionManagementContainer
