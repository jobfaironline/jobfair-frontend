import React, {useEffect, useLayoutEffect, useState} from 'react';
import ApprovalRegistrationComponent
    from "../../components/ApprovalRegistration/components/ApprovalRegistration.component";
import {Button, Form, Input, notification, Pagination, Popover, Radio, Space} from "antd";
import {useParams} from "react-router-dom";
import {evaluateJobFairRegistrationAPI, getRegistrationByJobFairId} from "../../services/jobfairService";
import {convertToDateString} from "../../utils/common";
import TextArea from "antd/es/input/TextArea";
import {EvaluateConst} from "../../constants/JobPositionConst";
import CompanyRegistrationDetailModalContainer
    from "../../components/ApprovalRegistration/modal/CompanyRegistrationDetailModal.container";
import EvaluationFormComponent from "../../components/EvaluationForm/EvaluationForm.component";

const ApprovalRegistrationContainer = () => {
    const [data, setData] = useState([]);
    const [regisId, setRegisId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    //paging state
    const [totalRecord, setTotalRecord] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const {jobFairId} = useParams();

    const fetchData = async () => {
        getRegistrationByJobFairId(jobFairId, currentPage, pageSize, 'createDate', 'DESC')
            .then(res => {
                // console.log(res.data)
                const totalRecord = res.data.totalElements;
                setTotalRecord(totalRecord)
                const result = res.data.content.map((item, index) => {
                    return {
                        ...item,
                        createDate: convertToDateString(item.createDate).split('T')[0],
                        no: index + 1,
                    }
                })
                setData([...result])
                notification['success']({
                    message: `All registration has been loaded`,
                    description: `with job fair ID: ${jobFairId}`,
                    duration: 1,
                })
            })
            .catch(err => {
                notification['error']({
                    message: `Not found company registration by job fair ID: ${jobFairId}`,
                    description: `${err}`,
                    duration: 2,
                })
            })
    }
    useEffect(() => {
        fetchData()
    }, [])

    useLayoutEffect(() => {
        fetchData()
    }, [currentPage, pageSize])


    const onFinish = (values) => {
        evaluateJobFairRegistrationAPI(values)
            .then((res) => {
                notification['success']({
                    message: `Submit evaluation successfully`,
                    description: `Your evaluation has been submitted`,
                    duration: 2,
                })

                fetchData();
            })
            .catch((e) => {
                notification['error']({
                    message: `Submit evaluation failed`,
                    description: `There is problem while submitting, try again later`,
                    duration: 2,
                })
            })
    }

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page - 1);
        setPageSize(pageSize)
    }

    const modalProps = {
        registrationId: regisId,
        visible: modalVisible,
        setModalVisible: setModalVisible,
        registrationList: [...data]
    }

    return (
        <>
            <CompanyRegistrationDetailModalContainer
                {...modalProps}
            />
            <ApprovalRegistrationComponent
                data={data}
                editable
                extra={{
                    title: 'Actions',
                    key: 'action',
                    render: (text, record) => {
                        return (
                            <Space size="middle">
                                <a onClick={() => {
                                    setModalVisible(true)
                                    setRegisId(record.id)
                                }}>
                                    View detail
                                </a>
                                {record.status === 'PENDING' ?
                                    <EvaluationFormComponent onFinish={onFinish} id={record.id}
                                                             name='companyRegistrationId'/>

                                    : null}
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
            />,
        </>
    )
};

export default ApprovalRegistrationContainer;