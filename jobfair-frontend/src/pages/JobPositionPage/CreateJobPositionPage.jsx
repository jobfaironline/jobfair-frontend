import React from 'react';
import CreateJobPositionForm from "../../components/create-job-position-form/CreateJobPositionForm";
import CreateJobPositionContainer from "../../containers/CreateJobPosition/CreateJobPosition.container";

const CreateJobPositionPage = props => {
    return (
        <div style={{marginTop: 90}}>
            <CreateJobPositionContainer/>
        </div>
    );
};


export default CreateJobPositionPage;