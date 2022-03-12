import React, {useLayoutEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {getAllJobFairAPI} from "../../services/job-fair-controller/JobFairConTrollerService";
import {convertToDateString} from "../../utils/common";
import {notification, Pagination, Space} from "antd";
import {PATH_ADMIN} from "../../constants/Paths/Path";
import JobFairPlanComponent from "../../components/JobFairPlan/JobFairPlan.component";


const JobFairPlanContainer = () => {
    const [data, setData] = useState([])
    //pagination
    const [totalRecord, setTotalRecord] = useState(0)
    const [currentPage, setCurrentPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    //
    const history = useHistory();

    const fetchData = async () => {
        getAllJobFairAPI(currentPage, pageSize, 'startTime', 'DESC')
            .then(res => {
                const totalRecord = res.data.totalElements
                setTotalRecord(totalRecord)
                const dataSet = res.data.content.map(item => {
                    return {
                        ...item,
                        attendantRegisterStartTime: convertToDateString(item.attendantRegisterStartTime),
                        companyBuyBoothEndTime: convertToDateString(item.companyBuyBoothEndTime),
                        companyBuyBoothStartTime: convertToDateString(item.companyBuyBoothStartTime),
                        companyRegisterEndTime: convertToDateString(item.companyRegisterEndTime),
                        companyRegisterStartTime: convertToDateString(item.companyRegisterStartTime),
                        endTime: convertToDateString(item.endTime),
                        startTime: convertToDateString(item.startTime)
                    }
                })
                setData([...dataSet])
            })
            .catch(err => {
                notification['error']({
                    message: `Get job fair list failed`,
                    description: `There is problem while fetching, try again later: ${err}`,
                    duration: 2
                })
            })
    }

    useLayoutEffect(() => {
        fetchData()
    }, [currentPage, pageSize])

    const handlePageChange = (page, pageSize) => {
        if (page > 0) {
            setCurrentPage(page - 1)
        }
        else {
            setCurrentPage(page)
        }
        setPageSize(pageSize)
    }

    const handleViewDetail = (id) => {
        history.push(PATH_ADMIN.JOB_FAIR_DETAIL_PAGE, {
            jobFair: data.find(item => item.id === id)
        })
    }

    return (
        <>
            <JobFairPlanComponent
                data={data}
                editable
                extra={{
                    title: 'Actions',
                    key: 'action',
                    render: (text, record) => {
                        return (
                            <Space size="middle">
                                <a
                                    onClick={() => handleViewDetail(record.id)}
                                >
                                    View detail
                                </a>
                            </Space>
                        )
                    }
                }}
            />
            <Pagination
                total={totalRecord}
                onChange={(page, pageSize) => handlePageChange(page, pageSize)}
                showSizeChanger
                showQuickJumper
                showTotal={total => `Total ${total} items`}
                pageSizeOptions={[5, 10, 15, 20]}
            />
            ,
        </>
    )
};

export default JobFairPlanContainer;