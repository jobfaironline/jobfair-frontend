import React, {useEffect, useState} from 'react';
import JobFairListComponent from "../../components/JobFairList/JobFairList.component";
import {getAllJobFairAPI} from "../../services/jobfairService";
import {notification, Popconfirm, Space} from "antd";

const JobFairListContainer = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        getAllJobFairAPI()
            .then(res => {
                setData([...res.data])
                notification['success']({
                    message: `Get job fair list successfully`,
                    description: `All job fairs has been fetched.`
                })
            })
            .catch(err => {
                notification['error']({
                    message: `Get job fair list failed`,
                    description: `There is problem while fetching, try again later: ${err}`
                })
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <JobFairListComponent data={data} editable extra={{
                title: 'Actions',
                key: 'action',
                render: (text, record) => {
                    return (
                        <Space size="middle">
                            <a
                                onClick={() => {
                                    console.log(record.id)
                                    // handleGetDetail(record.id)
                                }}
                            >
                                Detail
                            </a>
                        </Space>
                    )
                }
            }}/>
        </>
    );
};

export default JobFairListContainer;