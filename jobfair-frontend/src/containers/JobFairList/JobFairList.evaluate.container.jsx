import React, {useEffect, useState} from 'react';
import JobFairListEvaluateComponent from "../../components/JobFairList/JobFairList.evaluate.component";
import {evaluateJobFairPlanAPI, getAllJobFairAPI} from "../../services/jobfairService";
import {notification, Space} from "antd";
import {convertToDateString} from "../../utils/common";
import {Link} from "react-router-dom";
import JobFairDetailModalContainer from "../../components/JobFairList/modal/JobFairDetailModal.container";
import EvaluationFormComponent from "../../components/EvaluationForm/EvaluationForm.component";

const JobFairListEvaluateContainer = () => {
    const [data, setData] = useState([]);
    const [jobFairId, setJobFairId] = useState('');
    const [creatorId, setCreatorId] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const fetchData = async () => {
        getAllJobFairAPI()
            .then(res => {
                console.log(res.data)
                const dataSet = res.data.map(item => {
                    return {
                        ...item,
                        attendantRegisterStartTime: convertToDateString(item.attendantRegisterStartTime).split('T')[0],
                        companyBuyBoothEndTime: convertToDateString(item.companyBuyBoothEndTime).split('T')[0],
                        companyBuyBoothStartTime: convertToDateString(item.companyBuyBoothStartTime).split('T')[0],
                        companyRegisterEndTime: convertToDateString(item.companyRegisterEndTime).split('T')[0],
                        companyRegisterStartTime: convertToDateString(item.companyRegisterStartTime).split('T')[0],
                        endTime: convertToDateString(item.endTime).split('T')[0],
                        startTime: convertToDateString(item.startTime).split('T')[0]
                    }
                })
                setData([...dataSet])
            })
            .catch(err => {
                notification['error']({
                    message: `Get job fair list failed`,
                    description: `There is problem while fetching, try again later: ${err}`
                })
            })
    }

    const getRegistrationByJobFairId = async (jobFairId) => {
        getRegistrationByJobFairId(jobFairId)
            .then(res => {
                return res.data.length
            })
            .catch(e => {
                console.log(e)
            })
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

    return (
        <>
            <JobFairDetailModalContainer {...modalProps}/>
            <JobFairListEvaluateComponent data={data} editable extra={{
                title: 'Actions',
                key: 'action',
                render: (text, record) => {
                    return (
                        <Space size="middle">
                            <a onClick={() => {
                                setModalVisible(true)
                                setJobFairId(record.id)
                                setCreatorId(record.creatorId)
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
        </>
    );
};

export default JobFairListEvaluateContainer;