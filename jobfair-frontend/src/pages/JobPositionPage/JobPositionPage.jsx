import React from 'react';
import JobPositionManagementContainer
    from "../../components/JobPosition/JobPositionManagement/JobPositionManagement.container";
import {Affix, Divider, Typography} from "antd";

const {Text} = Typography
const JobPositionPage = props => {
    return (
        <div className="page">
            <div style={{marginTop: 90}}>
                <Divider>
                    <Text strong>Job position management</Text>
                </Divider>
                <JobPositionManagementContainer/>
            </div>
        </div>
    );
};


export default JobPositionPage;