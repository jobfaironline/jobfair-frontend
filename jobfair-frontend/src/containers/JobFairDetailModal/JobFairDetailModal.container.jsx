import React, {useEffect, useState} from 'react';
import JobFairDetailModalComponent from "../../components/JobFairDetailModal/JobFairDetailModal.component";

const JobFairDetailModalContainer = (props) => {
    const {isVisible, setIsVisible, jobFairId, jobFairList} = props;
    const [jobFair, setJobFair] = useState({});

    const onOk = () => {
        setIsVisible(false);
    }

    const onCancel = () => {
        setIsVisible(false);
    }

    const fetchData = async () => {
        if (jobFairList !== undefined && jobFairId !== undefined) {
            const result = jobFairList.find(item => item.id === jobFairId);
            setJobFair(result);
        }
    }

    useEffect(() => {
       fetchData()
    },[])

    return (
        <>
            <JobFairDetailModalComponent
                isModalVisible={isVisible}
                handleOk={onOk}
                handleCancel={onCancel}
                item={jobFair}
            />
        </>
    );
};

export default JobFairDetailModalContainer;