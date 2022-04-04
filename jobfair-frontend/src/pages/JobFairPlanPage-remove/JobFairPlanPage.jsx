import React from 'react';
import JobFairPlanContainer from "../../containers/JobFairPlan/JobFairPlan.container";
import {Divider, Typography} from "antd";
const {Text} = Typography
const JobFairPlanPage = () => {
    return (
        <div className="page" style={{marginTop: 80}}>
            <Divider>
                <Text strong>Job fair plan list</Text>
            </Divider>
            <JobFairPlanContainer/>
        </div>
    );
};

export default JobFairPlanPage;