import React from "react"
import {ToastContainer} from "react-toastify";
import {useParams} from "react-router-dom";
import JobFairParkMapContainer from "../../containers/JobFairParkMap/JobFairParkMap.container";


const PublicizedBoothPage = (props) => {
    const {jobFairId} = useParams();
    return (<div className={"page"}>
        <JobFairParkMapContainer jobFairId={jobFairId}/>
        <ToastContainer/>
    </div>)
}

export default PublicizedBoothPage;