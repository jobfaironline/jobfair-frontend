import React from "react"
import {ToastContainer} from "react-toastify";
import {useParams} from "react-router-dom";
import JobFairParkMapContainer from "../../containers/JobFairParkMap/JobFairParkMap.container";


const JobFairParkPage = (props) => {
    const {jobFairId} = useParams();
    return (<div>
        <JobFairParkMapContainer jobFairId={jobFairId}/>
        <ToastContainer/>
    </div>)
}

export default JobFairParkPage;