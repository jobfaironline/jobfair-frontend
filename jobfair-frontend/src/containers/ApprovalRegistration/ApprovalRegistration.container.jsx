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
                    message: `Cannot load company registration by job fair ID: ${jobFairId}`,
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
                console.log(notification['success'])
                notification['success'] ({
                    message: `Submit evaluation successfully`,
                    description: `Your evaluation has been submitted`,
                    duration: 2,
                })

                fetchData()
            })
            .catch((e) => {
                console.log(e)
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
                                {record.status === 'PENDING' ? (
                                        <Popover
                                            title="Finish your evaluation"
                                            content={() => {
                                                const [form] = Form.useForm();
                                                return (
                                                    <>
                                                        <Form
                                                            form={form}
                                                            onFinish={onFinish}
                                                            requiredMark="required"
                                                            autoComplete="off"
                                                            scrollToFirstError={{block: "center", behavior: "smooth"}}
                                                        >
                                                            <Space direction="vertical" size="medium">
                                                                <Form.Item name="companyRegistrationId" noStyle
                                                                           initialValue={record.id}>
                                                                    <Input type="text" type="hidden"/>
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label="Message"
                                                                    name={'message'}
                                                                    hasFeedback
                                                                >
                                                                    <TextArea placeholder="Message"/>
                                                                </Form.Item>
                                                                <Form.Item
                                                                    label="Status"
                                                                    name={'status'}
                                                                    hasFeedback
                                                                    initialValue={'APPROVE'}
                                                                >
                                                                    <Radio.Group>
                                                                        {EvaluateConst.map(item => (
                                                                            <Radio.Button value={item.id}>
                                                                                {item.name}
                                                                            </Radio.Button>
                                                                        ))}
                                                                    </Radio.Group>
                                                                </Form.Item>
                                                                <Form.Item>
                                                                    <Button type="primary" htmlType="submit">
                                                                        Submit
                                                                    </Button>
                                                                </Form.Item>
                                                            </Space>
                                                        </Form>
                                                    </>
                                                )
                                            }}
                                            trigger="click"
                                        >
                                            <Button type="primary">Add your evaluation</Button>
                                        </Popover>)
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