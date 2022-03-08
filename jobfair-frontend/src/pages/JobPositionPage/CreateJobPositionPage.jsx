import React from 'react';
import CreateJobPositionForm from "../../components/create-job-position-form/CreateJobPositionForm";
import CreateJobPositionContainer from "../../containers/CreateJobPosition/CreateJobPosition.container";
import {Button} from "antd";
import {useHistory} from "react-router-dom";

const CreateJobPositionPage = props => {
    const history = useHistory();

    return (
        <div style={{marginTop: 90}}>
            <CreateJobPositionContainer/>
            <Button onClick={() => history.goBack()}>Back</Button>
        </div>
    );
};


export default CreateJobPositionPage;