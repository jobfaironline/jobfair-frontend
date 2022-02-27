import React from "react"
import {ToastContainer} from "react-toastify";
import {useHistory, useParams} from "react-router-dom";
import JobFairParkMapContainer from "../../containers/JobFairParkMap/JobFairParkMap.container";


const JobFairParkPage = (props) => {
    const history = useHistory();
    const {jobFairId} = useParams();
    return (<div>
        <JobFairParkMapContainer history={history} jobFairId={jobFairId}/>
        <ToastContainer/>
    </div>)
}

export default JobFairParkPage;