import React from 'react';
import {Tag} from "antd";

const JobFairForAdminColumn = (getColumnSearchProps) => {
    return [
        {
            title: 'No.',
            dataIndex: 'no',
            key: 'no',
            ...getColumnSearchProps('no')
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Company register start time',
            dataIndex: 'companyRegisterStartTime',
            key: 'companyRegisterStartTime',
            ...getColumnSearchProps('companyRegisterStartTime')
        },
        {
            title: 'Attendant register start time',
            dataIndex: 'attendantRegisterStartTime',
            key: 'attendantRegisterStartTime',
            ...getColumnSearchProps('attendantRegisterStartTime')
        },
        {
            title: 'Start time',
            dataIndex: 'startTime',
            key: 'startTime',
            ...getColumnSearchProps('startTime')
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            filters: [
                {
                    text: 'Closed',
                    value: 'CLOSED'
                },
            ],
            onFilter: (value, record) => {
                return record.status === value
            },
            render: status => {
                let objStatus
                switch (status) {
                    case 'CLOSED':
                        objStatus = {
                            color: 'red',
                            message: 'Closed'
                        }
                        break
                    default:
                        objStatus = {
                            color: 'green',
                            message: status
                        }
                        break
                }
                return (
                    <Tag color={objStatus.color}>{objStatus.message.toUpperCase()}</Tag>
                )
            }
        }
    ]
};

export default JobFairForAdminColumn;