import React, {useEffect, useLayoutEffect, useState} from 'react';
import JobPositionManagementComponent
    from "../../../components/JobPosition/JobPositionManagement/JobPositionManagement.component";
import {evaluateJobFairPlanAPI, getAllJobFairAPI} from "../../../services/jobfairService";
import {convertToDateString} from "../../../utils/common";
import {notification, Pagination, Space} from "antd";
import JobFairDetailModalContainer from "../../../components/JobFairList/modal/JobFairDetailModal.container";
import JobFairListEvaluateComponent from "../../../components/JobFairList/JobFairList.evaluate.component";
import EvaluationFormComponent from "../../../components/EvaluationForm/EvaluationForm.component";
import {Link} from "react-router-dom";
import JobFairListManagementComponent from "../../../components/JobFairList/JobFairList.management.component";
import {getJobPositionsAPI} from "../../../services/registrationJobFairService";

const JobPositionManagementContainer = () => {
    const [data, setData] = useState([]);
    const [jobFairId, setJobFairId] = useState('');
    // const [creatorId, setCreatorId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    //pagination
    const [totalRecord, setTotalRecord] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const fetchData = async () => {
        getJobPositionsAPI()
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        // getAllJobFairAPI(currentPage, pageSize, 'startTime', 'DESC')
        //     .then(res => {
        //         const totalRecord = res.data.totalElements;
        //         setTotalRecord(totalRecord)
        //
        //         const dataSet = res.data.content.map(item => {
        //             return {
        //                 ...item,
        //                 attendantRegisterStartTime: convertToDateString(item.attendantRegisterStartTime).split('T')[0],
        //                 companyBuyBoothEndTime: convertToDateString(item.companyBuyBoothEndTime).split('T')[0],
        //                 companyBuyBoothStartTime: convertToDateString(item.companyBuyBoothStartTime).split('T')[0],
        //                 companyRegisterEndTime: convertToDateString(item.companyRegisterEndTime).split('T')[0],
        //                 companyRegisterStartTime: convertToDateString(item.companyRegisterStartTime).split('T')[0],
        //                 endTime: convertToDateString(item.endTime).split('T')[0],
        //                 startTime: convertToDateString(item.startTime).split('T')[0]
        //             }
        //         })
        //         setData([...dataSet])
        //         notification['success']({
        //             message: `Get job fair list successfully`,
        //             duration: 2
        //         })
        //     })
        //     .catch(err => {
        //         notification['error']({
        //             message: `Get job fair list failed`,
        //             description: `There is problem while fetching, try again later: ${err}`,
        //             duration: 2
        //         })
        //     })
    }

    const modalProps = {
        jobFairId: jobFairId,
        creatorId: creatorId,
        visible: modalVisible,
        setModalVisible: setModalVisible,
        jobFairList: [...data]
    }

    useEffect(() => {
        fetchData()
    }, [])

    const onFinish = (values) => {
        evaluateJobFairPlanAPI(values)
            .then(res => {
                notification['success']({
                    message: `Your evaluation has been submitted`,
                    description: `Evaluate job fair plan successfully`
                })
                fetchData()
            })
            .catch(err => {
                notification['error']({
                    message: `An error occurred while submitting`,
                    description: `Evaluate job fair plan failed - ${err}`
                })
            })
    }
    useLayoutEffect(() => {
        fetchData()
    }, [currentPage, pageSize])

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page - 1);
        setPageSize(pageSize)
    }

    return (
        <>
            <JobFairDetailModalContainer {...modalProps}/>
            <JobFairListManagementComponent data={data} editable extra={{
                title: 'Actions',
                key: 'action',
                render: (text, record) => {
                    return (
                        <Space size="middle">
                            <a onClick={() => {
                                setModalVisible(true)
                                setJobFairId(record.id)
                                // setCreatorId(record.creatorId)
                            }}>
                                View detail
                            </a>
                            {record.status === 'PENDING' ?
                                <EvaluationFormComponent onFinish={onFinish} id={record.id} name='jobFairId'/>
                                : null}
                            {record.status === 'APPROVE'
                                ? <Link to={`/approval-registration/${record.id}`}>Evaluate registrations</Link>
                                : null}
                        </Space>
                    )
                }
            }}/>
            <Pagination
                total={totalRecord}
                onChange={(page, pageSize) => handlePageChange(page, pageSize)}
                showSizeChanger
                showQuickJumper
                showTotal={total => `Total ${total} items`}
                pageSizeOptions={[5, 10, 15, 20]}
            />,
        </>
    );
};

export default JobPositionManagementContainer;