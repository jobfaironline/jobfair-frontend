import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import JobFairListManagementComponent from "../../components/JobFairList/JobFairList.management.component";

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
                        id: item.email,
                        title: item.name.first,
                        company_name: item.name.last,
                        status: 'Happening',
                        interview_date: '12/03/2022',
                        registerLink: `/company-register-jobfair/${item.email}`,
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