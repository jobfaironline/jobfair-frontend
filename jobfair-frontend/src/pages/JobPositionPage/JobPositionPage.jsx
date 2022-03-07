import React from 'react';
import JobPositionManagementContainer
    from "../../components/JobPosition/JobPositionManagement/JobPositionManagement.container";

const JobPositionPage = props => {
    return (
        <div className="page">
            <div style={{marginTop: 80}}>
                <JobPositionManagementContainer/>
            </div>
        </div>
    );
};


export default JobPositionPage;