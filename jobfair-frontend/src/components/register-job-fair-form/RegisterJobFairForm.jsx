import React, {useState} from 'react';
import {Button, Popover, Steps, message} from "antd";
import CreateJobPositionForm from "../create-job-position-form/CreateJobPositionForm";

const RegisterJobFairForm = props => {
    const {Step} = Steps;

    const StepDot = (dot, {status, index}) => (
        <Popover
            content={
                <span>
                    step {index} status: {status}
                </span>
            }
        >
            {dot}
        </Popover>
    )
    const [current, setCurrent] = useState(0);

    const onNext = () => {
        setCurrent(current + 1);
    }

    const onPrevious = () => {
        if (current > 0) {
            setCurrent(current - 1);
        }
    }

    const steps = [
        {
            title: "Create job position",
            content: <CreateJobPositionForm/>,
        },
        {
            title: "Fill the company profile",
            content: <p>Fill the company profile</p>,
        },
        {
            title: "Waiting for approved",
            content: <p>Waiting for approved</p>,

        }
    ]

    return (
        <>
            <Steps current={current} progressDot={StepDot}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title}/>
                ))}
            </Steps>
            <div className="steps-content">{steps[0].content}</div>
            <div className="steps-action">
                {
                    current < steps.length - 1 && (
                        <Button type="primary" onClick={() => onNext()}>
                            Next
                        </Button>
                    )
                }
                {current === steps.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => message.success("Processing completed!!!")}
                    >
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => onPrevious()}>
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
};

RegisterJobFairForm.propTypes = {};

export default RegisterJobFairForm;