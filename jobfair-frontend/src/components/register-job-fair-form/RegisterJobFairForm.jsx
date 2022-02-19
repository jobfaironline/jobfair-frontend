import React, {useState} from 'react';
import { useStepsForm } from 'sunflower-antd';
import { Steps, Input, Button, Form, Result } from 'antd';
import CreateJobPositionForm from "../create-job-position-form/CreateJobPositionForm";
import CompanyProfileForm from "../company-profile-form/CompanyProfile";
import {benefitConst} from "../../pages/ProfilePage/Company/CompanyProfileConstant";
import {JOB_POSITION_MODEL} from "../../default_models/CreateJobPositionModel/JobPositionModel";

const { Step } = Steps;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};




export default SunflowerForm =>  {
    const [data, setData] = useState(JOB_POSITION_MODEL);

    const onChange = (values) => {
        console.log('changing: ', values);
    }

    const onFinish = (values) => {
        console.log('submitted: ', values)
    }

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
            console.log(values)
            await new Promise(r => setTimeout(r, 1000));
            return 'ok';
        },
        total: 3,
    });

    const formList = [
        <>
            <CreateJobPositionForm />
            <Form.Item>
                <Button onClick={() => gotoStep(current + 1)}>Next</Button>
            </Form.Item>
        </>,

        <>
            <CompanyProfileForm/>
            <Form.Item >
                <Button
                    style={{ marginRight: 10 }}
                    type="primary"
                    loading={formLoading}
                    onClick={() => {
                        submit().then(result => {
                            if (result === 'ok') {
                                gotoStep(current + 1);
                            }
                        });
                    }}
                >
                    Submit
                </Button>
                <Button onClick={() => gotoStep(current - 1)}>Prev</Button>
            </Form.Item>
        </>,
    ];

    return (
        <div>
            <Steps {...stepsProps}>
                <Step title="Create job position" />
                <Step title="Submit company profile" />
                <Step title="Waiting for result" />
            </Steps>

            <div style={{ marginTop: 60 }}>
                <Form
                    form={form}
                    initialValues={data}
                    layout="vertical"
                    onFinish={onFinish}
                    onValuesChange={e => onChange(e)}
                    requiredMark="required"
                    style={{ maxWidth: 1500 }}>
                    {formList[current]}
                </Form>

                {current === 2 && (
                    <Result
                        status="success"
                        title="Submit is succeed!"
                        extra={
                            <>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        form.resetFields();
                                        gotoStep(0);
                                    }}
                                >
                                    Register to another job fair
                                </Button>
                                <Button>Check detail</Button>
                            </>
                        }
                    />
                )}
            </div>
        </div>
    );
};
