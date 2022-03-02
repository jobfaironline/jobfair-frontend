import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import JobFairListManagementComponent from "../../components/JobFairList/JobFairList.management.component";
import {getAllJobFairAPI, getCompanyBoothByJobFairId, getJobFairPlanForCompany} from "../../services/jobfairService";
import {convertToDateString} from "../../utils/common";
import {notification} from "antd";

const approvedJobFairId = 'a50a9875-93aa-4605-8afd-29923d3310fe';


const JobFairListManagementContainer = props => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([]);
    //paging state
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(100);

    const [searchResult, setSearchResult] = useState([]);
    const [count, setCount] = useState(0);


    const history = useHistory()

    const loadMoreData = () => {
        if (loading) {
            return
        }
        setLoading(true)
        getJobFairPlanForCompany(count, pageSize)
            .then(res => {
                console.log(res.data)
                setCount(count + 1);
                const result = res.data.content.map(item => {
                    return {
                        description: item.description,
                        id: item.id,
                        status: item.status
                    }
                })
                setData([...data, ...result])
                setLoading(false)
            })
            .catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    const getCompanyBoothId = (jobFairId) => {
        getCompanyBoothByJobFairId(jobFairId)
            .then(res => {
                const result = res.data[0]?.id
                handleRedirect(`/decorate-booth/${result}`);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleFilterByStatus = (statusArr) => {
        //status is an array: ["APPROVE", "REGISTRABLE"]
        const result = data.filter(item => statusArr.some(st => st === item.status))
        setSearchResult([...result])
    }

    const handleRedirect = link => {
        history.push(link);
    }

    useEffect(() => {
        loadMoreData()
    }, [])

    return (
        <>
            <JobFairListManagementComponent
                data={data}
                handleRedirect={handleRedirect}
                loadMoreData={loadMoreData}
                handleFilterByStatus={handleFilterByStatus}
                searchResult={searchResult}
                getCompanyBoothId={getCompanyBoothId}
            />
        </>
    )
};


export default JobFairListManagementContainer;