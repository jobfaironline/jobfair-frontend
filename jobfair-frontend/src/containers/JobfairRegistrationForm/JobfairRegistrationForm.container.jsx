import {Button, Form, notification, Steps} from 'antd'
import React, {useEffect, useState} from 'react'
import PickJobPositionFormContainer from '../PickJobPositionForm/PickJobPositionForm.container'
import {useStepsForm} from "sunflower-antd";
import CompanyProfileForm from "../../components/company-profile-form/CompanyProfileForm.component";
import {useHistory, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createDraftRegistration} from "../../redux-flow/registration-jobfair-form/registration-jobfair-form-action";
import {getCompanyProfileAPI} from "../../services/companyService";
import TextArea from "antd/es/input/TextArea";
import {CompanyProfileValidation} from "../../validate/CompanyProfileValidation";
import ConfirmContainer from "../Confirm/Confirm.container";

const {Step} = Steps
const JobfairRegistrationForm = () => {
    //please pass this form into component or USE REDUX TO STORE FORM HOOK

    const {jobfairId} = useParams()
    const dispatch = useDispatch()
    const companyId = useSelector(state => state.authentication.user.companyId);
    const [companyInfo, setCompanyInfo] = useState({});
    const [companyForm] = Form.useForm();
    const [pickJobForm] = Form.useForm();
    const history = useHistory();


    const getCompanyProfile = async () => {
        getCompanyProfileAPI(companyId)
            .then(res => {
                notification['success']({
                    message: `Fetch company profile successfully`,
                    description: `For company with ${companyId}`,
                    duration: 2
                })
                const response = {
                    ...res.data,
                    benefits: res.data.companyBenefitDTOS.map(item => {
                        return {
                            ...item,
                            id: item.benefitDTO.id,
                            description: item.benefitDTO.description
                        }
                    }),
                    mediaUrls: res.data.mediaDTOS,
                    subCategoriesIds: res.data.subCategoryDTOs.map(item => item.id),
                    url: res.data.websiteUrl
                }
                setCompanyInfo({...response})
            })
            .catch(() => {
                notification['error']({
                    message: `Fetch company profile failed`,
                    description: `Failed for company with ${companyId}`,
                    duration: 2
                })
            })
    }

    useEffect(() => {
        getCompanyProfile()
    }, [])

    useEffect(() => {
        companyForm.setFieldsValue({...companyInfo})
    }, [companyInfo, companyForm])


    const {
        form,
        current,
        gotoStep,
        stepsProps,
        formProps,
        submit,
        formLoading,
    } = useStepsForm({
        async submit(values) {
            console.log('values: ', values)
            const body = {
                description: values.description,
                jobFairId: jobfairId,
                jobPositions: values.jobPositions.map(item => {
                    const result = {
                        description: item.description,
                        jobPositionId: item.id,
                        maxSalary: item.maxSalary,
                        minSalary: item.minSalary,
                        numOfPosition: item.numberOfPosition,
                        requirements: item.requirement
                    }
                    return result;
                })
            }
            console.log('body: ', body)
            await dispatch(createDraftRegistration(body)).unwrap()
                .then(res => {
                    if (res !== null) {
                        notification['success']({
                            message: `Registration draft version has been submitted`,
                            description: `Submitted successfully`,
                            duration: 2,
                        })
                        //after submit success, push to success page
                        history.push("/proceed-success")
                    }
                    else {
                        console.log('error bitch')
                    }
                })
                .catch(err => {
                    notification['error']({
                        message: `An error has occurred while submitting`,
                        description: `Submit failed. Server response: ${err}`,
                        duration: 2,
                    })
                    //else push to error page
                    history.push("/proceed-fail")
                })
        },
        total: 3,
    })

    const onFinish = values => {
        console.log('submitted: ', values)
    }


    const formList = [
        <>
            <CompanyProfileForm noStyle={true} data={companyInfo} form={companyForm} editable={false}/>
            <Form.Item
                label="Company registration description"
                required
                tooltip="This is required"
                rules={CompanyProfileValidation.description}
                name="description"
            >
                <TextArea showCount maxLength={3000} placeholder="Company registration description"
                          style={{width: 300}}/>
            </Form.Item>
            <Form.Item>
                <Button onClick={() => gotoStep(current + 1)}>Next</Button>
            </Form.Item>
        </>,

        <>
            <PickJobPositionFormContainer form={form} onFinish={onFinish}/>
            <Form.Item>
                <Button onClick={() => gotoStep(current + 1)}>Next</Button>
            </Form.Item>
            <Form.Item>
                <Button onClick={() => gotoStep(current - 1)}>Prev</Button>
            </Form.Item>
        </>,
        <>
            <ConfirmContainer data={form.getFieldsValue(true)} companyInfo={companyInfo}/>
            <Form.Item>
                <Button
                    style={{marginRight: 10}}
                    type="primary"
                    loading={formLoading}
                    onClick={() => {
                        submit().then(result => {
                            if (result === 'ok') {
                                gotoStep(current + 1)
                            }
                        })
                    }}
                >
                    Submit
                </Button>
            </Form.Item>
            <Form.Item>
                <Button onClick={() => gotoStep(current - 1)}>Prev</Button>
            </Form.Item>
        </>
    ]

    const onChange = (values) => {
        console.log(values)
    }

    return (
        <div>
            <Steps {...stepsProps}>
                <Step title="Confirm company profile"/>
                <Step title="Pick job position"/>
                <Step title="Confirm registration"/>
            </Steps>

            <div style={{marginTop: 60}}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={submit}
                    onValuesChange={e => onChange(e)}
                    requiredMark="required"
                    style={{maxWidth: 1500}}
                    autoComplete="off"
                >
                    {formList[current]}
                </Form>

                {/*{current === 3 && (*/}
                {/*    <Result*/}
                {/*        status="success"*/}
                {/*        title="Submit is succeed!"*/}
                {/*        extra={*/}
                {/*            <>*/}
                {/*                <Button*/}
                {/*                    type="primary"*/}
                {/*                    onClick={() => {*/}
                {/*                        form.resetFields()*/}
                {/*                        gotoStep(0)*/}
                {/*                    }}*/}
                {/*                >*/}
                {/*                    Register to another job fair*/}
                {/*                </Button>*/}
                {/*                <Button>Check detail</Button>*/}
                {/*            </>*/}
                {/*        }*/}
                {/*    />*/}
                {/*)}*/}
            </div>
        </div>
    )
}

export default JobfairRegistrationForm
