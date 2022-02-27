import React, {useEffect, useState} from 'react';
import JobFairListComponent from "../../components/JobFairList/JobFairList.component";
import {getAllJobFairAPI} from "../../services/jobfairService";
import {notification, Popconfirm, Space} from "antd";
import {convertToDateString} from "../../utils/common";
import {Link} from "react-router-dom";

const JobFairListContainer = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        getAllJobFairAPI()
            .then(res => {
                // console.log(res.data)
                const dataSet = res.data.map(item => {
                    return {
                        ...item,
                        attendantRegisterStartTime: convertToDateString(item.attendantRegisterStartTime).split('T')[0],
                        companyBuyBoothEndTime: convertToDateString(item.companyBuyBoothEndTime).split('T')[0],
                        companyBuyBoothStartTime: convertToDateString(item.companyBuyBoothStartTime).split('T')[0],
                        companyRegisterEndTime: convertToDateString(item.companyRegisterEndTime).split('T')[0],
                        companyRegisterStartTime: convertToDateString(item.companyRegisterStartTime).split('T')[0],
                        endTime: convertToDateString(item.endTime).split('T')[0],
                        startTime: convertToDateString(item.startTime).split('T')[0]
                    }
                })
                setData([...dataSet])
            })
            .catch(err => {
                console.log(err)
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
                            <Link to={`/approval-registration/${record.id}`}>Evaluate registration</Link>
                        </Space>
                    )
                }
            }}/>
        </>
    );
};

export default JobFairListContainer;