import React from "react"
import {ToastContainer} from "react-toastify";
import {useHistory} from "react-router-dom";
import JobFairParkMapContainer from "../../containers/JobFairParkMap/JobFairParkMap.container";


const JobFairParkPage = (props) => {
    const history = useHistory();
    return (<div>
        <JobFairParkMapContainer history={history}/>
        <ToastContainer/>
    </div>)
}

export default JobFairParkPage;