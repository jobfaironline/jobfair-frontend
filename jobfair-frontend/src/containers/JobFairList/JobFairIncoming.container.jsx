import React, {useLayoutEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {getJobFairIncomingForAdmin} from "../../services/job-fair-controller/JobFairConTrollerService";
import {convertEnumToString, convertToDateString} from "../../utils/common";
import {notification, Select, Space, Tooltip} from "antd";
import {JOB_FAIR_FOR_ADMIN_STATUS} from "../../constants/JobFairConst";
import JobFairForAdminComponent from "../../components/JobFairList/JobFairForAdmin.component";
import PaginationComponent from "../../components/PaginationComponent/Pagination.component";
import {PATH_ADMIN} from "../../constants/Paths/Path";
import {EyeOutlined, MoreOutlined} from "@ant-design/icons";
import ViewRegistrationButton from "../../components/ViewRegistrationButton/ViewRegistrationButton";
import JobFairDetailModalContainer from "../../components/JobFairList/modal/JobFairDetailModal.container";

const {Option} = Select;


const JobFairIncomingContainer = () => {
    const [data, setData] = useState([])
    //pagination
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    //modal
    const [jobFairId, setJobFairId] = useState('')
    const [creatorId, setCreatorId] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const history = useHistory()


    const fetchData = async () => {
        getJobFairIncomingForAdmin(currentPage, pageSize)
            .then(res => {
                    const result = res.data.content.map((item, index) => {
                        return {
                            no: index,
                            id: item.jobFair.id,
                            companyRegisterStartTime: convertToDateString(item.jobFair.companyRegisterStartTime),
                            companyRegisterEndTime: convertToDateString(item.jobFair.companyRegisterEndTime),
                            companyBuyBoothStartTime: convertToDateString(item.jobFair.companyBuyBoothStartTime),
                            companyBuyBoothEndTime: convertToDateString(item.jobFair.companyBuyBoothEndTime),
                            attendantRegisterStartTime: convertToDateString(item.jobFair.attendantRegisterStartTime),
                            startTime: convertToDateString(item.jobFair.startTime),
                            endTime: convertToDateString(item.jobFair.endTime),
                            description: item.jobFair.description,
                            layoutId: item.jobFair.layoutId,
                            name: item.jobFair.name,
                            creatorId: item.jobFair.creatorId,
                            estimateParticipant: item.jobFair.estimateParticipant,
                            targetCompany: item.jobFair.targetCompany,
                            targetAttendant: item.jobFair.targetAttendant,
                            status: item.status
                        }
                    })
                    setData([...result]);
                }
            ).catch(err => {
            notification['error']({
                message: `Error: ${err}`,
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

    const handleViewDetailPage = (id) => {
        history.push(PATH_ADMIN.JOB_FAIR_DETAIL_PAGE, {
            jobFair: data.find(item => item.id === id)
        })
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
                    render: (text, record) => {
                        return (
                            <Space size="middle">
                                <Tooltip placement="top" title='View detail'>
                                    <a
                                        onClick={() => handleViewModal(record.id, record.creatorId)}
                                    >
                                        <MoreOutlined/>
                                    </a>
                                </Tooltip>
                                <ViewRegistrationButton status={record.status} id={record.id}/>
                            </Space>
                        )
                    }
                }}
            />
            <Space>
                <PaginationComponent data={data} handlePageChange={handlePageChange} totalRecord={data.length}/>
            </Space>
        </>
    );
};

export default JobFairIncomingContainer;