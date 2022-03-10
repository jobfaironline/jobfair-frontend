import React, {useEffect, useLayoutEffect, useState} from 'react'
import {Button, notification, Pagination, Space, Divider, Typography, Upload, Form} from 'antd'
import {
    deleteJobPositionAPI,
    getJobPositionsAPI,
    updateJobPositionAPI, uploadCSVFile
} from '../../../services/job-controller/JobControllerService'
import {
    setJobPositionSubmodalVisibility
} from '../../../redux-flow/registration-jobfair-form/registration-jobfair-form-slice'
import {useDispatch} from 'react-redux'
import {PATH_COMPANY_MANAGER} from '../../../constants/Paths/Path'
import {useHistory} from 'react-router-dom'
import PaginationComponent from '../../PaginationComponent/Pagination.component'
import JobPositionTable from '../../JobPositionTable/JobPositionTable.component'
import {UploadOutlined} from "@ant-design/icons";
import UploadCsvFileComponent from "../../../containers/UploadCSVFile/UploadCSVFile.component";

const JobPositionManagementContainer = props => {
    const [data, setData] = useState([])
    const [jobPosition, setJobPosition] = useState({})
    const [modalVisible, setModalVisible] = useState(false)
    //pagination
    const [totalRecord, setTotalRecord] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    //
    const dispatch = useDispatch()
    const history = useHistory()

    const fetchData = async () => {
        getJobPositionsAPI('ASC', currentPage, pageSize, 'title')
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

    const handleCreateOnClick = () => {
        history.push(PATH_COMPANY_MANAGER.CREATE_JOB_POSITION)
    }

    const handleViewDetailPage = id => {
        history.push(PATH_COMPANY_MANAGER.JOB_POSITION_DETAIL, {
            jobPosition: data.find(item => item.id === id)
        })
    }

    return (
        <div style={{}}>
            {/*<JobPositionDetailModalContainer {...modalProps} />*/}
            {/*<JobPositionSubmodalContainer/>*/}

            <Space style={{display: 'flex', justifyContent: 'space-between', marginBottom: '1rem'}}>
                <Typography.Title level={2} style={{marginBottom: '0rem'}}>
                    Job positions
                </Typography.Title>
                <Space>
                    <Button type="primary" onClick={() => handleCreateOnClick()}>
                        Create job position
                    </Button>
                    <UploadCsvFileComponent/>
                </Space>
            </Space>

            <div style={{display: 'flex', flexDirection: 'column'}}>
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
                <Space style={{margin: '1rem 0', display: 'flex', justifyContent: 'end'}}>
                    <PaginationComponent data={data} handlePageChange={handlePageChange} totalRecord={totalRecord}/>
                </Space>
            </div>
        </div>
    )
}

export default JobPositionManagementContainer
