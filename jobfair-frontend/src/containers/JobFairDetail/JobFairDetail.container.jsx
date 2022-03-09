import React from 'react';
import JobFairDetailComponent from "../../components/JobFairDetail/JobFairDetail.component";
import {Link, useHistory, useLocation} from "react-router-dom";
import EvaluationFormComponent from "../../components/EvaluationForm/EvaluationForm.component";
import {evaluateJobFairPlanAPI} from "../../services/job-fair-controller/JobFairConTrollerService";
import {notification} from "antd";

const JobFairDetailContainer = () => {
    const location = useLocation();
    const jobFair = location.state.jobFair;
    const history = useHistory();


    const onFinish = values => {
        evaluateJobFairPlanAPI(values)
            .then(res => {
                notification['success']({
                    message: `Your evaluation has been submitted`,
                    description: `Evaluate job fair plan successfully`
                })
                history.goBack()
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
            <JobFairDetailComponent data={jobFair} onFinish={onFinish}/>
        </>
    );
};

export default JobFairDetailContainer;