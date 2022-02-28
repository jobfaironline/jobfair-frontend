import React, {useEffect, useState} from 'react';
import ApprovalRegistrationComponent
    from "../../components/ApprovalRegistration/components/ApprovalRegistration.component";
import {Button, Form, Input, notification, Popover, Radio, Space} from "antd";
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

    const {jobFairId} = useParams();

    const fetchData = async () => {
        getRegistrationByJobFairId(jobFairId)
            .then(res => {
                const {data} = res;
                const result = data.map((item, index) => {
                    return {
                        ...item,
                        createDate: convertToDateString(item.createDate).split('T')[0],
                        no: index + 1,
                    }
                })
                setData([...result])
                notification['success'] ({
                    message: `All registration has been loaded`,
                    description: `with job fair ID: ${jobFairId}`,
                    duration: 2,
                })
            })
            .catch(err => {
                notification['error'] ({
                    message: `Not found company registration by job fair ID: ${jobFairId}`,
                    description: `${err}`,
                    duration: 2,
                })
            })
    }
    useEffect(() => {
        fetchData()
    }, [])


    const onFinish = (values) => {
        evaluateJobFairRegistrationAPI(values)
            .then((res) => {
                notification['success'] ({
                    message: `Submit evaluation successfully`,
                    description: `Your evaluation has been submitted`,
                    duration: 2,
                })

                fetchData();
            })
            .catch((e) => {
                notification['error'] ({
                    message: `Submit evaluation failed`,
                    description: `There is problem while submitting, try again later`,
                    duration: 2,
                })
            })
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
                                {record.status === 'PENDING' ? <EvaluationFormComponent onFinish={onFinish} id={record.id} name='companyRegistrationId'/>

                                    : null}
                            </Space>
                        )
                    }
                }}
            />
        </>
    )
};

export default ApprovalRegistrationContainer;