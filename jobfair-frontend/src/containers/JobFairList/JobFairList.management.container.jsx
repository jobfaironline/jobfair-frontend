import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import JobFairListManagementComponent from "../../components/JobFairList/JobFairList.management.component";
import {getAllJobFairAPI} from "../../services/jobfairService";
import {convertToDateString} from "../../utils/common";
import {notification} from "antd";

const approvedJobFairId = 'a50a9875-93aa-4605-8afd-29923d3310fe';


const JobFairListManagementContainer = props => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const history = useHistory()

    const loadMoreData = () => {
        if (loading) {
            return
        }
        setLoading(true)
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then(res => res.json())
            .then(body => {
                const mappedData = body.results.map(item => {
                    return {
                        id: approvedJobFairId,
                        // id: item.email,
                        title: item.name.first,
                        company_name: item.name.last,
                        status: 'Happening',
                        interview_date: '12/03/2022',
                        registerLink: `/company-register-jobfair/${approvedJobFairId}`,
                        apply_date: '01/03/2022'
                    }
                })
                setData([...data, ...mappedData])
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    const handleRegister = link => {
        history.push(link)
    }

    useEffect(() => {
        loadMoreData()
    }, [])

    return (
        <>
            <JobFairListManagementComponent data={data} handleRegister={handleRegister} loadMoreData={loadMoreData}/>
        </>
    )
};


export default JobFairListManagementContainer;